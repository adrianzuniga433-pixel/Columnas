"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { placementItems, type PlacementItem } from "@/content/placement";
import { AREA_LABELS, type Area } from "@/lib/itp";
import { SpeechButton } from "./SpeechButton";

interface Outcome {
  placedLevel: number;
  estimatedItpScore: number;
  cefr: string;
  rationale: string;
  correct: number;
  answered: number;
}

export function PlacementTest() {
  const router = useRouter();

  // Items agrupados por bloque de dificultad (1..5).
  const blocks = useMemo(() => {
    const map = new Map<number, PlacementItem[]>();
    for (const it of placementItems) {
      const arr = map.get(it.difficulty) ?? [];
      arr.push(it);
      map.set(it.difficulty, arr);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, items]) => items);
  }, []);

  const [blockIdx, setBlockIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [answers, setAnswers] = useState<{ id: string; choice: number }[]>([]);
  const [blockCorrect, setBlockCorrect] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const currentBlock = blocks[blockIdx];
  const item = currentBlock?.[itemIdx];
  const totalAnswered = answers.length;

  function choose(choice: number) {
    if (picked !== null || !item) return;
    setPicked(choice);
    const correct = choice === item.answerIndex;
    setAnswers((prev) => [...prev, { id: item.id, choice }]);
    if (correct) setBlockCorrect((c) => c + 1);
  }

  async function submit(finalAnswers: { id: string; choice: number }[]) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await res.json();
      if (res.ok) setOutcome(data as Outcome);
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (!currentBlock) return;
    const nextItemIdx = itemIdx + 1;

    if (nextItemIdx < currentBlock.length) {
      setItemIdx(nextItemIdx);
      setPicked(null);
      return;
    }

    // Terminó el bloque. Lógica semi-adaptativa:
    // si acertó menos de la mitad (y no es el primer bloque), detente.
    const ratioBlock = blockCorrect / currentBlock.length;
    const isLastBlock = blockIdx === blocks.length - 1;
    const shouldStop = (blockIdx >= 1 && ratioBlock < 0.5) || isLastBlock;

    if (shouldStop) {
      submit(answers);
      return;
    }

    // Avanza al siguiente bloque (más difícil).
    setBlockIdx(blockIdx + 1);
    setItemIdx(0);
    setBlockCorrect(0);
    setPicked(null);
  }

  if (outcome) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="card animate-pop-in text-center">
          <div className="mb-3 text-5xl">🎯</div>
          <h1 className="mb-2 text-2xl font-bold">¡Listo! Este es tu punto de partida</h1>
          <div className="my-4 inline-flex flex-col items-center rounded-xl bg-brand-50 px-6 py-4 dark:bg-brand-950">
            <span className="text-sm text-slate-500">Empiezas en el</span>
            <span className="text-3xl font-bold text-brand-600">
              Nivel {outcome.placedLevel}
            </span>
            <span className="mt-1 text-sm text-slate-500">
              ≈ {outcome.estimatedItpScore} ITP · {outcome.cefr}
            </span>
          </div>
          <p className="mb-6 text-left text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {outcome.rationale}
          </p>
          <Link
            href="/dashboard"
            className="btn-primary w-full"
            onClick={() => router.refresh()}
          >
            Ir a mi panel
          </Link>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
        <p>Calculando tu nivel...</p>
      </div>
    );
  }

  const answered = picked !== null;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Evaluación diagnóstica</h1>
        <p className="mt-1 text-sm text-slate-500">
          Responde con calma. Se adapta a tu desempeño para ubicarte en el nivel
          correcto.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
        <span>Bloque de dificultad {currentBlock[0].difficulty} / 5</span>
        <span>{totalAnswered} respondidas</span>
      </div>

      <div className="card animate-slide-up">
        <span className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {AREA_LABELS[item.area as Area]}
        </span>

        {item.passage && (
          <div className="mb-3 rounded-lg bg-slate-50 p-3 text-sm leading-relaxed dark:bg-slate-800/60">
            {item.passage}
          </div>
        )}
        {item.script && (
          <div className="mb-3">
            <SpeechButton text={item.script} label="Escuchar audio" />
          </div>
        )}

        <p className="mb-2 font-medium">{item.prompt}</p>
        {item.sentence && (
          <p className="mb-4 text-lg">{item.sentence}</p>
        )}

        <div className="grid gap-2">
          {item.options.map((opt, i) => {
            const isAnswer = i === item.answerIndex;
            const isPicked = i === picked;
            let cls =
              "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900 ";
            if (!answered) {
              cls +=
                "border-slate-300 hover:border-brand-500 hover:bg-brand-50 dark:border-slate-700 dark:hover:bg-slate-800";
            } else if (isAnswer) {
              cls +=
                "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-600";
            } else if (isPicked) {
              cls += "border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-600";
            } else {
              cls += "border-slate-200 opacity-60 dark:border-slate-800";
            }
            return (
              <button
                key={i}
                disabled={answered}
                className={cls}
                onClick={() => choose(i)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <button
            className="btn-primary mt-5 w-full"
            onClick={next}
            disabled={submitting}
          >
            {submitting ? "Calculando..." : "Continuar →"}
          </button>
        )}
      </div>
    </div>
  );
}
