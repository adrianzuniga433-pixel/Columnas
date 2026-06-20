import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { stories } from "@/content/stories";

export const dynamic = "force-dynamic";

export default async function ReadingPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver al panel
        </Link>
        <h1 className="text-2xl font-bold">📚 Biblioteca de lecturas</h1>
        <p className="mb-6 text-sm text-slate-500">
          Cuentos cortos para leer con audio, glosario y preguntas. Empieza por tu
          nivel y sube poco a poco.
        </p>
        <div className="grid gap-3">
          {stories.map((s) => (
            <Link
              key={s.id}
              href={`/reading/${s.id}`}
              className="card flex items-center justify-between transition-colors hover:border-brand-400"
            >
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-slate-500">
                  {s.emoji} {s.level} · ~{s.minutes} min · {s.questions.length} preguntas
                </p>
              </div>
              <span className="text-brand-600">Leer →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
