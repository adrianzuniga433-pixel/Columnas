"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActivityCard, type ActivityResult } from "./ActivityCard";
import type { Mcq } from "@/content/types";

const PASS = 0.7;

export function CheckpointExam({
  milestone,
  questions,
  alreadyPassed,
}: {
  milestone: number;
  questions: Mcq[];
  alreadyPassed: boolean;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "exam" | "done">("intro");
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [saved, setSaved] = useState(false);

  const total = questions.length;
  const score = total > 0 ? correct / total : 0;
  const passed = score >= PASS;
  const pct = Math.round(score * 100);

  function handleDone(r: ActivityResult) {
    const nextCorrect = correct + r.correct;
    if (step + 1 >= total) {
      setCorrect(nextCorrect);
      const finalScore = total > 0 ? nextCorrect / total : 0;
      fetch("/api/checkpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestone,
          score: finalScore,
          passed: finalScore >= PASS,
        }),
      })
        .then(() => {
          setSaved(true);
          router.refresh();
        })
        .catch(() => setSaved(true));
      setPhase("done");
    } else {
      setCorrect(nextCorrect);
      setStep((s) => s + 1);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100">
          📋 Examen de avance #{milestone}
        </span>
      </div>

      {phase === "intro" && (
        <div className="card animate-slide-up">
          {alreadyPassed && (
            <div className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✓ Ya aprobaste este examen. Puedes repetirlo para practicar.
            </div>
          )}
          <h1 className="mb-2 text-2xl font-bold">Examen de avance</h1>
          <p className="mb-4 text-slate-600 dark:text-slate-300">
            Este examen repasa la gramática de los últimos {questions.length / 2}{" "}
            días. Son {total} preguntas y necesitas <strong>{Math.round(PASS * 100)}%</strong>{" "}
            para aprobarlo. ¡Tú puedes! 💪
          </p>
          <button className="btn-primary" onClick={() => setPhase("exam")}>
            Empezar examen →
          </button>
        </div>
      )}

      {phase === "exam" && (
        <>
          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${Math.round((step / total) * 100)}%` }}
            />
          </div>
          <div className="card">
            <div key={step} className="animate-slide-up">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                Pregunta {step + 1} de {total}
              </p>
              <ActivityCard activity={questions[step]} onDone={handleDone} />
            </div>
          </div>
        </>
      )}

      {phase === "done" && (
        <div className="card animate-pop-in text-center">
          <div className="mb-2 text-5xl">{passed ? "🎉" : "💪"}</div>
          <h2 className="mb-1 text-xl font-bold">
            {passed ? "¡Aprobado!" : "Casi lo logras"}
          </h2>
          <p className="mb-1 text-slate-500">
            Acertaste {correct} de {total} ({pct}%).
          </p>
          <p className="mb-4 text-sm text-slate-400">
            {passed
              ? "¡Vas aprendiendo muy bien! Sigue con tu sesión diaria."
              : "Repasa tus errores y la biblioteca de gramática, y vuelve a intentarlo."}
            {saved ? "" : " (guardando...)"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/dashboard" className="btn-secondary">
              Ir al panel
            </Link>
            {!passed && (
              <Link href="/mistakes" className="btn-primary">
                Repasar mis errores →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
