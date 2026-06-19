import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { getDashboardData } from "@/lib/dashboard";
import { AppHeader } from "@/components/AppHeader";
import {
  AREA_LABELS,
  GOAL_SCORE,
  LEVELS,
  cefrForScore,
  getLevel,
  progressToGoal,
  type Area,
} from "@/lib/itp";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const user = await getCurrentUser();
  const data = await getDashboardData(session.userId);
  const levelDef = getLevel(data.currentLevel);
  const goalPct = Math.round(progressToGoal(data.estimatedItpScore) * 100);
  const reachedGoal = data.estimatedItpScore >= GOAL_SCORE;

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Encabezado de bienvenida */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Hola{user?.name ? `, ${user.name}` : ""} 👋
          </h1>
          <p className="text-sm text-slate-500">
            Nivel {data.currentLevel} — {levelDef.name} · {levelDef.cefr}
          </p>
        </div>

        {/* Fila superior: meta + acciones rápidas */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Puntaje y meta */}
          <div className="card md:col-span-2">
            <div className="mb-2 flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Puntaje ITP estimado</p>
                <p className="text-4xl font-bold text-brand-600">
                  {data.estimatedItpScore}
                </p>
                <p className="text-xs text-slate-400">
                  Nivel MCER: {cefrForScore(data.estimatedItpScore)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Meta</p>
                <p className="text-2xl font-semibold">{GOAL_SCORE}</p>
              </div>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all ${
                  reachedGoal ? "bg-emerald-500" : "bg-brand-500"
                }`}
                style={{ width: `${goalPct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {reachedGoal
                ? "🎉 ¡Has alcanzado la meta de 400! Sigue reforzando para asegurarla."
                : `Avance hacia 400: ${goalPct}%`}
            </p>
          </div>

          {/* Racha + repasos */}
          <div className="flex flex-col gap-4">
            <div className="card flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Racha</p>
                <p className="text-2xl font-bold">{data.streakCount} 🔥</p>
              </div>
            </div>
            <Link
              href="/review"
              className={`card flex items-center justify-between transition-colors hover:border-brand-400 ${
                data.dueCount > 0 ? "ring-1 ring-brand-300" : ""
              }`}
            >
              <div>
                <p className="text-sm text-slate-500">Repasos de hoy</p>
                <p className="text-2xl font-bold">{data.dueCount}</p>
              </div>
              <span className="text-brand-600">→</span>
            </Link>
          </div>
        </div>

        {/* CTA principal */}
        <div className="mt-4 card bg-brand-600 text-white dark:bg-brand-700">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {data.levelLessonsCompleted
                  ? "¡Completaste las lecciones de este nivel!"
                  : "Continúa donde te quedaste"}
              </h2>
              <p className="text-sm text-brand-50">
                {data.levelLessonsCompleted
                  ? "Presenta el examen para desbloquear el siguiente nivel."
                  : levelDef.focus}
              </p>
            </div>
            {data.levelLessonsCompleted ? (
              <Link
                href={`/exam/${data.currentLevel}`}
                className="btn bg-white text-brand-700 hover:bg-brand-50"
              >
                Tomar examen de nivel
              </Link>
            ) : data.continueLessonId ? (
              <Link
                href={`/lesson/${data.continueLessonId}`}
                className="btn bg-white text-brand-700 hover:bg-brand-50"
              >
                Continuar estudiando
              </Link>
            ) : null}
          </div>
        </div>

        {/* Lecciones del nivel */}
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">
            Lecciones del nivel {data.currentLevel}
          </h2>
          <div className="grid gap-2">
            {data.lessons.map((l, i) => (
              <Link
                key={l.id}
                href={`/lesson/${l.id}`}
                className="card flex items-center justify-between !p-4 transition-colors hover:border-brand-400"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      l.completed
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                    }`}
                  >
                    {l.completed ? "✓" : i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{l.title}</p>
                    <p className="text-xs text-slate-400">
                      {AREA_LABELS[l.area]}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-slate-400">
                  {l.completed ? `${Math.round((l.score ?? 0) * 100)}%` : "Empezar →"}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Dominio por área */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="card">
            <h2 className="mb-4 text-lg font-semibold">Dominio por área</h2>
            <div className="space-y-3">
              {data.areaMastery.map((m) => (
                <div key={m.area}>
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>{AREA_LABELS[m.area]}</span>
                    <span>{m.count > 0 ? `${m.pct}%` : "—"}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa de niveles */}
          <div className="card">
            <h2 className="mb-4 text-lg font-semibold">Tu ruta</h2>
            <ol className="space-y-2">
              {LEVELS.map((lv) => {
                const unlocked = lv.level <= data.unlockedLevel;
                const current = lv.level === data.currentLevel;
                return (
                  <li
                    key={lv.level}
                    className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${
                      current ? "bg-brand-50 dark:bg-brand-950" : ""
                    }`}
                  >
                    <span className="text-lg">
                      {unlocked ? (current ? "📍" : "✓") : "🔒"}
                    </span>
                    <div>
                      <p className="text-sm font-medium">
                        Nivel {lv.level} — {lv.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {lv.bandLabel} · {lv.cefr}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Historial de exámenes */}
        {data.examHistory.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-semibold">Historial de exámenes</h2>
            <div className="card !p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/60">
                  <tr>
                    <th className="px-4 py-2">Nivel</th>
                    <th className="px-4 py-2">Puntaje</th>
                    <th className="px-4 py-2">Resultado</th>
                    <th className="px-4 py-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {data.examHistory.map((a, i) => (
                    <tr
                      key={i}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <td className="px-4 py-2">Nivel {a.level}</td>
                      <td className="px-4 py-2">{a.score}%</td>
                      <td className="px-4 py-2">
                        {a.passed ? (
                          <span className="text-emerald-600">Aprobado</span>
                        ) : (
                          <span className="text-amber-600">No aprobado</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-slate-400">
                        {new Date(a.attemptedAt).toLocaleDateString("es")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Acciones extra */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <Link
            href="/practice/writing"
            className="text-sm text-brand-600 hover:underline"
          >
            ✍️ Práctica de escritura libre con retroalimentación
          </Link>
          <Link
            href="/placement"
            className="text-sm text-slate-400 hover:text-brand-600 hover:underline"
          >
            Repetir evaluación diagnóstica
          </Link>
        </div>
      </main>
    </div>
  );
}
