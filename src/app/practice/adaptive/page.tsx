import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensureProgress } from "@/lib/progress";
import { AppHeader } from "@/components/AppHeader";
import { QuizRunner } from "@/components/QuizRunner";
import { grammarLessons, getDailySession } from "@/content/daily";
import type { Mcq } from "@/content/types";

export const dynamic = "force-dynamic";

function parseOptions(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export default async function AdaptivePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();
  const progress = await ensureProgress(session.userId);

  // 1) Tus errores reales pendientes (lo que más urge repasar), priorizados por
  //    cuántas veces los has fallado.
  const mistakes = await prisma.mistakeItem.findMany({
    where: { userId: session.userId, mastered: false },
    orderBy: [{ timesWrong: "desc" }, { lastWrongAt: "desc" }],
  });

  const seen = new Set<string>();
  const replay: Mcq[] = [];
  for (const m of mistakes) {
    const options = parseOptions(m.options);
    if (options.length < 2 || m.answerIndex >= options.length) continue;
    const key = (m.sentence ?? m.prompt).toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    replay.push({
      kind: "mcq",
      prompt: m.prompt,
      sentence: m.sentence ?? undefined,
      options,
      answerIndex: m.answerIndex,
      explanation: m.explanation,
      translationEs: m.translationEs ?? undefined,
      topicTitle: m.topicTitle ?? undefined,
      topicWhy: m.topicWhy ?? undefined,
    });
  }

  // 2) Preguntas frescas de tus temas más débiles (refuerzo, no repaso literal).
  const weightByTopic = new Map<string, number>();
  for (const m of mistakes) {
    if (!m.topicTitle) continue;
    weightByTopic.set(m.topicTitle, (weightByTopic.get(m.topicTitle) ?? 0) + m.timesWrong);
  }
  const weakTopics = [...weightByTopic.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([t]) => t);

  const fresh: Mcq[] = [];
  for (const topic of weakTopics) {
    const lesson = grammarLessons.find((g) => g.title === topic);
    if (!lesson) continue;
    for (const m of lesson.practice) {
      const key = (m.sentence ?? m.prompt).toLowerCase().trim();
      if (seen.has(key)) continue;
      seen.add(key);
      fresh.push({
        ...m,
        topicTitle: m.topicTitle ?? lesson.title,
        topicWhy: m.topicWhy ?? lesson.tipEs,
      });
    }
  }

  // 3) Si casi no hay datos, repasamos la gramática reciente (nunca vacío).
  const general: Mcq[] = [];
  if (replay.length + fresh.length < 6) {
    const recent = getDailySession(progress.studyDay).grammarPractice;
    for (const m of recent) {
      const key = (m.sentence ?? m.prompt).toLowerCase().trim();
      if (seen.has(key)) continue;
      seen.add(key);
      general.push(m);
    }
  }

  // Mezcla: primero tus errores (máx 8), luego refuerzo, luego general. Tope 12.
  const quiz: Mcq[] = [...replay.slice(0, 8), ...fresh, ...general].slice(0, 12);

  const hasMistakes = replay.length > 0;
  const subtitle = hasMistakes
    ? `Repasamos ${Math.min(replay.length, 8)} de tus errores recientes${
        weakTopics.length ? ` y reforzamos: ${weakTopics.join(", ")}` : ""
      }.`
    : "Un repaso general para mantener tus bases firmes. Conforme falles preguntas, este reto se enfocará en tus puntos débiles.";

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <QuizRunner
        questions={quiz}
        title="🧠 Repaso inteligente"
        subtitle={subtitle}
        accent="amber"
      />
    </div>
  );
}
