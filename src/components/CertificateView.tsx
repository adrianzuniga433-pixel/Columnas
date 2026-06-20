"use client";

import Link from "next/link";

export function CertificateView({
  name,
  stage,
  studyDay,
  words,
  daysStudied,
  date,
}: {
  name: string;
  stage: string;
  studyDay: number;
  words: number;
  daysStudied: number;
  date: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between print:hidden">
        <Link href="/dashboard" className="btn-ghost">
          ← Volver
        </Link>
        <button className="btn-primary" onClick={() => window.print()}>
          🖨️ Descargar / Imprimir
        </button>
      </div>

      <div className="rounded-2xl border-4 border-brand-500 bg-white p-8 text-center text-slate-800 shadow-lg print:border-brand-600 print:shadow-none">
        <p className="text-5xl">🦖</p>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-brand-600">
          Certificado de avance
        </p>
        <h1 className="mt-4 text-3xl font-bold">{name}</h1>
        <p className="mt-4 text-slate-600">
          ha demostrado constancia y dedicación en su aprendizaje del inglés,
          alcanzando el nivel
        </p>
        <p className="my-3 text-2xl font-bold text-brand-600">{stage}</p>
        <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-slate-200 pt-6">
          <div>
            <p className="text-2xl font-bold">{studyDay - 1}</p>
            <p className="text-xs text-slate-500">días de plan</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{words}</p>
            <p className="text-xs text-slate-500">palabras</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{daysStudied}</p>
            <p className="text-xs text-slate-500">días estudiados</p>
          </div>
        </div>
        <p className="mt-8 text-sm text-slate-500">Curso de Inglés · {date}</p>
        <p className="text-xs text-slate-400">¡Sigue así para alcanzar tus metas!</p>
      </div>
    </div>
  );
}
