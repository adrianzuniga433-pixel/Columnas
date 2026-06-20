"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SpeechButton } from "./SpeechButton";

export interface DictWord {
  front: string;
  back: string;
  example: string | null;
}

export function Dictionary({ words }: { words: DictWord[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.toLowerCase().trim();
    if (!term) return words;
    return words.filter(
      (w) =>
        w.front.toLowerCase().includes(term) ||
        w.back.toLowerCase().includes(term)
    );
  }, [q, words]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
        ← Volver al panel
      </Link>
      <h1 className="text-2xl font-bold">📒 Mi diccionario</h1>
      <p className="mb-4 text-sm text-slate-500">
        Todas las palabras que has aprendido ({words.length}). Búscalas y repásalas
        cuando quieras.
      </p>

      <input
        className="input mb-4"
        placeholder="Buscar palabra o significado..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {words.length === 0 ? (
        <div className="card text-center text-slate-500">
          Aún no tienes palabras. Completa sesiones diarias y se irán agregando aquí.
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-sm text-slate-400">
          No encontré “{q}”.
        </p>
      ) : (
        <div className="grid gap-2">
          {filtered.map((w, i) => (
            <div key={i} className="card !p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{w.front}</p>
                  <p className="text-sm text-slate-500">{w.back}</p>
                </div>
                <SpeechButton text={w.front} label="" className="!px-3 !py-1.5" />
              </div>
              {w.example && (
                <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-300">
                  “{w.example}”
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
