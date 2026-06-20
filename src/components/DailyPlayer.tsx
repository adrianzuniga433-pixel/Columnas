"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ActivityCard, type ActivityResult } from "./ActivityCard";
import type { DailySession } from "@/content/daily";

type Phase = "intro" | "activities" | "wrapup" | "done";

export function DailyPlayer({
  session,
  alreadyDoneToday,
}: {
  session: DailySession;
  alreadyDoneToday: boolean;
}) {
  const router = useRouter();
  const activities = session.activities;

  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [saving, setSaving] = useState(false);

  const totalSteps = activities.length;
  const progressPct =
    phase === "intro"
      ? 0
      : phase === "activities"
        ? Math.round((step / totalSteps) * 100)
        : 100;

  function handleDone(r: ActivityResult) {
    setCorrect((c) => c + r.correct);
    setTotal((t) => t + r.total);
    if (step + 1 >= totalSteps) {
      setPhase("wrapup");
    } else {
      setStep((s) => s + 1);
    }
  }

  async function finish() {
    setSaving(true);
    try {
      await fetch("/api/daily/complete", { method: "POST" });
      router.refresh();
    } catch {
      // continuamos de todos modos
    } finally {
      setSaving(false);
      setPhase("done");
    }
  }

  const pct = total > 0 ? Math.round((correct / total) * 100) : 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Cabecera */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-100">
          {session.stageEmoji} {session.stage} · Semana {session.week}
        </span>
      </div>

      <h1 className="text-2xl font-bold">Día {session.day}</h1>
      <p className="mb-4 text-sm text-slate-500">{session.monthFocus}</p>

      {/* Barra de progreso */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="card">
        {/* --- Intro de gramática --- */}
        {phase === "intro" && (
          <div className="animate-slide-up">
            {alreadyDoneToday && (
              <div className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                ✓ Ya completaste la sesión de hoy. Puedes repasarla otra vez si
                quieres; el día avanzará mañana.
              </div>
            )}
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
              📘 Gramática del día
            </p>
            <h2 className="mb-3 text-lg font-semibold">{session.grammar.title}</h2>
            <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-200">
              {session.grammar.tipEs}
            </p>
            <ul className="mb-4 space-y-2">
              {session.grammar.examples.map((ex, i) => (
                <li
                  key={i}
                  className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
                >
                  <span className="font-medium">{ex.en}</span>
                  <span className="text-slate-500"> — {ex.es}</span>
                </li>
              ))}
            </ul>
            <p className="mb-4 text-sm text-slate-500">
              Hoy practicarás vocabulario de <strong>{session.vocab.theme}</strong>,
              gramática, comprensión y producción. ¡Vamos! 💪
            </p>
            <button className="btn-primary" onClick={() => setPhase("activities")}>
              Empezar la sesión →
            </button>
          </div>
        )}

        {/* --- Actividades --- */}
        {phase === "activities" && (
          <div key={step} className="animate-slide-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Actividad {step + 1} de {totalSteps}
            </p>
            <ActivityCard activity={activities[step]} onDone={handleDone} />
          </div>
        )}

        {/* --- Producción + recursos --- */}
        {phase === "wrapup" && (
          <div className="animate-slide-up">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
              ✏️ Producción del día
            </p>
            <p className="mb-3 leading-relaxed text-slate-700 dark:text-slate-200">
              {session.productionPrompt}
            </p>
            <Link
              href="/practice/writing"
              className="btn-secondary mb-2 inline-block"
            >
              Escribir y recibir retroalimentación →
            </Link>
            <p className="mb-5 text-xs text-slate-400">
              Tip: también puedes decir tu respuesta en voz alta para practicar
              pronunciación.
            </p>

            <div className="mb-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="mb-3 text-sm font-semibold">🎬 Recursos de hoy</p>
              <ul className="space-y-2">
                {session.resources.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span>{r.icon}</span>
                    <span>
                      <strong>{r.label}:</strong>{" "}
                      <span className="text-slate-600 dark:text-slate-300">
                        {r.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn-primary" onClick={finish} disabled={saving}>
              {saving ? "Guardando..." : "Completar sesión de hoy ✓"}
            </button>
          </div>
        )}

        {/* --- Final --- */}
        {phase === "done" && (
          <div className="animate-pop-in text-center">
            <div className="mb-2 text-5xl">🎉</div>
            <h2 className="mb-1 text-xl font-bold">¡Sesión completada!</h2>
            <p className="mb-1 text-slate-500">
              Práctica: acertaste {correct} de {total} ({pct}%).
            </p>
            <p className="mb-4 text-sm text-slate-400">
              Las palabras de hoy se agregaron a tus repasos. ¡Vuelve mañana para
              el Día {session.day + 1}!
            </p>
            <div className="flex justify-center gap-2">
              <Link href="/dashboard" className="btn-secondary">
                Ir al panel
              </Link>
              <Link href="/review" className="btn-primary">
                Repasar vocabulario →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
