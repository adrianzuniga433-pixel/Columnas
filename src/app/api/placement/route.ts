import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import { ensureProgress, seedSrsForLevel } from "@/lib/progress";
import { placementItems } from "@/content/placement";
import { placementFromRatio } from "@/lib/itp";

const schema = z.object({
  answers: z.array(
    z.object({ id: z.string(), choice: z.number().int() })
  ),
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
  if (!parsed.success || parsed.data.answers.length === 0) {
    return NextResponse.json({ error: "Respuestas inválidas" }, { status: 400 });
  }

  // El servidor recalcula la corrección (no confía en el cliente).
  let correct = 0;
  let answered = 0;
  for (const ans of parsed.data.answers) {
    const item = placementItems.find((p) => p.id === ans.id);
    if (!item) continue;
    answered++;
    if (item.answerIndex === ans.choice) correct++;
  }
  if (answered === 0) {
    return NextResponse.json({ error: "Sin respuestas válidas" }, { status: 400 });
  }

  const ratio = correct / answered;
  const outcome = placementFromRatio(ratio);

  await ensureProgress(userId);
  await prisma.progress.update({
    where: { userId },
    data: {
      placementDone: true,
      currentLevel: outcome.placedLevel,
      unlockedLevel: outcome.placedLevel,
      estimatedItpScore: outcome.estimatedItpScore,
    },
  });

  await prisma.placementResult.create({
    data: {
      userId,
      rawScore: correct,
      maxScore: answered,
      estimatedItpScore: outcome.estimatedItpScore,
      placedLevel: outcome.placedLevel,
    },
  });

  // Carga el SRS del nivel asignado para que tenga repasos desde el inicio.
  await seedSrsForLevel(userId, outcome.placedLevel);

  return NextResponse.json({
    placedLevel: outcome.placedLevel,
    estimatedItpScore: outcome.estimatedItpScore,
    cefr: outcome.cefr,
    rationale: outcome.rationale,
    correct,
    answered,
  });
}
