"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ListeningTurn } from "@/content/types";

const RATES: { label: string; value: number }[] = [
  { label: "0.75×", value: 0.75 },
  { label: "1×", value: 0.95 },
  { label: "1.25×", value: 1.2 },
];

// Paleta de tono para diferenciar interlocutores aunque el navegador solo
// tenga una voz en inglés disponible.
const PITCHES = [1.0, 0.8, 1.25, 0.7];

const SPEAKER_STYLES = [
  "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
];

/**
 * Reproduce una conversación de varios turnos con una VOZ DISTINTA por
 * interlocutor y control de velocidad (estilo TOEFL Listening Part B/C).
 */
export function ConversationAudio({
  turns,
  className = "",
}: {
  turns: ListeningTurn[];
  className?: string;
}) {
  const [supported, setSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [rate, setRate] = useState(0.95);
  const [current, setCurrent] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const rateRef = useRef(rate);
  rateRef.current = rate;
  const cancelledRef = useRef(false);

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(ok);
    if (!ok) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      // Marca cancelado ANTES de cancelar: si no, el onend/onerror de la
      // frase en curso reanudaría la siguiente tras desmontar el componente.
      cancelledRef.current = true;
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Orden de aparición de cada interlocutor → índice estable.
  const speakerIndex = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of turns) {
      if (!map.has(t.speaker)) map.set(t.speaker, map.size);
    }
    return map;
  }, [turns]);

  // Asigna una voz (y un tono) distinta a cada interlocutor.
  const configFor = useCallback(
    (speaker: string) => {
      const idx = speakerIndex.get(speaker) ?? 0;
      const enVoices = voices.filter((v) => v.lang.startsWith("en"));
      const voice =
        enVoices.length > 0 ? enVoices[idx % enVoices.length] : undefined;
      const pitch = PITCHES[idx % PITCHES.length];
      return { voice, pitch };
    },
    [voices, speakerIndex]
  );

  const stop = useCallback(() => {
    cancelledRef.current = true;
    if (supported) window.speechSynthesis.cancel();
    setPlaying(false);
    setCurrent(-1);
  }, [supported]);

  const speakFrom = useCallback(
    (idx: number) => {
      if (idx >= turns.length) {
        setPlaying(false);
        setCurrent(-1);
        return;
      }
      setCurrent(idx);
      const t = turns[idx];
      const utt = new SpeechSynthesisUtterance(t.text);
      utt.lang = "en-US";
      utt.rate = rateRef.current;
      const cfg = configFor(t.speaker);
      if (cfg.voice) utt.voice = cfg.voice;
      utt.pitch = cfg.pitch;
      utt.onend = () => {
        if (!cancelledRef.current) speakFrom(idx + 1);
      };
      utt.onerror = () => {
        if (!cancelledRef.current) speakFrom(idx + 1);
      };
      window.speechSynthesis.speak(utt);
    },
    [turns, configFor]
  );

  const playAll = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    cancelledRef.current = false;
    setPlaying(true);
    speakFrom(0);
  }, [supported, speakFrom]);

  const playOne = useCallback(
    (idx: number) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      cancelledRef.current = true; // no encadenar
      setCurrent(idx);
      setPlaying(false);
      const t = turns[idx];
      const utt = new SpeechSynthesisUtterance(t.text);
      utt.lang = "en-US";
      utt.rate = rateRef.current;
      const cfg = configFor(t.speaker);
      if (cfg.voice) utt.voice = cfg.voice;
      utt.pitch = cfg.pitch;
      utt.onend = () => setCurrent(-1);
      window.speechSynthesis.speak(utt);
    },
    [supported, turns, configFor]
  );

  if (!supported) {
    return (
      <p className="text-sm text-amber-600 dark:text-amber-400">
        Tu navegador no soporta la síntesis de voz. Lee la conversación abajo.
      </p>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        {!playing ? (
          <button
            type="button"
            className="btn-primary"
            onClick={playAll}
            aria-label="Reproducir la conversación completa"
          >
            <span aria-hidden>▶️</span> Reproducir conversación
          </button>
        ) : (
          <button
            type="button"
            className="btn-secondary"
            onClick={stop}
            aria-label="Detener la reproducción"
          >
            <span aria-hidden>⏹️</span> Detener
          </button>
        )}
        <div
          className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800"
          role="group"
          aria-label="Velocidad de reproducción"
        >
          <span className="px-1 text-xs text-slate-500">Velocidad</span>
          {RATES.map((r) => {
            const active = Math.abs(rate - r.value) < 0.01;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => setRate(r.value)}
                aria-pressed={active}
                aria-label={`Velocidad ${r.label}`}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  active
                    ? "bg-white text-brand-700 shadow-sm dark:bg-slate-600 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-400">
        🔊 Cada persona tiene una voz distinta. Toca un turno para repetir solo
        esa línea.
      </p>

      <div className="mt-3 space-y-2">
        {turns.map((t, idx) => {
          const sIdx = speakerIndex.get(t.speaker) ?? 0;
          const isCurrent = idx === current;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => playOne(idx)}
              aria-label={`Reproducir la línea de ${t.speaker}: ${t.text}`}
              className={`flex w-full items-start gap-2 rounded-lg border p-2 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                isCurrent
                  ? "border-brand-400 bg-brand-50 dark:bg-brand-950"
                  : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  SPEAKER_STYLES[sIdx % SPEAKER_STYLES.length]
                }`}
              >
                {isCurrent ? "🔊 " : ""}
                {t.speaker}
              </span>
              <span className="pt-0.5">{t.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
