"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { showAppNotification } from "@/lib/notify";

const K_ENABLED = "columnas_remind_enabled";
const K_HOUR = "columnas_remind_hour";
const K_GOAL = "columnas_daily_goal";

export function SettingsForm() {
  const [enabled, setEnabled] = useState(false);
  const [hour, setHour] = useState(19);
  const [goal, setGoal] = useState(20);
  const [perm, setPerm] = useState<string>("default");

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(K_ENABLED) === "1");
      setHour(Number(localStorage.getItem(K_HOUR) ?? 19));
      setGoal(Number(localStorage.getItem(K_GOAL) ?? 20));
    } catch {
      /* ignore */
    }
    if (typeof Notification !== "undefined") setPerm(Notification.permission);
  }, []);

  async function toggleReminder() {
    if (!enabled) {
      if (typeof Notification === "undefined") {
        alert("Tu navegador no soporta notificaciones.");
        return;
      }
      const p = await Notification.requestPermission();
      setPerm(p);
      if (p !== "granted") return;
    }
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(K_ENABLED, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }

  function save(h: number, g: number) {
    setHour(h);
    setGoal(g);
    try {
      localStorage.setItem(K_HOUR, String(h));
      localStorage.setItem(K_GOAL, String(g));
    } catch {
      /* ignore */
    }
  }

  async function testNotification() {
    if (typeof Notification === "undefined") {
      alert("Tu navegador no soporta notificaciones.");
      return;
    }
    let p = Notification.permission;
    if (p !== "granted") {
      p = await Notification.requestPermission();
      setPerm(p);
    }
    if (p !== "granted") return;
    const ok = await showAppNotification(
      "¡Prueba de recordatorio! 🦖",
      "Así se verá tu recordatorio diario. ¡A practicar!"
    );
    if (!ok) alert("No se pudo mostrar la notificación.");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
        ← Volver al panel
      </Link>
      <h1 className="mb-6 text-2xl font-bold">⚙️ Ajustes</h1>

      {/* Recordatorio */}
      <div className="card mb-4">
        <p className="font-semibold">🔔 Recordatorio diario</p>
        <p className="mb-3 text-sm text-slate-500">
          A tu hora elegida te avisamos para que no rompas tu racha. Funciona
          mientras la app esté abierta o instalada en tu dispositivo.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            className={enabled ? "btn-secondary" : "btn-primary"}
            onClick={toggleReminder}
          >
            {enabled ? "Recordatorio activado ✓ (tocar para desactivar)" : "Activar recordatorio"}
          </button>
          <button className="btn-ghost" onClick={testNotification}>
            🔔 Probar
          </button>
        </div>
        {enabled && (
          <div className="mt-4">
            <label className="label">Hora del recordatorio</label>
            <select
              className="input"
              value={hour}
              onChange={(e) => save(Number(e.target.value), goal)}
            >
              {Array.from({ length: 24 }, (_, h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, "0")}:00
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-400">
              💡 Para recibirlo aunque cierres el navegador, instala la app
              (Añadir a pantalla de inicio) y mantén las notificaciones activas.
            </p>
          </div>
        )}
        {perm === "denied" && (
          <p className="mt-2 text-xs text-amber-600">
            Las notificaciones están bloqueadas en tu navegador. Actívalas en los
            ajustes del sitio para recibir el recordatorio.
          </p>
        )}
      </div>

      {/* Meta diaria */}
      <div className="card">
        <p className="font-semibold">🌙 Meta diaria</p>
        <p className="mb-3 text-sm text-slate-500">
          Elige cuánto tiempo quieres dedicar. Verás una opción de “sesión corta”
          en el panel.
        </p>
        <div className="flex gap-2">
          {[10, 20, 30].map((g) => (
            <button
              key={g}
              onClick={() => save(hour, g)}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                goal === g
                  ? "border-brand-500 bg-brand-50 font-medium dark:bg-brand-950"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            >
              {g} min
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
