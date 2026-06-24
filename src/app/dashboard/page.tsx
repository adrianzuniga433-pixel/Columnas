import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import {
  ensureProgress,
  getProgressStats,
  getWeeklySummary,
  getCompletedSections,
  isToday,
  dateKey,
} from "@/lib/progress";
import { getDashboardData } from "@/lib/dashboard";
import { AppHeader } from "@/components/AppHeader";
import { getDailySession, checkpointDue } from "@/content/daily";
import { prisma } from "@/lib/prisma";
import { Onboarding } from "@/components/Onboarding";
import { ReminderClient } from "@/components/ReminderClient";

export const dynamic = "force-dynamic";

// Bloques de la sesión diaria (los que se pueden marcar como hechos primero).
const SECTION_CHIPS: { key: string; label: string }[] = [
  { key: "grammar", label: "📘 Gramática" },
  { key: "vocab", label: "📝 Vocabulario" },
  { key: "comprension", label: "📖 Comprensión" },
  { key: "conversation", label: "💬 Conversación" },
  { key: "pronunciation", label: "🎤 Pronunciación" },
  { key: "produccion", label: "✏️ Producción" },
  { key: "recursos", label: "🎬 Recursos" },
];

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const user = await getCurrentUser();
  const data = await getDashboardData(session.userId);
  const daily = getDailySession(progress.studyDay);
  const doneToday = isToday(progress.lastStudyAt);
  const sectionDone = new Set(await getCompletedSections(session.userId));
  // Progreso del núcleo del día (gramática + vocabulario + comprensión): al
  // completarlo, el día se cierra y avanza solo.
  const CORE_KEYS = ["grammar", "vocab", "comprension"];
  const coreDoneCount = CORE_KEYS.filter((k) => sectionDone.has(k)).length;

  // Examen de avance disponible (cada 5 días) y aún no aprobado.
  const checkpointMilestone = checkpointDue(progress.studyDay);
  let checkpointPending = false;
  if (checkpointMilestone) {
    const passed = await prisma.examAttempt.findFirst({
      where: {
        userId: session.userId,
        level: 1000 + checkpointMilestone,
        passed: true,
      },
    });
    checkpointPending = !passed;
  }

  const stats = await getProgressStats(session.userId);
  const DOW = ["D", "L", "M", "M", "J", "V", "S"];
  const todayKey = dateKey(new Date());
  const last14: { key: string; label: string; dow: string; studied: boolean; today: boolean }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    last14.push({
      key,
      label: String(d.getDate()),
      dow: DOW[d.getDay()],
      studied: stats.studyDates.has(key),
      today: key === todayKey,
    });
  }
  const studied14 = last14.filter((d) => d.studied).length;
  const weekly = await getWeeklySummary(session.userId);

  return (
    <div className="min-h-screen">
      <Onboarding />
      <ReminderClient doneToday={doneToday} />
      <AppHeader name={user?.name ?? user?.email} />
      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Encabezado de bienvenida */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Hola{user?.name ? `, ${user.name}` : ""} 👋
          </h1>
          <p className="text-sm text-slate-500">
            {daily.stageEmoji} {daily.stage} · Semana {daily.week} · racha {data.streakCount} 🔥
          </p>
        </div>

        {/* Sesión de estudio de hoy (protagonista) */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 p-5 text-white shadow-lg dark:from-brand-700 dark:to-brand-600">
          <Link href="/today" className="block">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-100">
                  {daily.stageEmoji} {daily.stage} · Semana {daily.week}
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  {doneToday ? "✓ Sesión de hoy completada" : `Estudiar — Día ${daily.day}`}
                </h2>
                <p className="mt-1 text-sm text-brand-50">
                  {doneToday
                    ? "¡Buen trabajo! Puedes repasarla o volver mañana."
                    : `Hoy: ${daily.grammar.title} · vocabulario de ${daily.vocab.theme}`}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                {doneToday ? "Repasar" : "Empezar"} →
              </span>
            </div>
          </Link>
          {!doneToday && (
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs text-brand-100">
                <span>
                  Núcleo del día: {coreDoneCount}/3 bloques
                  {coreDoneCount > 0 && coreDoneCount < 3 ? " · ¡vas bien!" : ""}
                  {coreDoneCount === 3 ? " · ¡listo, avanza al siguiente!" : ""}
                </span>
                <span aria-hidden>
                  {["grammar", "vocab", "comprension"]
                    .map((k) => (sectionDone.has(k) ? "🟢" : "⚪"))
                    .join(" ")}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${(coreDoneCount / 3) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-brand-100">
                Completa gramática, vocabulario y comprensión (en cualquier orden)
                y el día se marca como hecho.
              </p>
            </div>
          )}
          <Link
            href="/today?mode=short"
            className="mt-3 inline-block rounded-full bg-white/25 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/35"
          >
            ⏱️ ¿Poco tiempo? Sesión corta (~15 min)
          </Link>
          <p className="mt-4 mb-2 text-xs text-brand-100">
            {doneToday
              ? "Hazlo de nuevo por partes si quieres repasar:"
              : "O entra directo a una parte (cada bloque que completes queda marcado ✓):"}
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {SECTION_CHIPS.map((c) => {
              const done = sectionDone.has(c.key);
              return (
                <Link
                  key={c.key}
                  href={`/today?section=${c.key}`}
                  className={`rounded-full px-3 py-1.5 transition-colors ${
                    done ? "bg-white/35 font-medium" : "bg-white/15 hover:bg-white/25"
                  }`}
                >
                  {done ? "✓ " : ""}
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Examen de avance disponible */}
        {checkpointPending && (
          <Link
            href="/checkpoint"
            className="mb-6 flex items-center justify-between gap-3 rounded-2xl bg-indigo-600 p-5 text-white shadow-lg transition-transform hover:scale-[1.01]"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-200">
                📋 Examen de avance #{checkpointMilestone}
              </p>
              <h2 className="mt-1 text-lg font-bold">¡Verifica lo que aprendiste!</h2>
              <p className="text-sm text-indigo-100">
                Repasa la gramática de los últimos días. Necesitas 70% para aprobar.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">Presentar →</span>
          </Link>
        )}

        {/* Progreso: palabras + errores + repasos */}
        <div className="mb-4 grid gap-4 sm:grid-cols-3">
          <div className="card">
            <p className="text-sm text-slate-500">Palabras aprendidas</p>
            <p className="text-3xl font-bold text-brand-600">{stats.wordsLearned}</p>
          </div>
          <Link
            href="/mistakes"
            className={`card transition-colors hover:border-brand-400 ${stats.mistakesPending > 0 ? "ring-1 ring-amber-300" : ""}`}
          >
            <p className="text-sm text-slate-500">Errores por repasar</p>
            <p className="text-3xl font-bold text-amber-600">{stats.mistakesPending}</p>
          </Link>
          <Link
            href="/review"
            className={`card transition-colors hover:border-brand-400 ${data.dueCount > 0 ? "ring-1 ring-brand-300" : ""}`}
          >
            <p className="text-sm text-slate-500">Repasos de hoy</p>
            <p className="text-3xl font-bold text-brand-600">{data.dueCount}</p>
          </Link>
        </div>

        {/* Calendario de constancia */}
        <div className="mb-6 card">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-500">Tu constancia</p>
              <p className="text-2xl font-bold">
                {data.streakCount} <span className="text-base font-normal">días de racha 🔥</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Últimas 2 semanas</p>
              <p className="text-lg font-semibold">{studied14}/14 días</p>
              <p className="mt-0.5 text-xs text-sky-500" title="Protegen tu racha si faltas un día">
                ❄️ {progress.streakFreezes} protección{progress.streakFreezes === 1 ? "" : "es"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {last14.map((d) => (
              <div key={d.key} className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] text-slate-400">{d.dow}</span>
                <div
                  title={d.key}
                  className={`flex h-7 w-7 items-center justify-center rounded text-[11px] ${
                    d.studied
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                  } ${d.today ? "ring-2 ring-brand-500 ring-offset-1 dark:ring-offset-slate-900" : ""}`}
                >
                  {d.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {doneToday
              ? "✓ Hoy ya estudiaste. ¡Sigue así para no romper tu racha!"
              : "Hoy aún no estudias. Completa tu sesión para sumar el día 🟩"}
          </p>
        </div>

        {/* Resumen de la semana */}
        <div className="mb-6 card">
          <p className="mb-3 text-sm font-semibold">📈 Tu semana</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold text-brand-600">{weekly.daysThisWeek}</p>
              <p className="text-xs text-slate-500">días estudiados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{weekly.wordsThisWeek}</p>
              <p className="text-xs text-slate-500">palabras nuevas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{weekly.checkpointsThisWeek}</p>
              <p className="text-xs text-slate-500">exámenes aprobados</p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            {weekly.daysThisWeek >= 5
              ? "🔥 ¡Semana excelente! Vas muy constante."
              : weekly.daysThisWeek >= 1
                ? "Buen avance. Intenta estudiar un día más esta semana."
                : "Empieza tu semana con una sesión de hoy. 💪"}
          </p>
        </div>

        {/* Más práctica */}
        <h2 className="mb-2 text-lg font-semibold">Más práctica</h2>
        <div className="mb-6 grid gap-2 sm:grid-cols-2">
          <Link href="/plan" className="card !p-4 transition-colors hover:border-brand-400">🎯 Plan hacia mi examen</Link>
          <Link href="/progress" className="card !p-4 transition-colors hover:border-brand-400">📊 Mi progreso y debilidades</Link>
          <Link href="/practice/adaptive" className="card !p-4 transition-colors hover:border-brand-400">🧠 Repaso inteligente</Link>
          <Link href="/reading" className="card !p-4 transition-colors hover:border-brand-400">📚 Biblioteca de lecturas</Link>
          <Link href="/practice/conversation" className="card !p-4 transition-colors hover:border-brand-400">💬 Conversación</Link>
          <Link href="/practice/speaking" className="card !p-4 transition-colors hover:border-brand-400">🎤 Pronunciación</Link>
          <Link href="/practice/free-talk" className="card !p-4 transition-colors hover:border-brand-400">🗣️ Conversación libre</Link>
          <Link href="/practice/writing" className="card !p-4 transition-colors hover:border-brand-400">✍️ Escritura (con revisión)</Link>
          <Link href="/videos" className="card !p-4 transition-colors hover:border-brand-400">🎬 Videos y escucha</Link>
          <Link href="/grammar" className="card !p-4 transition-colors hover:border-brand-400">📖 Biblioteca de gramática</Link>
          <Link href="/dictionary" className="card !p-4 transition-colors hover:border-brand-400">📒 Mi diccionario</Link>
          <Link href="/achievements" className="card !p-4 transition-colors hover:border-brand-400">🏆 Mis logros</Link>
          <Link href="/leaderboard" className="card !p-4 transition-colors hover:border-brand-400">👥 Tabla de avance</Link>
          <Link href="/certificate" className="card !p-4 transition-colors hover:border-brand-400">🏅 Mi certificado</Link>
          <Link href="/settings" className="card !p-4 transition-colors hover:border-brand-400">⚙️ Ajustes y recordatorio</Link>
        </div>

        {/* Acceso al modo TOEFL (separado) */}
        <Link
          href="/toefl"
          className="card flex items-center justify-between transition-colors hover:border-brand-400"
        >
          <div>
            <p className="font-semibold">🎓 Modo TOEFL — examen de puntaje</p>
            <p className="text-sm text-slate-500">
              Mide tu puntaje ITP estimado y presenta exámenes de nivel. Opcional.
            </p>
          </div>
          <span className="text-brand-600">→</span>
        </Link>

        <div className="mt-6 text-center">
          <Link
            href="/placement"
            className="text-sm text-slate-400 hover:text-brand-600 hover:underline"
          >
            Repetir evaluación diagnóstica
          </Link>
        </div>
      </main>
    </div>
  );
}
