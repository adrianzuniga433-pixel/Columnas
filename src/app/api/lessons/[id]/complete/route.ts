import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import { ensureProgress, touchStreak, seedSrsForLevel } from "@/lib/progress";
import { getLessonById } from "@/content";

const schema = z.object({ score: z.number().min(0).max(1) });

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const lesson = getLessonById(params.id);
  if (!lesson) {
    return NextResponse.json({ error: "Lección no encontrada" }, { status: 404 });
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

  await prisma.lessonCompletion.upsert({
    where: { userId_lessonId: { userId, lessonId: lesson.id } },
    update: { score: parsed.data.score, completedAt: new Date() },
    create: { userId, lessonId: lesson.id, score: parsed.data.score },
  });

  // Inyecta los ítems de vocabulario/estructura del nivel al SRS.
  await seedSrsForLevel(userId, lesson.level);

  // Avanza el "continuar donde se quedó" y la racha.
  await prisma.progress.update({
    where: { userId },
    data: { currentLessonId: lesson.id },
  });
  await touchStreak(userId);

  return NextResponse.json({ ok: true });
}
