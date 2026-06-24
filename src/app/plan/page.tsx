import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { AppHeader } from "@/components/AppHeader";
import { PlanForm } from "@/components/PlanForm";
import { getStudyPlan } from "@/lib/plan";
import { GOAL_SCORE, ITP_MIN, ITP_MAX } from "@/lib/itp";

export const dynamic = "force-dynamic";

export default async function PlanPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const user = await getCurrentUser();
  const plan = await getStudyPlan(session.userId);

  // Posición del puntaje actual, proyectado y meta en la barra 310–677.
  const pos = (s: number) =>
    Math.max(0, Math.min(100, ((s - ITP_MIN) / (ITP_MAX - ITP_MIN)) * 100));

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver al panel
        </Link>
        <h1 className="text-2xl font-bold">🎯 Plan hacia tu examen</h1>
        <p className="mb-6 text-sm text-slate-500">
          Pon tu fecha de examen y tu meta. Calculamos si vas a tiempo y qué
          reforzar para llegar.
        </p>

        {!plan.hasPlan ? (
          <PlanForm
            initialDate={null}
            initialTarget={progress.targetScore ?? GOAL_SCORE}
            goalDefault={GOAL_SCORE}
          />
        ) : (
          <>
            {/* Cuenta regresiva + estado */}
            <div
              className={`card mb-6 border-l-4 ${
                plan.onTrack ? "border-l-emerald-500" : "border-l-amber-500"
              }`}
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Faltan</p>
                  <p className="text-4xl font-bold text-brand-600">
                    {plan.daysLeft}{" "}
                    <span className="text-lg font-normal text-slate-500">días</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Examen: {plan.examDate} · meta {plan.target} ({plan.cefrTarget})
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    plan.onTrack
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                  }`}
                >
                  {plan.onTrack ? "✅ Vas a tiempo" : "⚠️ Necesitas más ritmo"}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {plan.message}
              </p>
            </div>

            {/* Proyección de puntaje */}
            <div className="card mb-6">
              <h2 className="mb-4 text-lg font-semibold">Proyección de puntaje</h2>
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>{ITP_MIN}</span>
                <span>{ITP_MAX}</span>
              </div>
              <div className="relative h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                {/* meta */}
                <div
                  className="absolute -top-1 h-5 w-0.5 bg-slate-500"
                  style={{ left: `${pos(plan.target)}%` }}
                  title={`Meta ${plan.target}`}
                />
                {/* proyectado */}
                <div
                  className={`h-full rounded-full ${plan.onTrack ? "bg-emerald-500" : "bg-amber-500"}`}
                  style={{ width: `${pos(plan.projectedScore)}%` }}
                />
                {/* actual */}
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-brand-600 dark:border-slate-900"
                  style={{ left: `calc(${pos(plan.current)}% - 6px)` }}
                  title={`Actual ${plan.current}`}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold text-brand-600">{plan.current}</p>
                  <p className="text-xs text-slate-500">Hoy</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${plan.onTrack ? "text-emerald-600" : "text-amber-600"}`}>
                    {plan.projectedScore}
                  </p>
                  <p className="text-xs text-slate-500">Proyectado</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{plan.target}</p>
                  <p className="text-xs text-slate-500">Meta</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Estimación basada en tu constancia: {plan.studyDaysLast14}/14 días
                estudiados en las últimas 2 semanas (~{plan.gainPerWeek} pts/semana).
              </p>
            </div>

            {/* Foco recomendado */}
            <div className="card mb-6">
              <h2 className="mb-2 text-lg font-semibold">Tu foco de esta semana</h2>
              {plan.focusLabel ? (
                <>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Tu área más débil es <strong>{plan.focusLabel}</strong>. Si subes
                    ahí, tu puntaje sube más rápido.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {plan.focusHref && (
                      <Link href={plan.focusHref} className="btn-primary">
                        Reforzar {plan.focusLabel} →
                      </Link>
                    )}
                    <Link href="/today" className="btn-secondary">
                      Sesión de hoy
                    </Link>
                    <Link href="/progress" className="btn-ghost">
                      Ver mi progreso
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  Completa lecciones y un examen para detectar tu área más débil.
                </p>
              )}
            </div>

            <PlanForm
              initialDate={plan.examDate}
              initialTarget={plan.target}
              goalDefault={GOAL_SCORE}
            />
          </>
        )}
      </main>
    </div>
  );
}
