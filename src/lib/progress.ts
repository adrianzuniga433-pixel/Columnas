import "server-only";
import { prisma } from "./prisma";
import { srsSeedForLevel } from "@/content";
import { srsSeedForDay } from "@/content/daily";
import {
  DAILY_SECTIONS,
  type DailySectionKey,
  isKnownSection,
  dayAlreadyCredited,
  coreComplete,
} from "./dayProgress";

export { DAILY_SECTIONS };
export type { DailySectionKey };

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

/** ¿La fecha cae en el día calendario local de hoy? (null = nunca). */
export function isToday(d: Date | null): boolean {
  if (!d) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
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
  let freezes = progress.streakFreezes;

  if (!progress.lastActiveDate) {
    streak = 1;
  } else {
    const last = startOfDay(progress.lastActiveDate);
    const gap = today - last;
    if (gap === 0) {
      // mismo día, no cambia
    } else if (gap === 1) {
      streak = streak + 1;
    } else if (gap === 2 && freezes > 0) {
      // Faltó exactamente un día: usa una protección de racha.
      streak = streak + 1;
      freezes = freezes - 1;
    } else {
      streak = 1;
    }
  }

  return prisma.progress.update({
    where: { userId },
    data: { streakCount: streak, streakFreezes: freezes, lastActiveDate: new Date() },
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
function parseCompletedSections(raw: string, day: number): string[] {
  try {
    const v = JSON.parse(raw);
    if (v && v.day === day && Array.isArray(v.done)) {
      return v.done.filter((s: unknown): s is string => typeof s === "string");
    }
  } catch {
    /* ignore */
  }
  return [];
}

/** Secciones del día en curso ya completadas (para mostrar ✓ en el panel). */
export async function getCompletedSections(userId: string): Promise<string[]> {
  const p = await ensureProgress(userId);
  // Si el día ya quedó acreditado, no hay bloques pendientes que marcar.
  if (dayAlreadyCredited(p.studyDay, p.lastCompletedDay)) return [];
  return parseCompletedSections(p.completedSections, p.studyDay);
}

async function logStudyToday(userId: string) {
  await prisma.studyLog
    .upsert({
      where: { userId_date: { userId, date: dateKey(new Date()) } },
      update: {},
      create: { userId, date: dateKey(new Date()) },
    })
    .catch(() => null);
}

// Acredita el día actual: siembra el SRS, registra el día y avanza al siguiente.
async function creditCurrentDay(userId: string, studyDay: number) {
  await seedSrsForDay(userId, studyDay);
  await logStudyToday(userId);
  return prisma.progress.update({
    where: { userId },
    data: {
      lastStudyAt: new Date(),
      lastCompletedDay: studyDay,
      studyDay: studyDay + 1,
      completedSections: "",
    },
  });
}

export async function completeDailySession(userId: string) {
  const progress = await ensureProgress(userId);
  // Idempotente: el avance se acredita por día COMPLETADO, no por día
  // calendario. Si este día ya está acreditado, no se vuelve a avanzar.
  if (dayAlreadyCredited(progress.studyDay, progress.lastCompletedDay)) {
    await touchStreak(userId);
    return { studyDay: progress.studyDay, advanced: false };
  }
  const updated = await creditCurrentDay(userId, progress.studyDay);
  await touchStreak(userId);
  return { studyDay: updated.studyDay, advanced: true };
}

/**
 * Marca un bloque (sección) del día como hecho. Si con eso se completa el
 * núcleo (gramática + vocabulario + comprensión), cierra el día y avanza, así
 * el usuario puede hacer la sesión por partes sin repetir lo ya hecho.
 */
export async function markSectionComplete(userId: string, section: string) {
  const progress = await ensureProgress(userId);
  if (!isKnownSection(section)) {
    return { sections: [], advanced: false, studyDay: progress.studyDay };
  }
  // El día ya está acreditado: nada que marcar.
  if (dayAlreadyCredited(progress.studyDay, progress.lastCompletedDay)) {
    return { sections: [], advanced: false, studyDay: progress.studyDay };
  }

  await logStudyToday(userId);

  const done = new Set(parseCompletedSections(progress.completedSections, progress.studyDay));
  done.add(section);

  if (coreComplete(done)) {
    const updated = await creditCurrentDay(userId, progress.studyDay);
    await touchStreak(userId);
    return { sections: [], advanced: true, studyDay: updated.studyDay };
  }

  await prisma.progress.update({
    where: { userId },
    data: {
      completedSections: JSON.stringify({ day: progress.studyDay, done: [...done] }),
    },
  });
  await touchStreak(userId);
  return { sections: [...done], advanced: false, studyDay: progress.studyDay };
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

/** Resumen de los últimos 7 días para el panel. */
export async function getWeeklySummary(userId: string) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last7Keys = new Set<string>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    last7Keys.add(dateKey(d));
  }
  const [logs, wordsThisWeek, checkpointsThisWeek] = await Promise.all([
    prisma.studyLog.findMany({ where: { userId }, select: { date: true } }),
    prisma.srsItem.count({
      where: { userId, type: "vocab", createdAt: { gte: weekAgo } },
    }),
    prisma.examAttempt.count({
      where: { userId, passed: true, level: { gte: 1000 }, attemptedAt: { gte: weekAgo } },
    }),
  ]);
  const daysThisWeek = logs.filter((l) => last7Keys.has(l.date)).length;
  return { daysThisWeek, wordsThisWeek, checkpointsThisWeek };
}

/** Cantidad de ítems de SRS pendientes de repaso hoy. */
export async function dueSrsCount(userId: string): Promise<number> {
  return prisma.srsItem.count({
    where: { userId, nextReviewAt: { lte: new Date() } },
  });
}
