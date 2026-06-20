"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SpeechButton } from "./SpeechButton";

interface Topic {
  q: string;
  qEs: string;
  suggestions: string[];
}

const TOPICS: Topic[] = [
  { q: "Tell me about yourself.", qEs: "Háblame de ti.", suggestions: ["My name is...", "I'm from...", "I work as...", "In my free time I like..."] },
  { q: "What did you do last weekend?", qEs: "¿Qué hiciste el fin de semana pasado?", suggestions: ["On Saturday I...", "I went to...", "It was...", "After that, I..."] },
  { q: "What are your plans for the future?", qEs: "¿Cuáles son tus planes para el futuro?", suggestions: ["I want to...", "I'm going to...", "I hope to...", "My goal is to..."] },
  { q: "Describe your typical day.", qEs: "Describe tu día típico.", suggestions: ["I usually wake up at...", "Then I...", "In the afternoon...", "At night I..."] },
  { q: "What is your favorite movie or series and why?", qEs: "¿Cuál es tu película o serie favorita y por qué?", suggestions: ["My favorite is...", "It's about...", "I like it because...", "The main character..."] },
  { q: "Talk about a place you would like to visit.", qEs: "Habla de un lugar que te gustaría visitar.", suggestions: ["I would like to visit...", "I've always wanted to...", "Because...", "I would..."] },
  { q: "What do you like and dislike about your city?", qEs: "¿Qué te gusta y qué no de tu ciudad?", suggestions: ["I like that...", "However, I don't like...", "There is/are...", "On the other hand..."] },
  { q: "Why are you learning English?", qEs: "¿Por qué estás aprendiendo inglés?", suggestions: ["I'm learning English because...", "It will help me to...", "I want to be able to...", "My main reason is..."] },
];

export function FreeTalk() {
  const [supported, setSupported] = useState(true);
  const [idx, setIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const recRef = useRef<any>(null);

  const topic = TOPICS[idx];

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
    rec.continuous = true;
    rec.onresult = (e: any) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript + " ";
      setHeard(t.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
  }, []);

  function toggle() {
    if (!recRef.current) return;
    if (listening) {
      recRef.current.stop();
      setListening(false);
      return;
    }
    setHeard(null);
    try {
      setListening(true);
      recRef.current.start();
    } catch {
      setListening(false);
    }
  }

  function next() {
    setHeard(null);
    setIdx((i) => (i + 1) % TOPICS.length);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
        ← Volver
      </Link>
      <h1 className="mb-1 text-2xl font-bold">🗣️ Conversación libre</h1>
      <p className="mb-6 text-sm text-slate-500">
        Responde hablando en voz alta. No hay calificación: el objetivo es soltarte.
        Usa las frases sugeridas para empezar.
      </p>

      {!supported && (
        <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          Tu navegador no permite el micrófono (usa Chrome). Aún puedes leer la
          pregunta y responder en voz alta por tu cuenta.
        </div>
      )}

      <div className="card">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xl font-semibold">{topic.q}</p>
            <p className="text-sm text-slate-500">{topic.qEs}</p>
          </div>
          <SpeechButton text={topic.q} label="" className="!px-3 !py-1.5" />
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Frases para empezar
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.suggestions.map((s) => (
              <span
                key={s}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button className="btn-primary" onClick={toggle} disabled={!supported}>
            {listening ? "⏹️ Detener" : "🎤 Hablar"}
          </button>
          <button className="btn-ghost" onClick={next}>
            Otra pregunta →
          </button>
        </div>

        {heard && (
          <div className="mt-4 animate-pop-in rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/60">
            <span className="text-slate-500">Lo que dijiste: </span>
            <span className="font-medium">“{heard}”</span>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Consejo: intenta hablar 30–60 segundos seguidos. No te preocupes por los
        errores; lo importante es practicar.
      </p>
    </div>
  );
}
