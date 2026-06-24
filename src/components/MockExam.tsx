"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_SECTION_LABELS, type MockSection } from "@/lib/itp";
import type { SanitizedMockItem } from "@/lib/mock";
import { SpeechButton } from "./SpeechButton";

interface Answer {
  choice?: number;
  label?: string;
  choices?: number[];
}

interface SectionResult {
  section: MockSection;
  label: string;
  correct: number;
  total: number;
  pct: number;
  scaled: number;
}

interface MockResult {
  totalScore: number;
  cefr: string;
  correct: number;
  total: number;
  sections: SectionResult[];
  previousEstimate: number;
  updatedEstimate: number;
  improved: boolean;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function MockExam({
  items,
  totalQuestions,
  durationSeconds,
}: {
  items: SanitizedMockItem[];
  totalQuestions: number;
  durationSeconds: number;
}) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(items.map(() => ({})));
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<MockResult | null>(null);
  const [remaining, setRemaining] = useState(durationSeconds);

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const submit = useCallback(async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answersRef.current }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data as MockResult);
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }, [router]);

  // Temporizador global; al llegar a 0 entrega automáticamente.
  useEffect(() => {
    if (!started || result) return;
    if (remaining <= 0) {
      submit();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [started, result, remaining, submit]);

  function setAnswer(a: Answer) {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = a;
      return next;
    });
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <div className="card">
          <div className="mb-3 text-center text-5xl">🎯</div>
          <h1 className="mb-2 text-center text-2xl font-bold">Simulacro completo</h1>
          <p className="mb-4 text-center text-sm text-slate-500">
            Reproduce el examen TOEFL ITP: tres secciones seguidas con
            temporizador. Al final obtienes un puntaje escalado (310–677), como
            en el examen real.
          </p>
          <ul className="mb-6 space-y-2 text-sm">
            <li className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
              <span>Section 1 — Listening</span>
              <span className="text-slate-400">audio + preguntas</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
              <span>Section 2 — Structure</span>
              <span className="text-slate-400">gramática y error</span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
              <span>Section 3 — Reading</span>
              <span className="text-slate-400">lecturas</span>
            </li>
            <li className="flex justify-between pt-1 font-medium">
              <span>⏱️ Tiempo total</span>
              <span>{fmtTime(durationSeconds)} · {totalQuestions} preguntas</span>
            </li>
          </ul>
          <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
            Una vez que empieces, el reloj corre sin pausa. Cuando se agote el
            tiempo, el examen se entrega solo. ¡Busca un lugar tranquilo!
          </p>
          <button className="btn-primary w-full" onClick={() => setStarted(true)}>
            Empezar simulacro
          </button>
          <Link href="/toefl" className="btn-ghost mt-2 w-full">
            Ahora no
          </Link>
        </div>
      </div>
    );
  }

  if (result) {
    const reached = result.totalScore >= 400;
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <div className="card animate-pop-in text-center">
          <div className="mb-2 text-5xl">{reached ? "🎉" : "📚"}</div>
          <p className="text-sm text-slate-500">Tu puntaje ITP del simulacro</p>
          <p className="my-1 text-6xl font-bold text-brand-600">{result.totalScore}</p>
          <p className="mb-1 text-sm text-slate-400">Nivel MCER: {result.cefr}</p>
          <p className="mb-5 text-sm">
            {result.correct}/{result.total} respuestas correctas
          </p>

          <div className="mb-5 space-y-3 text-left">
            {result.sections.map((s) => (
              <div key={s.section}>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{MOCK_SECTION_LABELS[s.section]}</span>
                  <span>
                    {s.correct}/{s.total} · subpuntaje {s.scaled}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <p
            className={`mb-5 rounded-lg px-3 py-2 text-sm ${
              reached
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
            }`}
          >
            {reached
              ? "🎯 ¡Superaste la meta de 400! Vas muy bien para el examen real."
              : `Te faltan ${400 - result.totalScore} puntos para la meta de 400. Tu sección más débil es ${
                  result.sections.reduce((a, b) => (b.scaled < a.scaled ? b : a)).label
                }.`}
          </p>

          {result.improved && (
            <p className="mb-5 text-sm text-emerald-600 dark:text-emerald-400">
              📈 Nuevo récord: tu puntaje estimado subió de {result.previousEstimate} a{" "}
              {result.updatedEstimate}.
            </p>
          )}

          <Link href="/toefl" className="btn-primary w-full">
            Volver al modo TOEFL
          </Link>
        </div>
      </div>
    );
  }

  const item = items[idx];
  const last = idx === items.length - 1;
  const lowTime = remaining <= 60;
  const sectionStart = idx === 0 || items[idx - 1].section !== item.section;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-slate-400">
          {idx + 1} / {items.length}
        </span>
        <span
          className={`rounded-full px-3 py-1 font-mono font-semibold tabular-nums ${
            lowTime
              ? "animate-pulse bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          ⏱️ {fmtTime(remaining)}
        </span>
      </div>

      {sectionStart && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
          {MOCK_SECTION_LABELS[item.section]}
        </p>
      )}

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${((idx + 1) / items.length) * 100}%` }}
        />
      </div>

      <div className="card animate-slide-up" key={idx}>
        {item.kind === "mcq" && (
          <McqQ item={item} answer={answers[idx]} onChange={(choice) => setAnswer({ choice })} />
        )}
        {item.kind === "error-id" && (
          <ErrorIdQ item={item} answer={answers[idx]} onChange={(label) => setAnswer({ label })} />
        )}
        {(item.kind === "reading" || item.kind === "listening") && (
          <MultiQ item={item} answer={answers[idx]} onChange={(choices) => setAnswer({ choices })} />
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
            <button className="btn-primary" onClick={() => setIdx((i) => i + 1)}>
              Siguiente →
            </button>
          ) : (
            <button className="btn-primary" disabled={submitting} onClick={submit}>
              {submitting ? "Calificando..." : "Entregar examen"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Puedes navegar entre preguntas; al final se califica todo junto.
      </p>
    </div>
  );
}

function optionButton(selected: boolean) {
  return `w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900 ${
    selected
      ? "border-brand-500 bg-brand-50 dark:bg-brand-950 dark:border-brand-500"
      : "border-slate-300 hover:border-brand-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
  }`;
}

function McqQ({
  item,
  answer,
  onChange,
}: {
  item: Extract<SanitizedMockItem, { kind: "mcq" }>;
  answer: Answer;
  onChange: (choice: number) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-medium">{item.prompt}</p>
      {item.sentence && <p className="mb-4 text-lg">{item.sentence}</p>}
      <div className="grid gap-2">
        {item.options.map((opt, i) => (
          <button key={i} className={optionButton(answer.choice === i)} onClick={() => onChange(i)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ErrorIdQ({
  item,
  answer,
  onChange,
}: {
  item: Extract<SanitizedMockItem, { kind: "error-id" }>;
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
              <sub className="ml-0.5 text-xs font-bold text-brand-600">{seg.label}</sub>
            </button>
          ) : (
            <span key={i}> {seg.text} </span>
          )
        )}
      </p>
      <p className="mt-2 text-xs text-slate-400">Toca la parte subrayada que contiene el error.</p>
    </div>
  );
}

function MultiQ({
  item,
  answer,
  onChange,
}: {
  item: Extract<SanitizedMockItem, { kind: "reading" | "listening" }>;
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
            <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">{item.scriptLabel}</p>
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
                <button key={oi} className={optionButton(choices[qi] === oi)} onClick={() => pick(qi, oi)}>
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
