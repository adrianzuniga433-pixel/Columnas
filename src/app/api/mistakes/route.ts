import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";

const schema = z.object({
  conceptKey: z.string().min(1).max(200),
  prompt: z.string().min(1),
  sentence: z.string().optional(),
  options: z.array(z.string()).min(2).max(6),
  answerIndex: z.number().int().min(0),
  explanation: z.string().default(""),
  translationEs: z.string().optional(),
  topicTitle: z.string().optional(),
  topicWhy: z.string().optional(),
});

// Registra (o actualiza) una pregunta respondida incorrectamente.
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
  const d = parsed.data;

  await prisma.mistakeItem.upsert({
    where: { userId_conceptKey: { userId, conceptKey: d.conceptKey } },
    update: {
      timesWrong: { increment: 1 },
      mastered: false,
      lastWrongAt: new Date(),
    },
    create: {
      userId,
      conceptKey: d.conceptKey,
      prompt: d.prompt,
      sentence: d.sentence,
      options: JSON.stringify(d.options),
      answerIndex: d.answerIndex,
      explanation: d.explanation,
      translationEs: d.translationEs,
      topicTitle: d.topicTitle,
      topicWhy: d.topicWhy,
    },
  });

  return NextResponse.json({ ok: true });
}
