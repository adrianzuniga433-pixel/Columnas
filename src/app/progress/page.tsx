import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { AppHeader } from "@/components/AppHeader";
import { getProgressInsights } from "@/lib/insights";
import { AREA_LABELS, GOAL_SCORE, type Area } from "@/lib/itp";

export const dynamic = "force-dynamic";

// A dónde mandar al usuario para reforzar cada área.
const AREA_ACTION: Record<Area, { href: string; label: string }> = {
  listening: { href: "/today?section=comprension", label: "Practicar comprensión auditiva" },
  structure: { href: "/grammar", label: "Repasar gramática" },
  reading: { href: "/reading", label: "Leer en la biblioteca" },
  vocab: { href: "/today?section=vocab", label: "Estudiar vocabulario" },
};

function barColor(pct: number): string {
  if (pct >= 75) return "bg-emerald-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-rose-500";
}

export default async function ProgressPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const user = await getCurrentUser();
  const ins = await getProgressInsights(session.userId);

  const hasData = ins.areaInsights.length > 0 || ins.totalExams > 0;
  const maxBar = Math.max(100, ...ins.scoreTimeline.map((p) => p.pct));

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver al panel
        </Link>
        <h1 className="text-2xl font-bold">📊 Mi progreso y debilidades</h1>
        <p className="mb-6 text-sm text-slate-500">
          Convertimos tus errores y exámenes en un diagnóstico claro de qué
          reforzar para llegar a la meta de {GOAL_SCORE}.
        </p>

        {!hasData ? (
          <div className="card text-center">
            <div className="mb-2 text-4xl">🌱</div>
            <p className="font-medium">Aún no hay suficientes datos</p>
            <p className="mt-1 text-sm text-slate-500">
              Completa lecciones y presenta un examen para ver tu diagnóstico de
              fortalezas y debilidades.
            </p>
            <Link href="/today" className="btn-primary mt-4 inline-block">
              Ir a mi estudio
            </Link>
          </div>
        ) : (
          <>
            {/* Diagnóstico principal */}
            <div className="card mb-6 border-l-4 border-l-brand-500">
              <p className="text-sm font-semibold text-brand-600">🔎 Diagnóstico</p>
              {ins.weakestArea ? (
                <>
                  <p className="mt-1 text-lg font-bold">
                    Tu punto más débil es {AREA_LABELS[ins.weakestArea.area]} ({ins.weakestArea.pct}%).
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {ins.strongestArea && ins.strongestArea.area !== ins.weakestArea.area
                      ? `Tu mejor área es ${AREA_LABELS[ins.strongestArea.area]} (${ins.strongestArea.pct}%). `
                      : ""}
                    Enfócate aquí para subir tu puntaje más rápido.
                  </p>
                  <Link
                    href={AREA_ACTION[ins.weakestArea.area].href}
                    className="btn-primary mt-3 inline-block"
                  >
                    {AREA_ACTION[ins.weakestArea.area].label} →
                  </Link>
                </>
              ) : (
                <p className="mt-1 text-sm text-slate-500">
                  Presenta un examen para identificar tu área más débil.
                </p>
              )}
            </div>

            {/* Resumen numérico */}
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="card !p-4">
                <p className="text-xs text-slate-500">Puntaje estimado</p>
                <p className="text-2xl font-bold text-brand-600">{ins.estimatedItpScore}</p>
                <p className="text-xs text-slate-400">{ins.cefr}</p>
              </div>
              <div className="card !p-4">
                <p className="text-xs text-slate-500">Mejor simulacro</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {ins.bestMockScore ?? "—"}
                </p>
                <p className="text-xs text-slate-400">
                  {ins.bestMockScore ? "puntaje ITP" : "sin simulacros"}
                </p>
              </div>
              <div className="card !p-4">
                <p className="text-xs text-slate-500">Errores dominados</p>
                <p className="text-2xl font-bold text-emerald-600">{ins.mistakesMastered}</p>
                <p className="text-xs text-slate-400">{ins.mistakesPending} por repasar</p>
              </div>
              <div className="card !p-4">
                <p className="text-xs text-slate-500">Exámenes hechos</p>
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{ins.totalExams}</p>
                <p className="text-xs text-slate-400">avance hacia meta {ins.goalPct}%</p>
              </div>
            </div>

            {/* Desempeño por área */}
            <div className="card mb-6">
              <h2 className="mb-4 text-lg font-semibold">Desempeño por área</h2>
              <div className="space-y-4">
                {ins.areaInsights.map((a) => (
                  <div key={a.area}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{AREA_LABELS[a.area]}</span>
                      <span className="text-slate-500">
                        {a.pct}% <span className="text-xs text-slate-400">· {a.samples} datos</span>
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${barColor(a.pct)}`}
                        style={{ width: `${a.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Combina la nota de tus lecciones y el desglose por sección de tus exámenes.
              </p>
            </div>

            {/* Evolución del puntaje */}
            {ins.scoreTimeline.length > 0 && (
              <div className="card mb-6">
                <h2 className="mb-4 text-lg font-semibold">Evolución de tus exámenes</h2>
                <div className="flex items-end gap-2 overflow-x-auto pb-2">
                  {ins.scoreTimeline.map((p, i) => (
                    <div key={i} className="flex min-w-[2.5rem] flex-col items-center gap-1">
                      <span className="text-[10px] font-medium text-slate-500">{p.pct}%</span>
                      <div className="flex h-32 w-7 items-end rounded bg-slate-100 dark:bg-slate-800">
                        <div
                          className={`w-full rounded ${
                            p.type === "mock" ? "bg-indigo-500" : "bg-brand-500"
                          }`}
                          style={{ height: `${(p.pct / maxBar) * 100}%` }}
                        />
                      </div>
                      <span className="max-w-[3rem] truncate text-center text-[9px] text-slate-400">
                        {p.label}
                      </span>
                      <span className="text-[9px] text-slate-400">
                        {new Date(p.date).toLocaleDateString("es", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-500" /> Examen de nivel/avance
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" /> Simulacro completo
                  </span>
                </div>
              </div>
            )}

            {/* Conceptos más fallados */}
            <div className="card mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Conceptos que más fallas</h2>
                {ins.mistakesPending > 0 && (
                  <Link href="/mistakes" className="text-sm text-brand-600 hover:underline">
                    Repasar todos →
                  </Link>
                )}
              </div>
              {ins.topicWeaknesses.length > 0 ? (
                <ul className="space-y-2">
                  {ins.topicWeaknesses.map((t) => (
                    <li
                      key={t.key}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
                    >
                      <span className="text-sm">{t.title}</span>
                      <span className="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        {t.timesWrong}× fallado
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  🎉 No tienes errores pendientes. ¡Buen trabajo manteniéndolos al día!
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
