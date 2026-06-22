import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sin conexión — Curso de Inglés",
};

// Página que el service worker muestra cuando no hay internet y la
// página solicitada no está en caché.
export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="card max-w-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-3xl dark:bg-slate-800">
          🦕
        </div>
        <h1 className="text-xl font-semibold">Estás sin conexión</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          No pudimos cargar esta página porque no hay internet. Las páginas que
          ya visitaste siguen disponibles; cuando vuelva la conexión, todo se
          actualizará solo.
        </p>
        <a href="/today" className="btn-primary mt-6 w-full">
          Volver a mi estudio
        </a>
      </div>
    </main>
  );
}
