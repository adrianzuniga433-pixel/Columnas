"use client";

import { useEffect, useState } from "react";

// Registra el service worker y avisa cuando hay una versión nueva lista.
export function ServiceWorkerRegister() {
  const [updateReady, setUpdateReady] = useState(false);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    let cancelled = false;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");

        // Si ya hay uno esperando al cargar.
        if (reg.waiting && navigator.serviceWorker.controller) {
          if (!cancelled) {
            setWaiting(reg.waiting);
            setUpdateReady(true);
          }
        }

        // Detecta cuando llega una versión nueva.
        reg.addEventListener("updatefound", () => {
          const next = reg.installing;
          if (!next) return;
          next.addEventListener("statechange", () => {
            if (
              next.state === "installed" &&
              navigator.serviceWorker.controller &&
              !cancelled
            ) {
              setWaiting(next);
              setUpdateReady(true);
            }
          });
        });
      } catch {
        // Silencioso: la app sigue funcionando online aunque falle el registro.
      }
    };

    register();

    // Cuando el SW nuevo toma control, recargamos para usar la versión fresca.
    let reloaded = false;
    const onControllerChange = () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange
    );

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange
      );
    };
  }, []);

  if (!updateReady) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
      <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-slate-700">
        <span>Hay una versión nueva disponible.</span>
        <button
          type="button"
          onClick={() => {
            waiting?.postMessage("SKIP_WAITING");
            setUpdateReady(false);
          }}
          className="rounded-lg bg-indigo-500 px-3 py-1 font-medium hover:bg-indigo-400"
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}
