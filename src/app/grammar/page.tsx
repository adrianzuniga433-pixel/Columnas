import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { grammarLessons } from "@/content/daily";
import { tenseForms, irregularVerbs, adjectives } from "@/content/grammarReference";
import { SpeechButton } from "@/components/SpeechButton";

export const dynamic = "force-dynamic";

export default async function GrammarPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver al panel
        </Link>
        <h1 className="text-2xl font-bold">📖 Biblioteca de gramática</h1>
        <p className="mb-6 text-sm text-slate-500">
          Tus reglas de gramática siempre a la mano. Consulta cualquier tema
          cuando lo necesites.
        </p>

        <div className="space-y-3">
          {grammarLessons.map((g, i) => (
            <details
              key={g.title}
              className="card group"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold">
                <span>
                  {i + 1}. {g.title}
                </span>
                <span className="text-slate-400 transition-transform group-open:rotate-90">
                  →
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-200">
                {g.tipEs}
              </p>
              <ul className="mt-3 space-y-2">
                {g.examples.map((ex, k) => (
                  <li
                    key={k}
                    className="rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/60"
                  >
                    <span className="font-medium">{ex.en}</span>
                    <span className="text-slate-500"> — {ex.es}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        {/* Tiempos verbales: afirmativo, negativo, interrogativo */}
        <h2 className="mb-3 mt-8 text-lg font-semibold">
          ⏱️ Tiempos verbales (afirmativo · negativo · interrogativo)
        </h2>
        <div className="card !p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/60">
              <tr>
                <th className="px-3 py-2">Tiempo</th>
                <th className="px-3 py-2">➕ Afirmativo</th>
                <th className="px-3 py-2">➖ Negativo</th>
                <th className="px-3 py-2">❓ Interrogativo</th>
              </tr>
            </thead>
            <tbody>
              {tenseForms.map((t) => (
                <tr key={t.tense} className="border-t border-slate-100 align-top dark:border-slate-800">
                  <td className="px-3 py-2 font-medium">
                    {t.tense}
                    <p className="text-xs font-normal text-slate-400">{t.use}</p>
                  </td>
                  <td className="px-3 py-2">{t.affirmative}</td>
                  <td className="px-3 py-2">{t.negative}</td>
                  <td className="px-3 py-2">{t.interrogative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verbos irregulares */}
        <h2 className="mb-3 mt-8 text-lg font-semibold">
          🔁 Verbos irregulares ({irregularVerbs.length})
        </h2>
        <p className="mb-3 text-sm text-slate-500">
          Base · Pasado · Participio (el participio se usa con have/has y en la voz pasiva).
        </p>
        <div className="card !p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/60">
              <tr>
                <th className="px-3 py-2">Base</th>
                <th className="px-3 py-2">Pasado</th>
                <th className="px-3 py-2">Participio</th>
                <th className="px-3 py-2">Español</th>
              </tr>
            </thead>
            <tbody>
              {irregularVerbs.map((v) => (
                <tr key={v.base} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-3 py-2 font-medium">{v.base}</td>
                  <td className="px-3 py-2">{v.past}</td>
                  <td className="px-3 py-2">{v.participle}</td>
                  <td className="px-3 py-2 text-slate-500">{v.es}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Adjetivos calificativos */}
        <h2 className="mb-3 mt-8 text-lg font-semibold">
          🎨 Adjetivos calificativos ({adjectives.length})
        </h2>
        <div className="card">
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {adjectives.map((a) => (
              <li key={a.en} className="flex items-center gap-2 text-sm">
                <SpeechButton text={a.en} label="" className="!px-2 !py-1" />
                <span className="font-medium">{a.en}</span>
                <span className="text-slate-500"> — {a.es}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
