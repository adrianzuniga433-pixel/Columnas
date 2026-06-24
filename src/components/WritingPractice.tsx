"use client";

import { useState } from "react";
import Link from "next/link";
import { checkWriting, type WritingFeedback } from "@/lib/writingCheck";

interface WritingReview {
  band: string;
  score: number;
  summary: string;
  corrections: { error: string; correction: string; why: string }[];
  improved: string;
}

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
  const [local, setLocal] = useState<WritingFeedback | null>(null);
  const [review, setReview] = useState<WritingReview | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    // Revisión local inmediata (sin IA).
    setLocal(checkWriting(text));
    setReview(null);
    setError(null);

    // Si hay IA configurada, además pide la reseña estructurada.
    if (enabled) {
      setLoading(true);
      try {
        const res = await fetch("/api/ai/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, text, level }),
        });
        const data = await res.json();
        if (res.ok) setReview(data.review as WritingReview);
        else setError(data.error ?? "Error");
      } catch {
        setError("No se pudo conectar con la IA.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/dashboard" className="btn-ghost mb-4">
        ← Volver
      </Link>
      <h1 className="mb-1 text-2xl font-bold">Práctica de escritura</h1>
      <p className="mb-6 text-sm text-slate-500">
        Escribe en inglés y recibe una revisión automática de tu texto.
      </p>

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
          disabled={loading || text.trim().length < 5}
          onClick={submit}
        >
          {loading ? "Analizando..." : "Revisar mi texto"}
        </button>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Revisión automática (sin IA) */}
      {local && (
        <div className="card mt-4 animate-slide-up">
          <h2 className="mb-3 text-lg font-semibold">Revisión de tu texto</h2>
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <span>📝 {local.words} palabras</span>
            <span>📄 {local.sentences} oraciones</span>
            <span>📏 ~{local.avgWords} palabras/oración</span>
          </div>

          {local.good.length > 0 && (
            <div className="mb-3 space-y-1">
              {local.good.map((g, i) => (
                <p
                  key={i}
                  className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                >
                  ✅ {g}
                </p>
              ))}
            </div>
          )}

          {local.issues.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Sugerencias para mejorar:</p>
              {local.issues.map((iss, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                >
                  {iss.text && (
                    <span className="mr-1 rounded bg-amber-100 px-1 font-mono text-xs dark:bg-amber-900">
                      {iss.text}
                    </span>
                  )}
                  {iss.tip}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No encontré errores comunes. Para seguir mejorando, intenta usar más
              conectores y oraciones más variadas.
            </p>
          )}

          <p className="mt-4 text-xs text-slate-400">
            Esta revisión es automática y orientativa: detecta errores frecuentes,
            pero no todo. Léela como una guía, no como una corrección perfecta.
          </p>
        </div>
      )}

      {/* Reseña con IA estructurada (solo si está configurada) */}
      {review && (
        <div className="card mt-4 animate-slide-up">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">🤖 Reseña con IA</h2>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-100">
              {review.score}/100 · {review.band}
            </span>
          </div>

          <p className="mb-4 text-sm text-slate-700 dark:text-slate-200">
            {review.summary}
          </p>

          {review.corrections.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-sm font-medium">Correcciones:</p>
              {review.corrections.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700"
                >
                  <p>
                    <span className="rounded bg-red-100 px-1 font-mono text-xs text-red-700 line-through dark:bg-red-950 dark:text-red-300">
                      {c.error}
                    </span>{" "}
                    →{" "}
                    <span className="rounded bg-emerald-100 px-1 font-mono text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {c.correction}
                    </span>
                  </p>
                  {c.why && (
                    <p className="mt-1 text-xs text-slate-500">{c.why}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {review.improved && (
            <div>
              <p className="mb-1 text-sm font-medium">✨ Versión mejorada:</p>
              <div className="rounded-lg bg-emerald-50 p-3 text-sm leading-relaxed text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
                {review.improved}
              </div>
            </div>
          )}
        </div>
      )}

      {!enabled && (
        <p className="mt-4 text-center text-xs text-slate-400">
          💡 La revisión automática funciona sin configuración. Si algún día
          activas la IA (ANTHROPIC_API_KEY), recibirás además una corrección más
          detallada.
        </p>
      )}
    </div>
  );
}
