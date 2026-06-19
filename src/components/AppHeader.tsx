"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeProvider";

export function AppHeader({ name }: { name?: string | null }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="text-lg font-bold text-brand-600">
          Columnas
        </Link>
        <div className="flex items-center gap-2">
          {name && (
            <span className="hidden text-sm text-slate-500 sm:inline dark:text-slate-400">
              {name}
            </span>
          )}
          <ThemeToggle />
          <button onClick={logout} className="btn-ghost text-sm">
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
