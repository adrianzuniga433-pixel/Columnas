import "server-only";
import { prisma } from "./prisma";
import { srsSeedForLevel } from "@/content";

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

/** Cantidad de ítems de SRS pendientes de repaso hoy. */
export async function dueSrsCount(userId: string): Promise<number> {
  return prisma.srsItem.count({
    where: { userId, nextReviewAt: { lte: new Date() } },
  });
}
