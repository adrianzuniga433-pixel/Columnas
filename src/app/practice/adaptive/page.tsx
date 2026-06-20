import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/AppHeader";
import { QuizRunner } from "@/components/QuizRunner";
import { grammarLessons } from "@/content/daily";
import type { Mcq } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function AdaptivePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  // Cuenta cuántas veces ha fallado por tema.
  const mistakes = await prisma.mistakeItem.findMany({
    where: { userId: session.userId, mastered: false },
    select: { topicTitle: true, timesWrong: true },
  });

  const weightByTopic = new Map<string, number>();
  for (const m of mistakes) {
    if (!m.topicTitle) continue;
    weightByTopic.set(m.topicTitle, (weightByTopic.get(m.topicTitle) ?? 0) + m.timesWrong);
  }
  const weakTopics = [...weightByTopic.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([t]) => t);

  // Arma preguntas frescas de esos temas débiles.
  const questions: Mcq[] = [];
  for (const topic of weakTopics) {
    const lesson = grammarLessons.find((g) => g.title === topic);
    if (!lesson) continue;
    for (const m of lesson.practice) {
      questions.push({
        ...m,
        topicTitle: m.topicTitle ?? lesson.title,
        topicWhy: m.topicWhy ?? lesson.tipEs,
      });
    }
  }
  // Limita a 12 preguntas.
  const quiz = questions.slice(0, 12);

  if (quiz.length === 0) {
    return (
      <div className="min-h-screen">
        <AppHeader name={user?.name ?? user?.email} />
        <div className="mx-auto max-w-2xl px-4 py-8 text-center">
          <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
            ← Volver
          </Link>
          <div className="card">
            <div className="mb-2 text-5xl">🎯</div>
            <h1 className="mb-1 text-xl font-bold">Reto personalizado</h1>
            <p className="text-slate-500">
              Aún no tengo suficientes datos de tus errores. Completa algunas
              sesiones diarias y vuelve: aquí te armaré un reto enfocado en los
              temas que más te cuesten.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <QuizRunner
        questions={quiz}
        title="🎯 Reto personalizado"
        subtitle={`Enfocado en tus temas débiles: ${weakTopics.join(", ")}.`}
        accent="amber"
      />
    </div>
  );
}
