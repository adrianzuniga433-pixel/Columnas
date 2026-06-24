import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { ITP_MIN, ITP_MAX } from "@/lib/itp";

const schema = z.object({
  // YYYY-MM-DD o null para borrar el plan.
  examDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
  targetScore: z.number().int().min(ITP_MIN).max(ITP_MAX).nullable(),
});

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

  await ensureProgress(userId);
  await prisma.progress.update({
    where: { userId },
    data: {
      // Se guarda a mediodía para evitar saltos por zona horaria.
      examDate: parsed.data.examDate
        ? new Date(parsed.data.examDate + "T12:00:00")
        : null,
      targetScore: parsed.data.targetScore,
    },
  });

  return NextResponse.json({ ok: true });
}
