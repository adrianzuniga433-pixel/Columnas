import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import { reviewItem, interleave } from "@/lib/srs";
import { touchStreak } from "@/lib/progress";

// GET: ítems pendientes de repaso hoy (intercalados por área).
export async function GET() {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const due = await prisma.srsItem.findMany({
    where: { userId, nextReviewAt: { lte: new Date() } },
    orderBy: { nextReviewAt: "asc" },
    take: 30,
  });

  const items = interleave(due).map((it) => ({
    id: it.id,
    type: it.type,
    area: it.area,
    front: it.front,
    back: it.back,
    example: it.example,
  }));

  return NextResponse.json({ items });
}

const schema = z.object({
  id: z.string(),
  correct: z.boolean(),
});

// POST: registra el resultado de un ítem y reprograma su próximo repaso.
export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const item = await prisma.srsItem.findFirst({
    where: { id: parsed.data.id, userId },
  });
  if (!item) {
    return NextResponse.json({ error: "Ítem no encontrado" }, { status: 404 });
  }

  const next = reviewItem(
    {
      interval: item.interval,
      easeFactor: item.easeFactor,
      repetitions: item.repetitions,
      lapses: item.lapses,
    },
    parsed.data.correct
  );

  await prisma.srsItem.update({
    where: { id: item.id },
    data: {
      interval: next.interval,
      easeFactor: next.easeFactor,
      repetitions: next.repetitions,
      lapses: next.lapses,
      nextReviewAt: next.nextReviewAt,
    },
  });

  await touchStreak(userId);

  return NextResponse.json({ ok: true, nextReviewAt: next.nextReviewAt });
}
