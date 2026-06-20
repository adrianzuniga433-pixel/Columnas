import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { grammarLessons } from "@/content/daily";

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
      </main>
    </div>
  );
}
