"use client";

import { useState } from "react";
import Link from "next/link";
import { ActivityCard, type ActivityResult } from "./ActivityCard";
import type { Mcq } from "@/content/types";

export function QuizRunner({
  questions,
  title,
  subtitle,
  accent = "brand",
}: {
  questions: Mcq[];
  title: string;
  subtitle: string;
  accent?: "brand" | "amber" | "indigo";
}) {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);

  const total = questions.length;
  const finished = step >= total;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  function recordMistake(mcq: Mcq) {
    const conceptKey = (mcq.sentence ?? mcq.prompt)
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);
    fetch("/api/mistakes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conceptKey,
        prompt: mcq.prompt,
        sentence: mcq.sentence,
        options: mcq.options,
        answerIndex: mcq.answerIndex,
        explanation: mcq.explanation,
        translationEs: mcq.translationEs,
        topicTitle: mcq.topicTitle,
        topicWhy: mcq.topicWhy,
      }),
    }).catch(() => {});
  }

  function handleDone(r: ActivityResult) {
    if (r.correct < r.total) recordMistake(questions[step]);
    setCorrect((c) => c + r.correct);
    setStep((s) => s + 1);
  }

  const bar =
    accent === "amber" ? "bg-amber-500" : accent === "indigo" ? "bg-indigo-500" : "bg-brand-500";

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mb-4 text-sm text-slate-500">{subtitle}</p>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-300 ${bar}`}
          style={{ width: `${total ? Math.round((Math.min(step, total) / total) * 100) : 0}%` }}
        />
      </div>

      <div className="card">
        {!finished ? (
          <div key={step} className="animate-slide-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Pregunta {step + 1} de {total}
            </p>
            <ActivityCard activity={questions[step]} onDone={handleDone} />
          </div>
        ) : (
          <div className="animate-pop-in text-center">
            <div className="mb-2 text-5xl">{pct >= 70 ? "🎉" : "💪"}</div>
            <h2 className="mb-1 text-xl font-bold">Reto completado</h2>
            <p className="mb-4 text-slate-500">
              Acertaste {correct} de {total} ({pct}%).
            </p>
            <div className="flex justify-center gap-2">
              <Link href="/dashboard" className="btn-secondary">
                Ir al panel
              </Link>
              <Link href="/mistakes" className="btn-primary">
                Repasar errores →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
