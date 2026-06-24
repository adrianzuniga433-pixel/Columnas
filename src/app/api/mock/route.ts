import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import { ensureProgress, touchStreak } from "@/lib/progress";
import { flatMockItems } from "@/lib/mock";
import {
  MOCK_SECTION_LABELS,
  mockTotalScore,
  scaledSubscore,
  cefrForScore,
  type MockSection,
} from "@/lib/itp";

// Nivel sentinela con el que se guarda un intento de simulacro completo,
// para distinguirlo de exámenes de nivel (1..5) y de avance (1000+).
const MOCK_LEVEL = 2000;

const answerSchema = z.object({
  answers: z.array(
    z.object({
      choice: z.number().int().optional(),
      label: z.string().optional(),
      choices: z.array(z.number().int()).optional(),
    })
  ),
});

function sectionOf(area: string): MockSection {
  if (area === "listening") return "listening";
  if (area === "structure") return "structure";
  return "reading";
}

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
  const parsed = answerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Respuestas inválidas" }, { status: 400 });
  }

  const items = flatMockItems();
  const submitted = parsed.data.answers;

  const sections: Record<MockSection, { correct: number; total: number }> = {
    listening: { correct: 0, total: 0 },
    structure: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
  };

  let totalQ = 0;
  let correctQ = 0;

  items.forEach((item, i) => {
    const ans = submitted[i] ?? {};
    const q = item.question;
    const sec = sections[sectionOf(item.area)];

    if (q.kind === "mcq") {
      totalQ++;
      sec.total++;
      if (ans.choice === q.answerIndex) {
        correctQ++;
        sec.correct++;
      }
    } else if (q.kind === "error-id") {
      totalQ++;
      sec.total++;
      if (ans.label === q.answerLabel) {
        correctQ++;
        sec.correct++;
      }
    } else {
      q.questions.forEach((sub, si) => {
        totalQ++;
        sec.total++;
        if (ans.choices?.[si] === sub.answerIndex) {
          correctQ++;
          sec.correct++;
        }
      });
    }
  });

  const sectionResults = (Object.keys(sections) as MockSection[])
    .filter((s) => sections[s].total > 0)
    .map((s) => {
      const { correct, total } = sections[s];
      const ratio = total > 0 ? correct / total : 0;
      return {
        section: s,
        label: MOCK_SECTION_LABELS[s],
        correct,
        total,
        pct: Math.round(ratio * 100),
        scaled: scaledSubscore(ratio),
      };
    });

  const totalScore = mockTotalScore(sectionResults.map((s) => s.scaled));
  const ratio = totalQ > 0 ? correctQ / totalQ : 0;
  const cefr = cefrForScore(totalScore);

  await prisma.examAttempt.create({
    data: {
      userId,
      level: MOCK_LEVEL,
      score: ratio,
      passed: totalScore >= 400,
      sectionBreakdown: JSON.stringify(
        Object.fromEntries(sectionResults.map((s) => [s.section, s.pct]))
      ),
    },
  });

  // El simulacro puede subir el puntaje estimado, pero nunca lo baja.
  const progress = await ensureProgress(userId);
  let updatedEstimate = progress.estimatedItpScore;
  if (totalScore > progress.estimatedItpScore) {
    updatedEstimate = totalScore;
    await prisma.progress.update({
      where: { userId },
      data: { estimatedItpScore: totalScore },
    });
  }

  await touchStreak(userId);

  return NextResponse.json({
    totalScore,
    cefr,
    correct: correctQ,
    total: totalQ,
    sections: sectionResults,
    previousEstimate: progress.estimatedItpScore,
    updatedEstimate,
    improved: totalScore > progress.estimatedItpScore,
  });
}
