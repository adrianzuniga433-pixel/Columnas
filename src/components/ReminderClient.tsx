"use client";

import { useEffect } from "react";

// Muestra una notificación si: el recordatorio está activado, ya pasó la hora
// elegida, el usuario aún no estudió hoy, y no se notificó ya hoy.
export function ReminderClient({ doneToday }: { doneToday: boolean }) {
  useEffect(() => {
    try {
      if (localStorage.getItem("columnas_remind_enabled") !== "1") return;
      if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
      if (doneToday) return;

      const hour = Number(localStorage.getItem("columnas_remind_hour") ?? 19);
      const now = new Date();
      if (now.getHours() < hour) return;

      const todayKey = now.toISOString().slice(0, 10);
      if (localStorage.getItem("columnas_remind_last") === todayKey) return;

      new Notification("¡Hora de practicar inglés! 🦖", {
        body: "Tu sesión de hoy te espera. Mantén tu racha 🔥",
      });
      localStorage.setItem("columnas_remind_last", todayKey);
    } catch {
      /* ignore */
    }
  }, [doneToday]);

  return null;
}
