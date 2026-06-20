import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { ensureProgress, getProgressStats } from "@/lib/progress";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/AppHeader";
import { computeAchievements } from "@/lib/achievements";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  const progress = await ensureProgress(session.userId);
  const stats = await getProgressStats(session.userId);
  const [mistakesMastered, examsPassed] = await Promise.all([
    prisma.mistakeItem.count({ where: { userId: session.userId, mastered: true } }),
    prisma.examAttempt.count({ where: { userId: session.userId, passed: true } }),
  ]);

  const achievements = computeAchievements({
    streak: progress.streakCount,
    wordsLearned: stats.wordsLearned,
    daysStudied: stats.studyDates.size,
    mistakesMastered,
    examsPassed,
    studyDay: progress.studyDay,
  });

  const earned = achievements.filter((a) => a.earned).length;

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver al panel
        </Link>
        <h1 className="text-2xl font-bold">🏆 Logros</h1>
        <p className="mb-6 text-sm text-slate-500">
          Has desbloqueado {earned} de {achievements.length} insignias. ¡Sigue así!
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`card flex items-center gap-3 ${
                a.earned ? "" : "opacity-70"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl ${
                  a.earned
                    ? "bg-amber-100 dark:bg-amber-900"
                    : "bg-slate-100 grayscale dark:bg-slate-800"
                }`}
              >
                {a.earned ? a.icon : "🔒"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{a.title}</p>
                <p className="text-xs text-slate-500">{a.desc}</p>
                {!a.earned && (
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${Math.round((a.current / a.goal) * 100)}%` }}
                    />
                  </div>
                )}
                {!a.earned && (
                  <p className="mt-1 text-[11px] text-slate-400">
                    {a.current} / {a.goal}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
