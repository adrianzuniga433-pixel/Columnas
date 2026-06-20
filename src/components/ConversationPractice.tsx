"use client";

import { useState } from "react";
import Link from "next/link";
import { SpeechButton } from "./SpeechButton";
import type { Dialogue } from "@/content/dialogues";

export function ConversationPractice({ dialogues }: { dialogues: Dialogue[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(true);

  const dialogue = dialogues.find((d) => d.id === selectedId) ?? null;

  function playAll(d: Dialogue) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    for (const line of d.lines) {
      const u = new SpeechSynthesisUtterance(line.en);
      u.lang = "en-US";
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  }

  if (!dialogue) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver al panel
        </Link>
        <h1 className="mb-1 text-2xl font-bold">💬 Práctica de conversación</h1>
        <p className="mb-6 text-sm text-slate-500">
          Elige una situación. Escucha el diálogo, lee la traducción y luego
          practica diciendo tu parte (los turnos de “Tú”) en voz alta.
        </p>
        <div className="grid gap-3">
          {dialogues.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className="card flex items-center justify-between text-left transition-colors hover:border-brand-400"
            >
              <div>
                <p className="font-semibold">{d.title}</p>
                <p className="text-sm text-slate-500">{d.situation}</p>
              </div>
              <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-100">
                {d.level}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <button
        onClick={() => setSelectedId(null)}
        className="btn-ghost mb-4"
      >
        ← Otras conversaciones
      </button>
      <h1 className="text-2xl font-bold">{dialogue.title}</h1>
      <p className="mb-4 text-sm text-slate-500">{dialogue.situation}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={() => playAll(dialogue)}>
          ▶ Escuchar diálogo
        </button>
        <button
          className="btn-ghost"
          onClick={() => setShowTranslation((s) => !s)}
        >
          {showTranslation ? "Ocultar traducción" : "Mostrar traducción"}
        </button>
      </div>

      <div className="space-y-3">
        {dialogue.lines.map((line, i) => {
          const isYou = line.speaker === "A";
          return (
            <div
              key={i}
              className={`flex ${isYou ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  isYou
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide opacity-70">
                  {line.who}
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{line.en}</p>
                  <SpeechButton
                    text={line.en}
                    label=""
                    className="!px-2 !py-1 !text-current"
                  />
                </div>
                {showTranslation && (
                  <p
                    className={`mt-1 text-sm ${
                      isYou ? "text-brand-100" : "text-slate-500"
                    }`}
                  >
                    {line.es}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">
        <p className="font-semibold">🗣️ Tu turno</p>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Vuelve a leer el diálogo en voz alta haciendo el papel de “Tú”. Intenta
          decir tus líneas sin ver la traducción. Repite hasta que te salga natural.
        </p>
      </div>
    </div>
  );
}
