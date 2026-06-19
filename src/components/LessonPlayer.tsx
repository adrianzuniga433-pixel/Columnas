"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LessonDef } from "@/content/types";
import { ActivityCard, type ActivityResult } from "./ActivityCard";
import { AREA_LABELS, type Area } from "@/lib/itp";

export function LessonPlayer({
  lesson,
  nextLessonId,
}: {
  lesson: LessonDef;
  nextLessonId: string | null;
}) {
  const router = useRouter();
  const activities = lesson.content.activities;
  const hasIntro = !!lesson.content.intro;

  // step -1 = intro; 0..n-1 = activities; n = resumen
  const [step, setStep] = useState(hasIntro ? -1 : 0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const totalSteps = activities.length;
  const finished = step >= totalSteps;
  const progressPct = Math.min(
    100,
    Math.round((Math.max(0, step) / totalSteps) * 100)
  );

  function handleDone(r: ActivityResult) {
    setCorrect((c) => c + r.correct);
    setTotal((t) => t + r.total);
    setStep((s) => s + 1);
  }

  async function finishLesson() {
    setSaving(true);
    const score = total > 0 ? correct / total : 1;
    try {
      await fetch(`/api/lessons/${lesson.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      setSaved(true);
      router.refresh();
    } catch {
      // aún así dejamos continuar
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const pct = total > 0 ? Math.round((correct / total) * 100) : 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-100">
          {AREA_LABELS[lesson.area as Area]}
        </span>
      </div>

      <h1 className="mb-1 text-2xl font-bold">{lesson.title}</h1>
      <p className="mb-4 text-sm text-slate-500">Nivel {lesson.level}</p>

      {/* Barra de progreso */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300"
          style={{ width: `${finished ? 100 : progressPct}%` }}
        />
      </div>

      <div className="card">
        {step === -1 && lesson.content.intro && (
          <div className="animate-slide-up">
            <h2 className="mb-3 text-lg font-semibold">Antes de practicar</h2>
            <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-200">
              {lesson.content.intro.explanationEs}
            </p>
            {lesson.content.intro.examples.length > 0 && (
              <ul className="mb-4 space-y-2">
                {lesson.content.intro.examples.map((ex, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
                  >
                    <span className="font-medium">{ex.en}</span>
                    <span className="text-slate-500"> — {ex.es}</span>
                  </li>
                ))}
              </ul>
            )}
            <button className="btn-primary" onClick={() => setStep(0)}>
              Empezar práctica →
            </button>
          </div>
        )}

        {step >= 0 && !finished && (
          <div key={step} className="animate-slide-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Actividad {step + 1} de {totalSteps}
            </p>
            <ActivityCard activity={activities[step]} onDone={handleDone} />
          </div>
        )}

        {finished && (
          <div className="animate-pop-in text-center">
            <div className="mb-2 text-5xl">{pct >= 70 ? "🎉" : "💪"}</div>
            <h2 className="mb-1 text-xl font-bold">Lección completada</h2>
            <p className="mb-4 text-slate-500">
              Acertaste {correct} de {total} ({pct}%).
            </p>
            {!saved ? (
              <button
                className="btn-primary"
                onClick={finishLesson}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar progreso"}
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  ✓ Progreso guardado
                </p>
                <div className="flex gap-2">
                  <Link href="/dashboard" className="btn-secondary">
                    Ir al panel
                  </Link>
                  {nextLessonId && (
                    <Link
                      href={`/lesson/${nextLessonId}`}
                      className="btn-primary"
                      onClick={() => {
                        setStep(hasIntro ? -1 : 0);
                      }}
                    >
                      Siguiente lección →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
