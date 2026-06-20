import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";

const CHECKPOINT_LEVEL_BASE = 1000;

const schema = z.object({
  milestone: z.number().int().min(1),
  score: z.number().min(0).max(1),
  passed: z.boolean(),
});

// Registra el resultado de un examen de avance.
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
  const { milestone, score, passed } = parsed.data;

  await prisma.examAttempt.create({
    data: {
      userId,
      level: CHECKPOINT_LEVEL_BASE + milestone,
      score,
      passed,
      sectionBreakdown: JSON.stringify({ checkpoint: milestone }),
    },
  });

  return NextResponse.json({ ok: true });
}
