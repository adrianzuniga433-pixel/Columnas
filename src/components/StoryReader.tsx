"use client";

import { useState } from "react";
import Link from "next/link";
import { ActivityCard, type ActivityResult } from "./ActivityCard";
import { SpeechButton } from "./SpeechButton";
import type { Story } from "@/content/stories";
import type { Mcq } from "@/content/types";

export function StoryReader({ story }: { story: Story }) {
  const [showGloss, setShowGloss] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);

  const questions: Mcq[] = story.questions.map((q) => ({
    kind: "mcq",
    prompt: q.prompt,
    options: q.options,
    answerIndex: q.answerIndex,
    explanation: q.explanation,
  }));
  const total = questions.length;
  const finished = step >= total;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  function listenAll() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    for (const p of story.paragraphs) {
      const u = new SpeechSynthesisUtterance(p);
      u.lang = "en-US";
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  }

  function handleDone(r: ActivityResult) {
    setCorrect((c) => c + r.correct);
    setStep((s) => s + 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <Link href="/reading" className="btn-ghost mb-4 inline-block">
        ← Otras historias
      </Link>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">{story.title}</h1>
        <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-100">
          {story.emoji} {story.level}
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <SpeechButton text={story.paragraphs.join(" ")} label="🔊 Escuchar historia" />
        <button className="btn-ghost" onClick={() => setShowGloss((s) => !s)}>
          {showGloss ? "Ocultar glosario" : "Ver glosario"}
        </button>
      </div>

      <article className="card space-y-3 text-[15px] leading-relaxed">
        {story.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      {showGloss && (
        <div className="card mt-4">
          <p className="mb-2 text-sm font-semibold">📒 Glosario</p>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {story.glossary.map((g, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium">{g.en}</span>
                <span className="text-slate-500"> — {g.es}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preguntas de comprensión */}
      <div className="card mt-4">
        {!quizStarted ? (
          <div className="text-center">
            <p className="mb-3 text-sm text-slate-500">
              ¿Listo? Responde {total} preguntas sobre la historia.
            </p>
            <button className="btn-primary" onClick={() => setQuizStarted(true)}>
              Responder preguntas →
            </button>
          </div>
        ) : !finished ? (
          <div key={step} className="animate-slide-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Pregunta {step + 1} de {total}
            </p>
            <ActivityCard activity={questions[step]} onDone={handleDone} />
          </div>
        ) : (
          <div className="animate-pop-in text-center">
            <div className="mb-2 text-5xl">{pct >= 70 ? "🎉" : "💪"}</div>
            <h2 className="mb-1 text-xl font-bold">¡Lectura completada!</h2>
            <p className="mb-4 text-slate-500">
              Acertaste {correct} de {total} ({pct}%).
            </p>
            <Link href="/reading" className="btn-primary">
              Leer otra historia →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
