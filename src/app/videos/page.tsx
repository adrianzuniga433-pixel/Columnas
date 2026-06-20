import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { videoLevels } from "@/content/videos";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4">
          ← Volver al panel
        </Link>
        <h1 className="text-2xl font-bold">🎬 Videos y escucha</h1>
        <p className="mb-6 text-sm text-slate-500">
          Practica tu comprensión con videos y series reales. Cada recurso trae
          una tarea concreta para que veas con propósito, no solo de pasada.
        </p>

        {videoLevels.map((lvl) => (
          <section key={lvl.level} className="mb-8">
            <h2 className="mb-1 text-lg font-semibold">
              {lvl.emoji} Nivel {lvl.level}
            </h2>
            <p className="mb-3 text-sm text-slate-500">{lvl.intro}</p>
            <div className="grid gap-3">
              {lvl.resources.map((r) => (
                <div key={r.title} className="card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{r.title}</h3>
                      <p className="mt-0.5 text-sm text-slate-500">{r.teaches}</p>
                    </div>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary shrink-0 !px-3 !py-1.5 text-sm"
                    >
                      Ver ▶
                    </a>
                  </div>
                  <div className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-900 dark:bg-brand-950 dark:text-brand-100">
                    <strong>Práctica:</strong> {r.practice}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <p className="mt-2 text-center text-xs text-slate-400">
          Los videos son de canales externos (YouTube, plataformas de streaming).
          Aquí solo se recomiendan y se propone cómo practicar con ellos.
        </p>
      </main>
    </div>
  );
}
