"use client";

import { useEffect, useState } from "react";

/** Reproduce texto en inglés usando la Web Speech API (SpeechSynthesis). */
export function SpeechButton({
  text,
  label = "Escuchar",
  rate = 0.9,
  className = "",
}: {
  text: string;
  label?: string;
  rate?: number;
  className?: string;
}) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" && "speechSynthesis" in window
    );
  }, []);

  function speak() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "en-US";
    utt.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith("en"));
    if (enVoice) utt.voice = enVoice;
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utt);
  }

  if (!supported) {
    return (
      <p className="text-sm text-amber-600 dark:text-amber-400">
        Tu navegador no soporta la síntesis de voz. Lee el texto a continuación.
      </p>
    );
  }

  return (
    <button type="button" onClick={speak} className={`btn-secondary ${className}`}>
      <span aria-hidden>{speaking ? "🔊" : "▶️"}</span> {label}
    </button>
  );
}
