"use client";

import { useMemo, useState } from "react";
import type {
  Activity,
  Flashcard,
  Mcq,
  ErrorId,
  Reading,
  Listening,
  OrderWords,
  Matching,
  Dictation,
  ReadingQuestion,
} from "@/content/types";
import { SpeechButton } from "./SpeechButton";

export interface ActivityResult {
  correct: number;
  total: number;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Feedback({ correct, text }: { correct: boolean; text: string }) {
  return (
    <div
      className={`mt-3 animate-pop-in rounded-lg px-3 py-2 text-sm ${
        correct
          ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
      }`}
    >
      <span className="font-semibold">{correct ? "¡Correcto! " : "Aún no. "}</span>
      {text}
    </div>
  );
}

function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="btn-primary mt-4" onClick={onClick}>
      Continuar →
    </button>
  );
}

// ---- Sub-renderers ----

function FlashcardView({
  a,
  onDone,
}: {
  a: Flashcard;
  onDone: (r: ActivityResult) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <p className="mb-2 text-sm text-slate-500">Vocabulario</p>
      <div className="flex items-center gap-3">
        <div className="text-2xl font-semibold">{a.word}</div>
        <SpeechButton text={a.word} label="" className="!px-3 !py-1.5" />
      </div>
      {!revealed ? (
        <button className="btn-secondary mt-4" onClick={() => setRevealed(true)}>
          Mostrar significado
        </button>
      ) : (
        <div className="mt-4 animate-pop-in">
          <p className="text-lg">
            <span className="font-medium">{a.meaning}</span>
          </p>
          <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-300">
            “{a.example}”{a.exampleEs ? ` — ${a.exampleEs}` : ""}
          </p>
          <p className="mt-4 text-sm text-slate-500">¿La recordabas?</p>
          <div className="mt-2 flex gap-2">
            <button
              className="btn-secondary"
              onClick={() => onDone({ correct: 0, total: 1 })}
            >
              Repasar más
            </button>
            <button
              className="btn-primary"
              onClick={() => onDone({ correct: 1, total: 1 })}
            >
              La sabía
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function McqView({ a, onDone }: { a: Mcq; onDone: (r: ActivityResult) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">{a.prompt}</p>
      {a.sentence && (
        <p className="mb-4 text-lg font-medium">{a.sentence}</p>
      )}
      <div className="grid gap-2">
        {a.options.map((opt, i) => {
          const isAnswer = i === a.answerIndex;
          const isPicked = i === picked;
          let cls =
            "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ";
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
              onClick={() => setPicked(i)}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <>
          <Feedback correct={picked === a.answerIndex} text={a.explanation} />
          <ContinueButton
            onClick={() =>
              onDone({ correct: picked === a.answerIndex ? 1 : 0, total: 1 })
            }
          />
        </>
      )}
    </div>
  );
}

function ErrorIdView({
  a,
  onDone,
}: {
  a: ErrorId;
  onDone: (r: ActivityResult) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const labeled = a.segments.filter((s) => s.label);
  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">{a.prompt}</p>
      <p className="mb-4 text-lg leading-relaxed">
        {a.segments.map((seg, i) =>
          seg.label ? (
            <button
              key={i}
              disabled={answered}
              onClick={() => setPicked(seg.label!)}
              className={`mx-0.5 rounded border-b-2 px-1 ${
                !answered
                  ? "border-dashed border-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800"
                  : seg.label === a.answerLabel
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                    : seg.label === picked
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : "border-slate-300"
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
      <p className="text-xs text-slate-400">
        Toca la parte subrayada ({labeled.map((s) => s.label).join(", ")}) que es
        incorrecta.
      </p>
      {answered && (
        <>
          <Feedback correct={picked === a.answerLabel} text={a.explanation} />
          <ContinueButton
            onClick={() =>
              onDone({ correct: picked === a.answerLabel ? 1 : 0, total: 1 })
            }
          />
        </>
      )}
    </div>
  );
}

function QuestionList({
  questions,
  onAllAnswered,
}: {
  questions: ReadingQuestion[];
  onAllAnswered: (correct: number) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    questions.map(() => null)
  );
  const allAnswered = answers.every((x) => x !== null);

  function pick(qi: number, oi: number) {
    setAnswers((prev) => {
      if (prev[qi] !== null) return prev;
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  }

  return (
    <div className="mt-4 space-y-5">
      {questions.map((q, qi) => {
        const picked = answers[qi];
        const answered = picked !== null;
        return (
          <div key={qi}>
            <p className="mb-2 font-medium">{q.prompt}</p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const isAnswer = oi === q.answerIndex;
                const isPicked = oi === picked;
                let cls =
                  "w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ";
                if (!answered) {
                  cls +=
                    "border-slate-300 hover:border-brand-500 hover:bg-brand-50 dark:border-slate-700 dark:hover:bg-slate-800";
                } else if (isAnswer) {
                  cls +=
                    "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-600";
                } else if (isPicked) {
                  cls +=
                    "border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-600";
                } else {
                  cls += "border-slate-200 opacity-60 dark:border-slate-800";
                }
                return (
                  <button
                    key={oi}
                    disabled={answered}
                    className={cls}
                    onClick={() => pick(qi, oi)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && <Feedback correct={picked === q.answerIndex} text={q.explanation} />}
          </div>
        );
      })}
      {allAnswered && (
        <ContinueButton
          onClick={() =>
            onAllAnswered(
              answers.reduce<number>(
                (acc, ans, i) => acc + (ans === questions[i].answerIndex ? 1 : 0),
                0
              )
            )
          }
        />
      )}
    </div>
  );
}

function ReadingView({
  a,
  onDone,
}: {
  a: Reading;
  onDone: (r: ActivityResult) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-slate-500">Lectura</p>
      <h3 className="mb-2 text-lg font-semibold">{a.title}</h3>
      <div className="rounded-lg bg-slate-50 p-4 text-[15px] leading-relaxed dark:bg-slate-800/60">
        {a.passage}
      </div>
      <QuestionList
        questions={a.questions}
        onAllAnswered={(correct) =>
          onDone({ correct, total: a.questions.length })
        }
      />
    </div>
  );
}

function ListeningView({
  a,
  onDone,
}: {
  a: Listening;
  onDone: (r: ActivityResult) => void;
}) {
  const [showScript, setShowScript] = useState(false);
  return (
    <div>
      <p className="mb-2 text-sm text-slate-500">Listening</p>
      {a.scriptLabel && (
        <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
          {a.scriptLabel}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <SpeechButton text={a.script} label="Escuchar audio" />
        <button
          className="btn-ghost"
          onClick={() => setShowScript((s) => !s)}
        >
          {showScript ? "Ocultar texto" : "Ver texto"}
        </button>
      </div>
      {showScript && (
        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm italic dark:bg-slate-800/60">
          {a.script}
        </div>
      )}
      <QuestionList
        questions={a.questions}
        onAllAnswered={(correct) =>
          onDone({ correct, total: a.questions.length })
        }
      />
    </div>
  );
}

function OrderWordsView({
  a,
  onDone,
}: {
  a: OrderWords;
  onDone: (r: ActivityResult) => void;
}) {
  const shuffled = useMemo(
    () => shuffle(a.words.map((w, i) => ({ w, i })), a.words.length * 7 + 3),
    [a.words]
  );
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const available = shuffled.filter((x) => !chosen.includes(x.i));
  const sentence = chosen.map((i) => a.words[i]).join(" ");
  const correct = normalize(sentence) === normalize(a.correct);

  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">{a.prompt}</p>
      <p className="mb-3 text-sm text-slate-400">{a.translationEs}</p>
      <div className="mb-3 min-h-[3rem] rounded-lg border border-dashed border-slate-300 p-3 dark:border-slate-700">
        {chosen.length === 0 ? (
          <span className="text-sm text-slate-400">
            Toca las palabras en orden...
          </span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {chosen.map((i, idx) => (
              <button
                key={idx}
                disabled={checked}
                onClick={() =>
                  setChosen((prev) => prev.filter((_, k) => k !== idx))
                }
                className="rounded-md bg-brand-100 px-2.5 py-1 text-sm text-brand-800 dark:bg-brand-900 dark:text-brand-100"
              >
                {a.words[i]}
              </button>
            ))}
          </div>
        )}
      </div>
      {!checked && (
        <div className="flex flex-wrap gap-2">
          {available.map((x) => (
            <button
              key={x.i}
              onClick={() => setChosen((prev) => [...prev, x.i])}
              className="rounded-md border border-slate-300 px-2.5 py-1 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {x.w}
            </button>
          ))}
        </div>
      )}
      {!checked ? (
        <button
          className="btn-primary mt-4"
          disabled={chosen.length !== a.words.length}
          onClick={() => setChecked(true)}
        >
          Revisar
        </button>
      ) : (
        <>
          <Feedback
            correct={correct}
            text={correct ? "" : `Orden correcto: “${a.correct}”.`}
          />
          <ContinueButton
            onClick={() => onDone({ correct: correct ? 1 : 0, total: 1 })}
          />
        </>
      )}
    </div>
  );
}

function MatchingView({
  a,
  onDone,
}: {
  a: Matching;
  onDone: (r: ActivityResult) => void;
}) {
  const rights = useMemo(
    () => shuffle(a.pairs.map((p) => p.right), a.pairs.length * 13 + 1),
    [a.pairs]
  );
  const [sel, setSel] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const correctCount = a.pairs.reduce(
    (acc, p, i) => acc + (sel[i] === p.right ? 1 : 0),
    0
  );
  const allSelected = a.pairs.every((_, i) => sel[i] !== undefined);

  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">{a.prompt}</p>
      <div className="space-y-2">
        {a.pairs.map((p, i) => {
          const ok = sel[i] === p.right;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="w-32 font-medium">{p.left}</span>
              <select
                disabled={checked}
                value={sel[i] ?? ""}
                onChange={(e) =>
                  setSel((prev) => ({ ...prev, [i]: e.target.value }))
                }
                className={`input max-w-xs ${
                  checked
                    ? ok
                      ? "!border-emerald-500"
                      : "!border-red-500"
                    : ""
                }`}
              >
                <option value="" disabled>
                  Elige...
                </option>
                {rights.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      {!checked ? (
        <button
          className="btn-primary mt-4"
          disabled={!allSelected}
          onClick={() => setChecked(true)}
        >
          Revisar
        </button>
      ) : (
        <>
          <Feedback
            correct={correctCount === a.pairs.length}
            text={`Acertaste ${correctCount} de ${a.pairs.length}.`}
          />
          <ContinueButton
            onClick={() => onDone({ correct: correctCount, total: a.pairs.length })}
          />
        </>
      )}
    </div>
  );
}

function DictationView({
  a,
  onDone,
}: {
  a: Dictation;
  onDone: (r: ActivityResult) => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const correct =
    a.accepted.some((acc) => normalize(acc) === normalize(value)) ||
    normalize(a.text) === normalize(value);
  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">{a.prompt}</p>
      <SpeechButton text={a.text} label="Escuchar" />
      <textarea
        className="input mt-3 min-h-[80px]"
        value={value}
        disabled={checked}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe lo que escuchaste..."
      />
      {!checked ? (
        <button
          className="btn-primary mt-4"
          disabled={value.trim().length === 0}
          onClick={() => setChecked(true)}
        >
          Revisar
        </button>
      ) : (
        <>
          <Feedback correct={correct} text={`Texto correcto: “${a.text}”.`} />
          <ContinueButton
            onClick={() => onDone({ correct: correct ? 1 : 0, total: 1 })}
          />
        </>
      )}
    </div>
  );
}

export function ActivityCard({
  activity,
  onDone,
}: {
  activity: Activity;
  onDone: (r: ActivityResult) => void;
}) {
  switch (activity.kind) {
    case "flashcard":
      return <FlashcardView a={activity} onDone={onDone} />;
    case "mcq":
      return <McqView a={activity} onDone={onDone} />;
    case "error-id":
      return <ErrorIdView a={activity} onDone={onDone} />;
    case "reading":
      return <ReadingView a={activity} onDone={onDone} />;
    case "listening":
      return <ListeningView a={activity} onDone={onDone} />;
    case "order-words":
      return <OrderWordsView a={activity} onDone={onDone} />;
    case "matching":
      return <MatchingView a={activity} onDone={onDone} />;
    case "dictation":
      return <DictationView a={activity} onDone={onDone} />;
    default:
      return null;
  }
}
