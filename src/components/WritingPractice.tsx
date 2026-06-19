"use client";

import { useState } from "react";
import Link from "next/link";

const PROMPTS = [
  "Describe tu rutina diaria en inglés (5–6 oraciones).",
  "Escribe sobre tus planes para el próximo fin de semana.",
  "Describe tu trabajo o tus estudios y por qué te gustan.",
  "Cuenta qué hiciste el fin de semana pasado.",
];

export function WritingPractice({
  enabled,
  level,
}: {
  enabled: boolean;
  level: number;
}) {
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, text, level }),
      });
      const data = await res.json();
      if (res.ok) setFeedback(data.feedback);
      else setError(data.error ?? "Error");
    } catch {
      setError("No se pudo conectar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/dashboard" className="btn-ghost mb-4">
        ← Volver
      </Link>
      <h1 className="mb-1 text-2xl font-bold">Práctica de escritura</h1>
      <p className="mb-6 text-sm text-slate-500">
        Escribe en inglés y recibe retroalimentación personalizada (producción
        libre · pushed output).
      </p>

      {!enabled && (
        <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          La retroalimentación con IA está desactivada. Configura{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">
            ANTHROPIC_API_KEY
          </code>{" "}
          en el archivo <code>.env</code> para activarla. Aún puedes practicar
          escribiendo abajo.
        </div>
      )}

      <div className="card">
        <label className="label">Elige una consigna</label>
        <select
          className="input mb-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        >
          {PROMPTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label className="label">Tu texto en inglés</label>
        <textarea
          className="input min-h-[160px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your answer in English here..."
        />

        <button
          className="btn-primary mt-4"
          disabled={loading || text.trim().length < 5 || !enabled}
          onClick={submit}
        >
          {loading ? "Analizando..." : "Obtener retroalimentación"}
        </button>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}
      </div>

      {feedback && (
        <div className="card mt-4 animate-slide-up">
          <h2 className="mb-3 text-lg font-semibold">Retroalimentación</h2>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {feedback}
          </div>
        </div>
      )}
    </div>
  );
}
