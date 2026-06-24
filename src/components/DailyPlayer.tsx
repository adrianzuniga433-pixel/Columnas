"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ActivityCard, type ActivityResult } from "./ActivityCard";
import type { Activity } from "@/content/types";
import type { DailySession } from "@/content/daily";

export type DailySection =
  | "full"
  | "grammar"
  | "vocab"
  | "comprension"
  | "conversation"
  | "pronunciation"
  | "produccion"
  | "recursos";

const SECTION_LABEL: Record<DailySection, string> = {
  full: "Sesión completa",
  grammar: "📘 Gramática",
  vocab: "📝 Vocabulario",
  comprension: "📖 Comprensión",
  conversation: "💬 Conversación",
  pronunciation: "🎤 Pronunciación",
  produccion: "✏️ Producción",
  recursos: "🎬 Recursos",
};

type Phase = "intro" | "activities" | "wrapup" | "done";

export function DailyPlayer({
  session,
  alreadyDoneToday,
  section = "full",
  quick = false,
}: {
  session: DailySession;
  alreadyDoneToday: boolean;
  section?: DailySection;
  quick?: boolean;
}) {
  const router = useRouter();

  const isShort = section === "full" && quick;

  // Subconjunto corto para una sesión de ~15 minutos.
  const shortActivities: Activity[] = [
    ...session.vocab.cards.slice(0, 5),
    ...session.grammarPractice.slice(0, 5),
    ...session.writtenExpression.slice(0, 1),
    session.comprehensionSet[0],
    ...session.pronunciationSet.slice(0, 1),
  ];

  // Qué actividades corresponden a esta sección.
  const activities: Activity[] =
    section === "grammar"
      ? [...session.grammarPractice, ...session.writtenExpression]
      : section === "vocab"
        ? session.vocab.cards
        : section === "comprension"
          ? session.comprehensionSet
          : section === "conversation"
            ? [session.dialogue]
            : section === "pronunciation"
              ? session.pronunciationSet
              : isShort
                ? shortActivities
                : session.activities; // full

  const showGrammarIntro = (section === "full" && !isShort) || section === "grammar";
  const isFull = section === "full" && !isShort;

  const [phase, setPhase] = useState<Phase>(
    showGrammarIntro ? "intro" : "activities"
  );
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [saving, setSaving] = useState(false);

  const totalSteps = activities.length;
  const progressPct =
    phase === "intro"
      ? 0
      : phase === "activities"
        ? Math.round((step / Math.max(1, totalSteps)) * 100)
        : 100;

  function recordMistake(mcq: Extract<Activity, { kind: "mcq" }>) {
    const conceptKey = (mcq.sentence ?? mcq.prompt)
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);
    fetch("/api/mistakes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conceptKey,
        prompt: mcq.prompt,
        sentence: mcq.sentence,
        options: mcq.options,
        answerIndex: mcq.answerIndex,
        explanation: mcq.explanation,
        translationEs: mcq.translationEs,
        topicTitle: mcq.topicTitle,
        topicWhy: mcq.topicWhy,
      }),
    }).catch(() => {});
  }

  // Registra un error de Written Expression en el panel de debilidades,
  // mapeándolo a la forma de opción múltiple (las partes marcadas son las
  // opciones; la respuesta correcta es la parte con el error).
  function recordErrorId(e: Extract<Activity, { kind: "error-id" }>) {
    const labeled = e.segments.filter((s) => s.label);
    const sentence = e.segments.map((s) => s.text).join(" ");
    const options = labeled.map((s) => s.text);
    const answerIndex = labeled.findIndex((s) => s.label === e.answerLabel);
    if (answerIndex < 0) return;
    fetch("/api/mistakes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conceptKey: "we:" + sentence.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 170),
        prompt: "Written Expression: ¿qué parte tiene el error?",
        sentence,
        options,
        answerIndex,
        explanation: e.explanation,
        topicTitle: "Written Expression (identificar el error)",
      }),
    }).catch(() => {});
  }

  function handleDone(r: ActivityResult) {
    const act = activities[step];
    if (act && act.kind === "mcq" && r.correct < r.total) {
      recordMistake(act);
    }
    if (act && act.kind === "error-id" && r.correct < r.total) {
      recordErrorId(act);
    }
    setCorrect((c) => c + r.correct);
    setTotal((t) => t + r.total);
    if (step + 1 >= totalSteps) {
      if (isFull) setPhase("wrapup");
      else if (isShort) finish();
      else setPhase("done");
    } else {
      setStep((s) => s + 1);
    }
  }

  async function finish() {
    setSaving(true);
    try {
      await fetch("/api/daily/complete", { method: "POST" });
      router.refresh();
    } catch {
      // continuamos de todos modos
    } finally {
      setSaving(false);
      setPhase("done");
    }
  }

  const pct = total > 0 ? Math.round((correct / total) * 100) : 100;

  const header = (
    <>
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/dashboard" className="btn-ghost">
          ← Salir
        </Link>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-100">
          {session.stageEmoji} {session.stage} · Semana {session.week}
        </span>
      </div>
      <h1 className="text-2xl font-bold">
        Día {session.day}
        {isShort ? (
          <span className="text-slate-400"> · Sesión corta</span>
        ) : !isFull ? (
          <span className="text-slate-400"> · {SECTION_LABEL[section]}</span>
        ) : null}
      </h1>
      <p className="mb-4 text-sm text-slate-500">{session.monthFocus}</p>
    </>
  );

  // ----- Secciones estáticas (sin ejercicios): Producción y Recursos -----

  if (section === "produccion") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6">
        {header}
        <div className="card animate-slide-up">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
            ✏️ Producción del día
          </p>
          <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-200">
            {session.productionPrompt}
          </p>
          <Link href="/practice/writing" className="btn-primary mb-2 inline-block">
            Escribir y practicar →
          </Link>
          <p className="text-xs text-slate-400">
            Tip: también puedes decir tu respuesta en voz alta para practicar
            pronunciación.
          </p>
        </div>
      </div>
    );
  }

  if (section === "recursos") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6">
        {header}
        <div className="card animate-slide-up">
          <p className="mb-3 text-sm font-semibold">🎬 Recursos de hoy</p>
          <ul className="space-y-2">
            {session.resources.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span>{r.icon}</span>
                <span>
                  <strong>{r.label}:</strong>{" "}
                  <span className="text-slate-600 dark:text-slate-300">
                    {r.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/videos" className="btn-secondary mt-4 inline-block">
            Ver todos los videos y práctica →
          </Link>
        </div>
      </div>
    );
  }

  // ----- Secciones con ejercicios: completa, gramática, vocabulario, comprensión -----

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {header}

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="card">
        {/* Intro de gramática */}
        {phase === "intro" && (
          <div className="animate-slide-up">
            {alreadyDoneToday && isFull && (
              <div className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                ✓ Ya completaste la sesión de hoy. Puedes repasarla otra vez si
                quieres; el día avanzará mañana.
              </div>
            )}
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
              📘 Gramática del día
            </p>
            <h2 className="mb-3 text-lg font-semibold">{session.grammar.title}</h2>
            <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-200">
              {session.grammar.tipEs}
            </p>
            <ul className="mb-4 space-y-2">
              {session.grammar.examples.map((ex, i) => (
                <li
                  key={i}
                  className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
                >
                  <span className="font-medium">{ex.en}</span>
                  <span className="text-slate-500"> — {ex.es}</span>
                </li>
              ))}
            </ul>
            {isFull && (
              <div className="mb-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                ⏱️ Sesión completa de hoy: <strong>≈ {session.estimatedMinutes} min</strong>{" "}
                ({session.activities.length} actividades + producción). Puedes
                hacerla de corrido o por partes con los botones del panel.
              </div>
            )}
            <button className="btn-primary" onClick={() => setPhase("activities")}>
              {isFull ? "Empezar la sesión →" : "Empezar la práctica →"}
            </button>
          </div>
        )}

        {/* Actividades */}
        {phase === "activities" && totalSteps > 0 && (
          <div key={step} className="animate-slide-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Actividad {step + 1} de {totalSteps}
            </p>
            <ActivityCard activity={activities[step]} onDone={handleDone} />
          </div>
        )}

        {/* Producción + recursos (solo sesión completa) */}
        {phase === "wrapup" && (
          <div className="animate-slide-up">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
              ✏️ Producción del día
            </p>
            <p className="mb-3 leading-relaxed text-slate-700 dark:text-slate-200">
              {session.productionPrompt}
            </p>
            <Link href="/practice/writing" className="btn-secondary mb-2 inline-block">
              Escribir y recibir retroalimentación →
            </Link>
            <p className="mb-5 text-xs text-slate-400">
              Tip: también puedes decir tu respuesta en voz alta para practicar
              pronunciación.
            </p>

            <div className="mb-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="mb-3 text-sm font-semibold">🎬 Recursos de hoy</p>
              <ul className="space-y-2">
                {session.resources.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span>{r.icon}</span>
                    <span>
                      <strong>{r.label}:</strong>{" "}
                      <span className="text-slate-600 dark:text-slate-300">
                        {r.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn-primary" onClick={finish} disabled={saving}>
              {saving ? "Guardando..." : "Completar sesión de hoy ✓"}
            </button>
          </div>
        )}

        {/* Final */}
        {phase === "done" && (
          <div className="animate-pop-in text-center">
            <div className="mb-2 text-5xl">🎉</div>
            <h2 className="mb-1 text-xl font-bold">
              {isFull || isShort ? "¡Sesión completada!" : "¡Práctica completada!"}
            </h2>
            {total > 0 && (
              <p className="mb-1 text-slate-500">
                Acertaste {correct} de {total} ({pct}%).
              </p>
            )}
            <p className="mb-4 text-sm text-slate-400">
              {isFull || isShort
                ? `Las palabras de hoy se agregaron a tus repasos. ¡Vuelve mañana para el Día ${session.day + 1}!`
                : "¡Buen trabajo! Puedes practicar otra sección cuando quieras."}
            </p>
            <div className="flex justify-center gap-2">
              <Link href="/dashboard" className="btn-secondary">
                Ir al panel
              </Link>
              <Link href="/review" className="btn-primary">
                Repasar vocabulario →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
