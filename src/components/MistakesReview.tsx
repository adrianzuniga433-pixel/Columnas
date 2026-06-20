"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActivityCard, type ActivityResult } from "./ActivityCard";
import type { Mcq } from "@/content/types";

export interface MistakeMcq {
  conceptKey: string;
  mcq: Mcq;
}

export function MistakesReview({ items }: { items: MistakeMcq[] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [mastered, setMastered] = useState(0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver
        </Link>
        <div className="card">
          <div className="mb-2 text-5xl">✅</div>
          <h1 className="mb-1 text-xl font-bold">¡Sin errores pendientes!</h1>
          <p className="text-slate-500">
            Cuando falles una pregunta de gramática, aparecerá aquí para que la
            repases hasta dominarla.
          </p>
        </div>
      </div>
    );
  }

  const finished = step >= items.length;

  function handleDone(r: ActivityResult) {
    const correct = r.correct >= r.total;
    if (correct) setMastered((m) => m + 1);
    fetch("/api/mistakes/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conceptKey: items[step].conceptKey, correct }),
    }).catch(() => {});
    setStep((s) => s + 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-100">
          🔁 Repaso de errores
        </span>
      </div>
      <h1 className="mb-1 text-2xl font-bold">Repaso de mis errores</h1>
      <p className="mb-4 text-sm text-slate-500">
        Vuelve a intentar las preguntas que fallaste. Si aciertas, se marcan como
        dominadas y dejan de aparecer.
      </p>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${Math.round((Math.min(step, items.length) / items.length) * 100)}%` }}
        />
      </div>

      <div className="card">
        {!finished ? (
          <div key={step} className="animate-slide-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Error {step + 1} de {items.length}
            </p>
            <ActivityCard activity={items[step].mcq} onDone={handleDone} />
          </div>
        ) : (
          <div className="animate-pop-in text-center">
            <div className="mb-2 text-5xl">{mastered === items.length ? "🎉" : "💪"}</div>
            <h2 className="mb-1 text-xl font-bold">Repaso terminado</h2>
            <p className="mb-4 text-slate-500">
              Dominaste {mastered} de {items.length}. Los que aún falles seguirán
              aquí para la próxima.
            </p>
            <div className="flex justify-center gap-2">
              <Link href="/dashboard" className="btn-secondary">
                Ir al panel
              </Link>
              <button
                className="btn-primary"
                onClick={() => {
                  setStep(0);
                  setMastered(0);
                  router.refresh();
                }}
              >
                Repasar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
