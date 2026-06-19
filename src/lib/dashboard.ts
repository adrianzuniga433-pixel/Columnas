import "server-only";
import { prisma } from "./prisma";
import { ensureProgress, dueSrsCount } from "./progress";
import { lessonsForLevel, getLessonById } from "@/content";
import { type Area } from "./itp";

export interface DashboardData {
  currentLevel: number;
  unlockedLevel: number;
  estimatedItpScore: number;
  streakCount: number;
  placementDone: boolean;
  dueCount: number;
  lessons: {
    id: string;
    title: string;
    area: Area;
    completed: boolean;
    score: number | null;
  }[];
  continueLessonId: string | null;
  levelLessonsCompleted: boolean;
  areaMastery: { area: Area; pct: number; count: number }[];
  examHistory: {
    level: number;
    score: number;
    passed: boolean;
    attemptedAt: string;
  }[];
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const progress = await ensureProgress(userId);

  const completions = await prisma.lessonCompletion.findMany({
    where: { userId },
  });
  const completionMap = new Map(completions.map((c) => [c.lessonId, c.score]));

  const levelLessons = lessonsForLevel(progress.currentLevel);
  const lessons = levelLessons.map((l) => ({
    id: l.id,
    title: l.title,
    area: l.area,
    completed: completionMap.has(l.id),
    score: completionMap.get(l.id) ?? null,
  }));

  // "Continuar donde se quedó": primero la lección activa guardada si no está
  // completa; si no, la primera lección incompleta del nivel.
  let continueLessonId: string | null = null;
  if (
    progress.currentLessonId &&
    !completionMap.has(progress.currentLessonId) &&
    getLessonById(progress.currentLessonId)?.level === progress.currentLevel
  ) {
    continueLessonId = progress.currentLessonId;
  } else {
    continueLessonId = lessons.find((l) => !l.completed)?.id ?? null;
  }

  const levelLessonsCompleted = lessons.length > 0 && lessons.every((l) => l.completed);

  // Dominio por área a partir de todas las lecciones completadas.
  const areaAcc: Record<Area, { sum: number; count: number }> = {
    listening: { sum: 0, count: 0 },
    structure: { sum: 0, count: 0 },
    reading: { sum: 0, count: 0 },
    vocab: { sum: 0, count: 0 },
  };
  for (const c of completions) {
    const lesson = getLessonById(c.lessonId);
    if (!lesson) continue;
    const acc = areaAcc[lesson.area];
    acc.sum += c.score;
    acc.count += 1;
  }
  const areaMastery = (Object.keys(areaAcc) as Area[]).map((area) => ({
    area,
    count: areaAcc[area].count,
    pct:
      areaAcc[area].count > 0
        ? Math.round((areaAcc[area].sum / areaAcc[area].count) * 100)
        : 0,
  }));

  const attempts = await prisma.examAttempt.findMany({
    where: { userId },
    orderBy: { attemptedAt: "desc" },
    take: 10,
  });
  const examHistory = attempts.map((a) => ({
    level: a.level,
    score: Math.round(a.score * 100),
    passed: a.passed,
    attemptedAt: a.attemptedAt.toISOString(),
  }));

  const dueCount = await dueSrsCount(userId);

  return {
    currentLevel: progress.currentLevel,
    unlockedLevel: progress.unlockedLevel,
    estimatedItpScore: progress.estimatedItpScore,
    streakCount: progress.streakCount,
    placementDone: progress.placementDone,
    dueCount,
    lessons,
    continueLessonId,
    levelLessonsCompleted,
    areaMastery,
    examHistory,
  };
}
