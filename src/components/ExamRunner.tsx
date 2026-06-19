"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AREA_LABELS, type Area } from "@/lib/itp";
import { SpeechButton } from "./SpeechButton";

// Versiones sin la clave de respuesta (la calificación es en el servidor).
type SanitizedQuestion = { prompt: string; options: string[] };
type SanitizedItem =
  | { area: Area; kind: "mcq"; prompt: string; sentence?: string; options: string[] }
  | {
      area: Area;
      kind: "error-id";
      prompt: string;
      segments: { text: string; label?: string }[];
    }
  | {
      area: Area;
      kind: "reading";
      title: string;
      passage: string;
      questions: SanitizedQuestion[];
    }
  | {
      area: Area;
      kind: "listening";
      scriptLabel?: string;
      script: string;
      questions: SanitizedQuestion[];
    };

interface Answer {
  choice?: number;
  label?: string;
  choices?: number[];
}

interface ExamResult {
  passed: boolean;
  score: number;
  correct: number;
  total: number;
  threshold: number;
  sectionBreakdown: Record<string, number>;
  unlockedNext: boolean;
}

export function ExamRunner({
  level,
  title,
  items,
}: {
  level: number;
  title: string;
  items: SanitizedItem[];
}) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(items.map(() => ({})));
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  const item = items[idx];
  const last = idx === items.length - 1;

  function setAnswer(a: Answer) {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = a;
      return next;
    });
  }

  function isAnswered(a: Answer, it: SanitizedItem): boolean {
    if (it.kind === "mcq") return a.choice !== undefined;
    if (it.kind === "error-id") return a.label !== undefined;
    return (
      !!a.choices &&
      a.choices.length === it.questions.length &&
      a.choices.every((c) => c !== undefined && c !== null)
    );
  }

  async function submit() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/exam/${level}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data as ExamResult);
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <div className="card animate-pop-in text-center">
          <div className="mb-3 text-5xl">{result.passed ? "🏆" : "📚"}</div>
          <h1 className="mb-1 text-2xl font-bold">
            {result.passed ? "¡Aprobado!" : "Sigue practicando"}
          </h1>
          <p className="mb-4 text-slate-500">
            Puntaje: {result.score}% ({result.correct}/{result.total}) · umbral{" "}
            {result.threshold}%
          </p>

          <div className="mb-6 space-y-2 text-left">
            {Object.entries(result.sectionBreakdown).map(([area, pct]) => (
              <div key={area}>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{AREA_LABELS[area as Area] ?? area}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {result.passed ? (
            <p className="mb-6 text-sm text-emerald-600 dark:text-emerald-400">
              {result.unlockedNext
                ? "🔓 Has desbloqueado el siguiente nivel."
                : "Has completado el último nivel. ¡Felicidades!"}
            </p>
          ) : (
            <p className="mb-6 text-sm text-amber-600 dark:text-amber-400">
              No alcanzaste el umbral. Repasamos los ítems del nivel (ya están en
              tu cola de repaso) y puedes reintentar cuando quieras.
            </p>
          )}

          <Link href="/dashboard" className="btn-primary w-full">
            Volver al panel
          </Link>
        </div>
      </div>
    );
  }

  const answered = isAnswered(answers[idx], item);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
        <span className="text-slate-400">
          {idx + 1} / {items.length}
        </span>
      </div>

      <h1 className="mb-1 text-xl font-bold">{title}</h1>
      <p className="mb-4 text-sm text-slate-500">
        Examen de nivel · responde todas las preguntas y entrega al final.
      </p>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${((idx + 1) / items.length) * 100}%` }}
        />
      </div>

      <div className="card animate-slide-up" key={idx}>
        <span className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {AREA_LABELS[item.area]}
        </span>

        {item.kind === "mcq" && (
          <McqExam
            item={item}
            answer={answers[idx]}
            onChange={(choice) => setAnswer({ choice })}
          />
        )}
        {item.kind === "error-id" && (
          <ErrorIdExam
            item={item}
            answer={answers[idx]}
            onChange={(label) => setAnswer({ label })}
          />
        )}
        {(item.kind === "reading" || item.kind === "listening") && (
          <MultiQExam
            item={item}
            answer={answers[idx]}
            onChange={(choices) => setAnswer({ choices })}
          />
        )}

        <div className="mt-6 flex justify-between">
          <button
            className="btn-secondary"
            disabled={idx === 0}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            ← Anterior
          </button>
          {!last ? (
            <button
              className="btn-primary"
              disabled={!answered}
              onClick={() => setIdx((i) => i + 1)}
            >
              Siguiente →
            </button>
          ) : (
            <button
              className="btn-primary"
              disabled={!answered || submitting}
              onClick={submit}
            >
              {submitting ? "Calificando..." : "Entregar examen"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function optionButton(selected: boolean) {
  return `w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
    selected
      ? "border-brand-500 bg-brand-50 dark:bg-brand-950 dark:border-brand-500"
      : "border-slate-300 hover:border-brand-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
  }`;
}

function McqExam({
  item,
  answer,
  onChange,
}: {
  item: Extract<SanitizedItem, { kind: "mcq" }>;
  answer: Answer;
  onChange: (choice: number) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-medium">{item.prompt}</p>
      {item.sentence && <p className="mb-4 text-lg">{item.sentence}</p>}
      <div className="grid gap-2">
        {item.options.map((opt, i) => (
          <button
            key={i}
            className={optionButton(answer.choice === i)}
            onClick={() => onChange(i)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ErrorIdExam({
  item,
  answer,
  onChange,
}: {
  item: Extract<SanitizedItem, { kind: "error-id" }>;
  answer: Answer;
  onChange: (label: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 font-medium">{item.prompt}</p>
      <p className="text-lg leading-relaxed">
        {item.segments.map((seg, i) =>
          seg.label ? (
            <button
              key={i}
              onClick={() => onChange(seg.label!)}
              className={`mx-0.5 rounded border-b-2 px-1 ${
                answer.label === seg.label
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950"
                  : "border-dashed border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {seg.text}
              <sub className="ml-0.5 text-xs font-bold text-brand-600">
                {seg.label}
              </sub>
            </button>
          ) : (
            <span key={i}> {seg.text} </span>
          )
        )}
      </p>
      <p className="mt-2 text-xs text-slate-400">
        Toca la parte subrayada que contiene el error.
      </p>
    </div>
  );
}

function MultiQExam({
  item,
  answer,
  onChange,
}: {
  item: Extract<SanitizedItem, { kind: "reading" | "listening" }>;
  answer: Answer;
  onChange: (choices: number[]) => void;
}) {
  const choices = answer.choices ?? item.questions.map(() => -1);

  function pick(qi: number, oi: number) {
    const next = [...choices];
    while (next.length < item.questions.length) next.push(-1);
    next[qi] = oi;
    onChange(next);
  }

  return (
    <div>
      {item.kind === "reading" ? (
        <>
          <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
          <div className="mb-4 rounded-lg bg-slate-50 p-4 text-[15px] leading-relaxed dark:bg-slate-800/60">
            {item.passage}
          </div>
        </>
      ) : (
        <div className="mb-4">
          {item.scriptLabel && (
            <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
              {item.scriptLabel}
            </p>
          )}
          <SpeechButton text={item.script} label="Escuchar audio" />
        </div>
      )}

      <div className="space-y-5">
        {item.questions.map((q, qi) => (
          <div key={qi}>
            <p className="mb-2 font-medium">{q.prompt}</p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  className={optionButton(choices[qi] === oi)}
                  onClick={() => pick(qi, oi)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
