import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import { ensureProgress, touchStreak } from "@/lib/progress";
import { srsSeedForLevel } from "@/content";
import { scoreToItpInLevel, type Area } from "@/lib/itp";
import type { ExamItem } from "@/content/types";

const answerSchema = z.object({
  answers: z.array(
    z.object({
      choice: z.number().int().optional(),
      label: z.string().optional(),
      choices: z.array(z.number().int()).optional(),
    })
  ),
});

export async function POST(
  req: Request,
  { params }: { params: { level: string } }
) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const level = parseInt(params.level, 10);
  if (Number.isNaN(level)) {
    return NextResponse.json({ error: "Nivel inválido" }, { status: 400 });
  }

  const progress = await ensureProgress(userId);
  if (level > progress.unlockedLevel) {
    return NextResponse.json({ error: "Nivel bloqueado" }, { status: 403 });
  }

  const exam = await prisma.levelExam.findUnique({ where: { level } });
  if (!exam) {
    return NextResponse.json({ error: "Examen no encontrado" }, { status: 404 });
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

  const items = JSON.parse(exam.items) as ExamItem[];
  const submitted = parsed.data.answers;

  let totalQ = 0;
  let correctQ = 0;
  const sections: Record<Area, { correct: number; total: number }> = {
    listening: { correct: 0, total: 0 },
    structure: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
    vocab: { correct: 0, total: 0 },
  };

  items.forEach((item, i) => {
    const ans = submitted[i] ?? {};
    const q = item.question;
    const sec = sections[item.area];

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
    } else if (q.kind === "reading" || q.kind === "listening") {
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

  const ratio = totalQ > 0 ? correctQ / totalQ : 0;
  const passed = ratio >= exam.passThreshold;

  const sectionBreakdown = Object.fromEntries(
    Object.entries(sections)
      .filter(([, v]) => v.total > 0)
      .map(([k, v]) => [k, Math.round((v.correct / v.total) * 100)])
  );

  await prisma.examAttempt.create({
    data: {
      userId,
      level,
      score: ratio,
      passed,
      sectionBreakdown: JSON.stringify(sectionBreakdown),
    },
  });

  if (passed) {
    const newScore = Math.max(
      progress.estimatedItpScore,
      scoreToItpInLevel(level, ratio)
    );
    const newUnlocked = Math.min(5, Math.max(progress.unlockedLevel, level + 1));
    const newCurrent = Math.min(5, level + 1);
    await prisma.progress.update({
      where: { userId },
      data: {
        estimatedItpScore: newScore,
        unlockedLevel: newUnlocked,
        currentLevel: newCurrent,
      },
    });
  } else {
    // Reinyecta al repaso los ítems de este nivel: vuelven a estar disponibles hoy.
    const levelKeys = srsSeedForLevel(level).map((s) => s.conceptKey);
    if (levelKeys.length > 0) {
      await prisma.srsItem.updateMany({
        where: { userId, conceptKey: { in: levelKeys } },
        data: { nextReviewAt: new Date() },
      });
    }
  }

  await touchStreak(userId);

  return NextResponse.json({
    passed,
    score: Math.round(ratio * 100),
    correct: correctQ,
    total: totalQ,
    threshold: Math.round(exam.passThreshold * 100),
    sectionBreakdown,
    unlockedNext: passed && level < 5,
  });
}
