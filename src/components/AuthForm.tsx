"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister ? { email, password, name } : { email, password }
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Ocurrió un error");
        setLoading(false);
        return;
      }
      // Tras registrarse, la diagnóstica decidirá el nivel.
      router.push(isRegister ? "/placement" : "/dashboard");
      router.refresh();
    } catch {
      setError("No se pudo conectar. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="mb-8 text-center">
        <div className="mb-2 text-3xl font-bold tracking-tight text-brand-600">
          Curso de Inglés
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Inglés de cero a A2 sólido · meta 400 en el TOEFL ITP
        </p>
      </div>

      <form onSubmit={onSubmit} className="card animate-slide-up">
        <h1 className="mb-6 text-xl font-semibold">
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        {isRegister && (
          <div className="mb-4">
            <label className="label" htmlFor="name">
              Nombre (opcional)
            </label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
          />
        </div>

        <div className="mb-6">
          <label className="label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading
            ? "Procesando..."
            : isRegister
              ? "Crear cuenta y empezar"
              : "Entrar"}
        </button>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {isRegister ? (
            <>
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-medium text-brand-600 hover:underline">
                Inicia sesión
              </Link>
            </>
          ) : (
            <>
              ¿Aún no tienes cuenta?{" "}
              <Link
                href="/register"
                className="font-medium text-brand-600 hover:underline"
              >
                Regístrate
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
