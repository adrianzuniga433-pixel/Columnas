import "server-only";
import { prisma } from "./prisma";
import { ensureProgress } from "./progress";
import { getLessonById } from "@/content";
import {
  GOAL_SCORE,
  cefrForScore,
  mockTotalScore,
  progressToGoal,
  scaledSubscore,
  type Area,
} from "./itp";

const MOCK_LEVEL = 2000;

export interface AreaInsight {
  area: Area;
  pct: number;
  samples: number;
}

export interface TopicWeakness {
  key: string;
  title: string;
  timesWrong: number;
}

export interface ScorePoint {
  date: string;
  pct: number;
  type: "level" | "checkpoint" | "mock";
  label: string;
}

export interface ProgressInsights {
  estimatedItpScore: number;
  cefr: string;
  goalPct: number;
  reachedGoal: boolean;
  areaInsights: AreaInsight[];
  weakestArea: AreaInsight | null;
  strongestArea: AreaInsight | null;
  topicWeaknesses: TopicWeakness[];
  scoreTimeline: ScorePoint[];
  mistakesPending: number;
  mistakesMastered: number;
  totalExams: number;
  bestMockScore: number | null;
}

function safeParse(json: string): Record<string, number> {
  try {
    const v = JSON.parse(json);
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

export async function getProgressInsights(
  userId: string
): Promise<ProgressInsights> {
  const progress = await ensureProgress(userId);

  const [completions, attempts, mistakes] = await Promise.all([
    prisma.lessonCompletion.findMany({ where: { userId } }),
    prisma.examAttempt.findMany({
      where: { userId },
      orderBy: { attemptedAt: "asc" },
    }),
    prisma.mistakeItem.findMany({ where: { userId } }),
  ]);

  // Desempeño por área: combina la nota de las lecciones completadas con el
  // desglose por sección de cada examen presentado. Cuantas más muestras, más
  // confiable es el porcentaje.
  const acc: Record<Area, { sum: number; n: number }> = {
    listening: { sum: 0, n: 0 },
    structure: { sum: 0, n: 0 },
    reading: { sum: 0, n: 0 },
    vocab: { sum: 0, n: 0 },
  };

  for (const c of completions) {
    const lesson = getLessonById(c.lessonId);
    if (!lesson) continue;
    acc[lesson.area].sum += c.score * 100;
    acc[lesson.area].n += 1;
  }

  for (const a of attempts) {
    const breakdown = safeParse(a.sectionBreakdown);
    for (const [area, pct] of Object.entries(breakdown)) {
      if (area in acc && typeof pct === "number") {
        acc[area as Area].sum += pct;
        acc[area as Area].n += 1;
      }
    }
  }

  const areaInsights: AreaInsight[] = (Object.keys(acc) as Area[])
    .map((area) => ({
      area,
      samples: acc[area].n,
      pct: acc[area].n > 0 ? Math.round(acc[area].sum / acc[area].n) : 0,
    }))
    .filter((a) => a.samples > 0);

  const ranked = [...areaInsights].sort((a, b) => a.pct - b.pct);
  const weakestArea = ranked[0] ?? null;
  const strongestArea = ranked.length > 0 ? ranked[ranked.length - 1] : null;

  // Conceptos donde más se ha fallado (errores no dominados).
  const topicWeaknesses: TopicWeakness[] = mistakes
    .filter((m) => !m.mastered)
    .map((m) => ({
      key: m.conceptKey,
      title: m.topicTitle ?? m.prompt,
      timesWrong: m.timesWrong,
    }))
    .sort((a, b) => b.timesWrong - a.timesWrong)
    .slice(0, 6);

  // Línea de tiempo de puntajes (% de acierto por intento).
  const scoreTimeline: ScorePoint[] = attempts.map((a) => {
    let type: ScorePoint["type"] = "level";
    let label = `Nivel ${a.level}`;
    if (a.level === MOCK_LEVEL) {
      type = "mock";
      label = "Simulacro";
    } else if (a.level >= 1000) {
      type = "checkpoint";
      label = `Avance #${a.level - 1000}`;
    }
    return {
      date: a.attemptedAt.toISOString(),
      pct: Math.round(a.score * 100),
      type,
      label,
    };
  });

  // Mejor puntaje escalado de simulacro, reconstruido desde su desglose.
  let bestMockScore: number | null = null;
  for (const a of attempts) {
    if (a.level !== MOCK_LEVEL) continue;
    const breakdown = safeParse(a.sectionBreakdown);
    const subs = Object.values(breakdown).map((pct) => scaledSubscore(pct / 100));
    if (subs.length === 0) continue;
    const total = mockTotalScore(subs);
    if (bestMockScore === null || total > bestMockScore) bestMockScore = total;
  }

  return {
    estimatedItpScore: progress.estimatedItpScore,
    cefr: cefrForScore(progress.estimatedItpScore),
    goalPct: Math.round(progressToGoal(progress.estimatedItpScore) * 100),
    reachedGoal: progress.estimatedItpScore >= GOAL_SCORE,
    areaInsights,
    weakestArea,
    strongestArea,
    topicWeaknesses,
    scoreTimeline,
    mistakesPending: mistakes.filter((m) => !m.mastered).length,
    mistakesMastered: mistakes.filter((m) => m.mastered).length,
    totalExams: attempts.length,
    bestMockScore,
  };
}
