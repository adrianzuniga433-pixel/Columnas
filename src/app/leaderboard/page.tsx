import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/AppHeader";

export const dynamic = "force-dynamic";

function displayName(name: string | null, email: string): string {
  if (name && name.trim()) return name;
  const local = email.split("@")[0];
  return local.slice(0, 3) + "•••";
}

export default async function LeaderboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  const rows = await prisma.progress.findMany({
    orderBy: [{ streakCount: "desc" }, { studyDay: "desc" }],
    take: 30,
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-block">
          ← Volver al panel
        </Link>
        <h1 className="text-2xl font-bold">👥 Tabla de avance</h1>
        <p className="mb-6 text-sm text-slate-500">
          Mira cómo van todos. ¡Compite sanamente por la mejor racha! 🔥
        </p>

        <div className="card !p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/60">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2 text-center">Racha</th>
                <th className="px-4 py-2 text-center">Día del plan</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const isMe = r.user.id === session.userId;
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`;
                return (
                  <tr
                    key={r.id}
                    className={`border-t border-slate-100 dark:border-slate-800 ${
                      isMe ? "bg-brand-50 font-medium dark:bg-brand-950" : ""
                    }`}
                  >
                    <td className="px-4 py-2">{medal}</td>
                    <td className="px-4 py-2">
                      {displayName(r.user.name, r.user.email)}
                      {isMe && <span className="ml-1 text-xs text-brand-600">(tú)</span>}
                    </td>
                    <td className="px-4 py-2 text-center">{r.streakCount} 🔥</td>
                    <td className="px-4 py-2 text-center">{r.studyDay}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-center text-xs text-slate-400">
          Por privacidad, solo se muestra el nombre (o parte del correo).
        </p>
      </main>
    </div>
  );
}
