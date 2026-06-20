import "server-only";
import { prisma } from "./prisma";
import { srsSeedForLevel } from "@/content";
import { srsSeedForDay } from "@/content/daily";

/** Devuelve el Progress del usuario, creándolo si no existe. */
export async function ensureProgress(userId: string) {
  const existing = await prisma.progress.findUnique({ where: { userId } });
  if (existing) return existing;
  return prisma.progress.create({ data: { userId } });
}

function startOfDay(d: Date): number {
  return Math.floor(
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() /
      (24 * 60 * 60 * 1000)
  );
}

/** Clave de día YYYY-MM-DD para registrar los días estudiados. */
export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Actualiza la racha diaria. Si el último acceso fue ayer, +1. Si fue hoy, sin
 * cambios. Si fue antes de ayer, reinicia a 1.
 */
export async function touchStreak(userId: string) {
  const progress = await ensureProgress(userId);
  const today = startOfDay(new Date());
  let streak = progress.streakCount;

  if (!progress.lastActiveDate) {
    streak = 1;
  } else {
    const last = startOfDay(progress.lastActiveDate);
    if (last === today) {
      // mismo día, no cambia
    } else if (today - last === 1) {
      streak = streak + 1;
    } else {
      streak = 1;
    }
  }

  return prisma.progress.update({
    where: { userId },
    data: { streakCount: streak, lastActiveDate: new Date() },
  });
}

/** Inserta los ítems de SRS de un nivel para el usuario (idempotente). */
export async function seedSrsForLevel(userId: string, level: number) {
  const seeds = srsSeedForLevel(level);
  for (const seed of seeds) {
    await prisma.srsItem.upsert({
      where: { userId_conceptKey: { userId, conceptKey: seed.conceptKey } },
      update: {},
      create: {
        userId,
        type: seed.type,
        area: seed.area,
        front: seed.front,
        back: seed.back,
        example: seed.example,
        conceptKey: seed.conceptKey,
        nextReviewAt: new Date(),
      },
    });
  }
}

/** Inserta los ítems de vocabulario de la sesión diaria al SRS (idempotente). */
export async function seedSrsForDay(userId: string, day: number) {
  const seeds = srsSeedForDay(day);
  for (const seed of seeds) {
    await prisma.srsItem.upsert({
      where: { userId_conceptKey: { userId, conceptKey: seed.conceptKey } },
      update: {},
      create: {
        userId,
        type: seed.type,
        area: seed.area,
        front: seed.front,
        back: seed.back,
        example: seed.example,
        conceptKey: seed.conceptKey,
        nextReviewAt: new Date(),
      },
    });
  }
}

/**
 * Marca la sesión diaria como completada. Avanza al siguiente día solo una vez
 * por día natural (para mantener una sesión distinta cada día).
 */
export async function completeDailySession(userId: string) {
  const progress = await ensureProgress(userId);
  const today = startOfDay(new Date());
  const alreadyAdvancedToday =
    progress.lastStudyAt != null && startOfDay(progress.lastStudyAt) === today;

  await seedSrsForDay(userId, progress.studyDay);

  // Registra el día estudiado (para el calendario de racha).
  await prisma.studyLog
    .upsert({
      where: { userId_date: { userId, date: dateKey(new Date()) } },
      update: {},
      create: { userId, date: dateKey(new Date()) },
    })
    .catch(() => null);

  const updated = await prisma.progress.update({
    where: { userId },
    data: {
      lastStudyAt: new Date(),
      studyDay: alreadyAdvancedToday ? progress.studyDay : progress.studyDay + 1,
    },
  });
  await touchStreak(userId);
  return { studyDay: updated.studyDay, advanced: !alreadyAdvancedToday };
}

/** Estadísticas de progreso para el panel. */
export async function getProgressStats(userId: string) {
  const [studyLogs, wordsLearned, mistakesPending] = await Promise.all([
    prisma.studyLog.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 60,
    }),
    prisma.srsItem.count({ where: { userId, type: "vocab" } }),
    prisma.mistakeItem.count({ where: { userId, mastered: false } }),
  ]);
  return {
    studyDates: new Set(studyLogs.map((s) => s.date)),
    wordsLearned,
    mistakesPending,
  };
}

/** Cantidad de ítems de SRS pendientes de repaso hoy. */
export async function dueSrsCount(userId: string): Promise<number> {
  return prisma.srsItem.count({
    where: { userId, nextReviewAt: { lte: new Date() } },
  });
}
