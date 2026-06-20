"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AREA_LABELS, type Area } from "@/lib/itp";
import { SpeechButton } from "./SpeechButton";

interface SrsCard {
  id: string;
  type: string;
  area: string;
  front: string;
  back: string;
  example?: string | null;
}

export function ReviewSession() {
  const router = useRouter();
  const [items, setItems] = useState<SrsCard[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);
  const [hits, setHits] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  useEffect(() => {
    fetch("/api/srs")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]));
  }, []);

  async function answer(correct: boolean) {
    if (!items) return;
    const card = items[idx];
    setDone((d) => d + 1);
    if (correct) setHits((h) => h + 1);
    // Registra en segundo plano; no bloqueamos la UI.
    fetch("/api/srs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: card.id, correct }),
    }).catch(() => {});
    setRevealed(false);
    setTyped("");
    setChecked(false);
    setWasCorrect(false);
    setIdx((i) => i + 1);
  }

  function normalize(s: string): string {
    return s.toLowerCase().replace(/[.,!?;:'"]/g, "").replace(/\s+/g, " ").trim();
  }

  function checkTyped() {
    if (!items) return;
    const card = items[idx];
    // Acepta cualquiera de las opciones separadas por "/".
    const accepted = card.front.split("/").map((p) => normalize(p));
    const ok = accepted.includes(normalize(typed));
    setWasCorrect(ok);
    setChecked(true);
    setRevealed(true);
  }

  if (items === null) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center text-slate-500">
        Cargando repasos...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="card text-center">
          <div className="mb-3 text-5xl">✅</div>
          <h1 className="mb-2 text-xl font-bold">No tienes repasos pendientes</h1>
          <p className="mb-6 text-slate-500">
            ¡Buen trabajo! Vuelve más tarde o sigue con tus lecciones.
          </p>
          <Link href="/dashboard" className="btn-primary">
            Ir al panel
          </Link>
        </div>
      </div>
    );
  }

  const finished = idx >= items.length;

  if (finished) {
    const pct = done > 0 ? Math.round((hits / done) * 100) : 0;
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="card animate-pop-in text-center">
          <div className="mb-3 text-5xl">🧠</div>
          <h1 className="mb-2 text-xl font-bold">Repaso completado</h1>
          <p className="mb-6 text-slate-500">
            Recordaste {hits} de {done} ({pct}%). Los ítems que fallaste volverán
            pronto; los que acertaste, más adelante.
          </p>
          <Link
            href="/dashboard"
            className="btn-primary"
            onClick={() => router.refresh()}
          >
            Volver al panel
          </Link>
        </div>
      </div>
    );
  }

  const card = items[idx];

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
        <span className="text-slate-400">
          {idx + 1} / {items.length}
        </span>
      </div>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${(idx / items.length) * 100}%` }}
        />
      </div>

      <div className="card min-h-[16rem] animate-slide-up">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {AREA_LABELS[card.area as Area] ?? card.area}
          </span>
          <span className="text-xs text-slate-400">
            {card.type === "vocab" ? "Vocabulario" : "Gramática"}
          </span>
        </div>

        {card.type === "vocab" ? (
          /* Modo escribir (Anki): dado el significado, escribe la palabra. */
          <>
            <p className="mb-2 text-sm text-slate-500">Escribe en inglés:</p>
            <p className="text-2xl font-semibold">{card.back}</p>

            {!checked ? (
              <div className="mt-5">
                <input
                  className="input"
                  autoFocus
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && typed.trim()) checkTyped();
                  }}
                  placeholder="Type the English word..."
                />
                <div className="mt-3 flex gap-2">
                  <button className="btn-ghost" onClick={() => answer(false)}>
                    No la sé
                  </button>
                  <button
                    className="btn-primary flex-1"
                    disabled={!typed.trim()}
                    onClick={checkTyped}
                  >
                    Revisar
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 animate-pop-in">
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    wasCorrect
                      ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
                  }`}
                >
                  {wasCorrect ? "¡Correcto! 🎉" : `La respuesta era: ${card.front}`}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-semibold">{card.front}</span>
                  <SpeechButton text={card.front} label="" className="!px-3 !py-1.5" />
                </div>
                {card.example && (
                  <p className="mt-1 text-sm italic text-slate-600 dark:text-slate-300">
                    “{card.example}”
                  </p>
                )}
                <button
                  className="btn-primary mt-4 w-full"
                  onClick={() => answer(wasCorrect)}
                >
                  Continuar →
                </button>
              </div>
            )}
          </>
        ) : (
          /* Modo reconocer (gramática u otros). */
          <>
            <p className="mb-2 text-sm text-slate-500">Recuerda el significado:</p>
            <span className="text-2xl font-semibold">{card.front}</span>
            {!revealed ? (
              <button className="btn-secondary mt-6" onClick={() => setRevealed(true)}>
                Mostrar respuesta
              </button>
            ) : (
              <div className="mt-6 animate-pop-in">
                <p className="text-lg font-medium text-brand-700 dark:text-brand-300">
                  {card.back}
                </p>
                {card.example && (
                  <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-300">
                    “{card.example}”
                  </p>
                )}
                <p className="mt-6 text-sm text-slate-500">¿Lo recordabas?</p>
                <div className="mt-2 flex gap-2">
                  <button className="btn-secondary flex-1" onClick={() => answer(false)}>
                    No 🙁
                  </button>
                  <button className="btn-primary flex-1" onClick={() => answer(true)}>
                    Sí 🙂
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
