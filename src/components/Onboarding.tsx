"use client";

import { useEffect, useState } from "react";

const KEY = "columnas_onboarded_v1";

const STEPS = [
  {
    icon: "👋",
    title: "¡Bienvenido a Curso de Inglés!",
    text: "Aprenderás inglés con una sesión de estudio diferente cada día. La constancia es la clave: un poco cada día funciona mejor que mucho de vez en cuando.",
  },
  {
    icon: "📅",
    title: "Tu sesión diaria",
    text: "Cada día practicas vocabulario, gramática, comprensión (lectura y escucha), conversación y pronunciación, todo en un solo lugar. Si tienes poco tiempo, puedes hacerlo por partes con los botones del panel.",
  },
  {
    icon: "📋",
    title: "Verifica tu avance",
    text: "Cada 5 días aparece un examen para comprobar lo aprendido. Y si te interesa el TOEFL, en el botón 'Modo TOEFL' mides tu puntaje cuando quieras. ¡Empecemos!",
  },
];

export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  function close() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;
  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="mb-3 text-center text-5xl">{s.icon}</div>
        <h2 className="mb-2 text-center text-xl font-bold">{s.title}</h2>
        <p className="mb-5 text-center text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {s.text}
        </p>

        <div className="mb-4 flex justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === step ? "bg-brand-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button className="btn-ghost text-sm" onClick={close}>
            Saltar
          </button>
          {last ? (
            <button className="btn-primary" onClick={close}>
              ¡Empezar! 🚀
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setStep((x) => x + 1)}>
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
