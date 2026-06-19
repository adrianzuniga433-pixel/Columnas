import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { getLessonById, lessonsForLevel } from "@/content";
import { LessonPlayer } from "@/components/LessonPlayer";

export default async function LessonPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const lesson = getLessonById(params.id);
  if (!lesson) notFound();

  const progress = await ensureProgress(session.userId);
  // Bloquea lecciones de niveles aún no desbloqueados.
  if (lesson.level > progress.unlockedLevel) {
    redirect("/dashboard");
  }

  const siblings = lessonsForLevel(lesson.level);
  const idx = siblings.findIndex((l) => l.id === lesson.id);
  const nextLessonId =
    idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1].id : null;

  return <LessonPlayer lesson={lesson} nextLessonId={nextLessonId} />;
}
