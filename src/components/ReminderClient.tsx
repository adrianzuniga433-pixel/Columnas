"use client";

import { useEffect } from "react";
import { showAppNotification } from "@/lib/notify";

// Muestra una notificación si: el recordatorio está activado, ya pasó (o llega)
// la hora elegida, el usuario aún no estudió hoy y no se notificó ya hoy.
// Si la hora aún no llega, la programa para ese momento (mientras la pestaña
// siga abierta).
export function ReminderClient({ doneToday }: { doneToday: boolean }) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (localStorage.getItem("columnas_remind_enabled") !== "1") return;
      if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
      if (doneToday) return;

      const hour = Number(localStorage.getItem("columnas_remind_hour") ?? 19);
      const now = new Date();
      const todayKey = now.toISOString().slice(0, 10);

      const fire = () => {
        if (localStorage.getItem("columnas_remind_last") === todayKey) return;
        showAppNotification(
          "¡Hora de practicar inglés! 🦖",
          "Tu sesión de hoy te espera. Mantén tu racha 🔥"
        );
        localStorage.setItem("columnas_remind_last", todayKey);
      };

      if (now.getHours() >= hour) {
        fire();
      } else {
        // Programa la notificación para la hora elegida de hoy (si la pestaña
        // sigue abierta hasta entonces).
        const target = new Date(now);
        target.setHours(hour, 0, 0, 0);
        const ms = target.getTime() - now.getTime();
        if (ms > 0 && ms < 1000 * 60 * 60 * 24) timer = setTimeout(fire, ms);
      }
    } catch {
      /* ignore */
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [doneToday]);

  return null;
}
