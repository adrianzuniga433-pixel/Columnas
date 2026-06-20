"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SpeechButton } from "./SpeechButton";

const SENTENCES = [
  "Nice to meet you. My name is Carlos.",
  "I usually wake up early in the morning.",
  "She is going to visit her family next week.",
  "Could I have a coffee with milk, please?",
  "How much does this jacket cost?",
  "I have never been to the United States.",
  "We watched a great movie last night.",
  "You should drink more water every day.",
  "If it rains tomorrow, we will stay home.",
  "My favorite hobby is reading in my free time.",
  "Excuse me, where is the train station?",
  "I look forward to hearing from you.",
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreMatch(target: string, said: string): number {
  const t = normalize(target).split(" ");
  const s = new Set(normalize(said).split(" "));
  if (t.length === 0) return 0;
  const matched = t.filter((w) => s.has(w)).length;
  return Math.round((matched / t.length) * 100);
}

export function PronunciationPractice() {
  const [supported, setSupported] = useState(true);
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);

  const target = SENTENCES[index];

  useEffect(() => {
    const SR =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition)) ||
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
      setScore(scoreMatch(target, transcript));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function start() {
    if (!recognitionRef.current) return;
    setHeard(null);
    setScore(null);
    try {
      setListening(true);
      recognitionRef.current.start();
    } catch {
      setListening(false);
    }
  }

  function next() {
    setHeard(null);
    setScore(null);
    setIndex((i) => (i + 1) % SENTENCES.length);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
        ← Volver
      </Link>
      <h1 className="mb-1 text-2xl font-bold">🎤 Práctica de pronunciación</h1>
      <p className="mb-6 text-sm text-slate-500">
        Escucha la frase, luego di lo mismo en voz alta. La app escucha tu
        micrófono y te dice qué tan bien lo dijiste.
      </p>

      {!supported && (
        <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          Tu navegador no permite el reconocimiento de voz. Para esta práctica usa
          <strong> Chrome </strong> en computadora o Android. (En iPhone, ábrela en
          Chrome.) Aún puedes escuchar la frase y repetirla en voz alta.
        </div>
      )}

      <div className="card">
        <p className="mb-2 text-sm text-slate-500">Frase {index + 1} de {SENTENCES.length}</p>
        <p className="mb-3 text-xl font-medium">{target}</p>
        <div className="flex flex-wrap items-center gap-2">
          <SpeechButton text={target} label="🔊 Escuchar" />
          <button
            className="btn-primary"
            onClick={start}
            disabled={!supported || listening}
          >
            {listening ? "🎙️ Escuchando..." : "🎤 Hablar"}
          </button>
          <button className="btn-ghost" onClick={next}>
            Siguiente →
          </button>
        </div>

        {heard && (
          <div className="mt-4 animate-pop-in space-y-2 text-sm">
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
              <span className="text-slate-500">Escuché: </span>
              <span className="font-medium">“{heard}”</span>
            </div>
            {score !== null && (
              <div
                className={`rounded-lg px-3 py-2 ${
                  score >= 80
                    ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : score >= 50
                      ? "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
                }`}
              >
                {score >= 80
                  ? `¡Muy bien! Coincidencia ${score}%. 🎉`
                  : score >= 50
                    ? `Vas bien (${score}%). Escucha de nuevo y vuelve a intentar.`
                    : `Coincidencia ${score}%. Escucha la frase otra vez y repítela despacio.`}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Consejo: habla claro y a un ritmo normal. Si una palabra no se reconoce,
        intenta exagerar un poco su sonido.
      </p>
    </div>
  );
}
