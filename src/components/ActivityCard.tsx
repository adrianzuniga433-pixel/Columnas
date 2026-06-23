"use client";

import { useMemo, useState, useEffect, useRef } from "react";
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
  DialogueActivity,
  PronunciationActivity,
  ReadingQuestion,
} from "@/content/types";
import { SpeechButton } from "./SpeechButton";
import { ConversationAudio } from "./ConversationAudio";

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
          <McqExtraFeedback a={a} picked={picked!} />
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

// Retroalimentación adicional para MCQ: oración correcta + traducción,
// por qué la elección fue incorrecta, y explicación del tema.
function McqExtraFeedback({ a, picked }: { a: Mcq; picked: number }) {
  const wasWrong = picked !== a.answerIndex;
  const correctSentence = a.sentence
    ? a.sentence.replace("___", a.options[a.answerIndex])
    : a.options[a.answerIndex];
  return (
    <div className="mt-3 space-y-2 text-sm">
      <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
        <p className="font-medium">✅ Respuesta correcta: “{a.options[a.answerIndex]}”</p>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          {correctSentence}
          {a.translationEs ? (
            <span className="text-slate-500"> — {a.translationEs}</span>
          ) : null}
        </p>
      </div>
      {wasWrong && (
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          ✗ Tu respuesta “{a.options[picked]}” no es correcta aquí. {a.explanation}
        </div>
      )}
      {a.topicTitle && (
        <div className="rounded-lg bg-brand-50 px-3 py-2 text-brand-900 dark:bg-brand-950 dark:text-brand-100">
          <span className="font-semibold">📚 {a.topicTitle}.</span>{" "}
          {a.topicWhy}
        </div>
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
  const isConversation = !!a.turns && a.turns.length > 0;
  return (
    <div>
      <p className="mb-2 text-sm text-slate-500">
        Listening{isConversation ? " · conversación" : ""}
      </p>
      {a.scriptLabel && (
        <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
          {a.scriptLabel}
        </p>
      )}
      {isConversation ? (
        <ConversationAudio turns={a.turns!} />
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <SpeechButton text={a.script} label="Escuchar audio" />
          <SpeechButton text={a.script} label="🐢 Lento" rate={0.6} />
          <button
            className="btn-ghost"
            onClick={() => setShowScript((s) => !s)}
          >
            {showScript ? "Ocultar texto" : "Ver texto"}
          </button>
        </div>
      )}
      {!isConversation && showScript && (
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
      <div className="flex flex-wrap gap-2">
        <SpeechButton text={a.text} label="Escuchar" />
        <SpeechButton text={a.text} label="🐢 Lento" rate={0.55} />
      </div>
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

function DialogueView({
  a,
  onDone,
}: {
  a: DialogueActivity;
  onDone: (r: ActivityResult) => void;
}) {
  const [showEs, setShowEs] = useState(true);

  function playAll() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    for (const line of a.lines) {
      const u = new SpeechSynthesisUtterance(line.en);
      u.lang = "en-US";
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  }

  return (
    <div>
      <p className="mb-1 text-sm text-slate-500">💬 Conversación</p>
      <h3 className="text-lg font-semibold">{a.title}</h3>
      <p className="mb-3 text-sm text-slate-500">{a.situation}</p>
      <div className="mb-3 flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={playAll}>
          ▶ Escuchar diálogo
        </button>
        <button className="btn-ghost" onClick={() => setShowEs((s) => !s)}>
          {showEs ? "Ocultar traducción" : "Mostrar traducción"}
        </button>
      </div>
      <div className="space-y-2">
        {a.lines.map((line, i) => {
          const isYou = line.speaker === "A";
          return (
            <div key={i} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                  isYou ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wide opacity-70">
                  {line.who}
                </p>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium">{line.en}</p>
                  <SpeechButton text={line.en} label="" className="!px-1.5 !py-0.5 !text-current" />
                </div>
                {showEs && (
                  <p className={`mt-0.5 text-xs ${isYou ? "text-brand-100" : "text-slate-500"}`}>
                    {line.es}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Practica diciendo en voz alta las líneas de “Tú”.
      </p>
      <ContinueButton onClick={() => onDone({ correct: 0, total: 0 })} />
    </div>
  );
}

function normalizeWords(s: string): string {
  return s.toLowerCase().replace(/[.,!?;:'"]/g, "").replace(/\s+/g, " ").trim();
}

function PronunciationView({
  a,
  onDone,
}: {
  a: PronunciationActivity;
  onDone: (r: ActivityResult) => void;
}) {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const recRef = useRef<any>(null);

  useEffect(() => {
    const SR =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript as string;
      setHeard(transcript);
      const t = normalizeWords(a.text).split(" ");
      const said = new Set(normalizeWords(transcript).split(" "));
      const matched = t.filter((w) => said.has(w)).length;
      setScore(Math.round((matched / Math.max(1, t.length)) * 100));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
  }, [a.text]);

  function start() {
    if (!recRef.current) return;
    setHeard(null);
    setScore(null);
    try {
      setListening(true);
      recRef.current.start();
    } catch {
      setListening(false);
    }
  }

  return (
    <div>
      <p className="mb-1 text-sm text-slate-500">🎤 Pronunciación</p>
      <p className="mb-1 text-lg font-medium">{a.text}</p>
      <p className="mb-3 text-sm text-slate-400">{a.es}</p>
      {!supported && (
        <div className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          Tu navegador no permite el micrófono para esto (usa Chrome). Aún puedes
          escuchar la frase y repetirla en voz alta.
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <SpeechButton text={a.text} label="🔊 Escuchar" />
        <button className="btn-primary" onClick={start} disabled={!supported || listening}>
          {listening ? "🎙️ Escuchando..." : "🎤 Hablar"}
        </button>
      </div>
      {heard && score !== null && (
        <div
          className={`mt-3 animate-pop-in rounded-lg px-3 py-2 text-sm ${
            score >= 80
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              : score >= 50
                ? "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          Escuché: “{heard}” — coincidencia {score}%.
          {score < 80 ? " Escucha de nuevo e intenta otra vez." : " ¡Muy bien! 🎉"}
        </div>
      )}
      <ContinueButton onClick={() => onDone({ correct: 0, total: 0 })} />
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
    case "dialogue":
      return <DialogueView a={activity} onDone={onDone} />;
    case "pronunciation":
      return <PronunciationView a={activity} onDone={onDone} />;
    default:
      return null;
  }
}
