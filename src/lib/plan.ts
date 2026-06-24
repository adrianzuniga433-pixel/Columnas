import "server-only";
import { ensureProgress, getProgressStats } from "./progress";
import { getProgressInsights } from "./insights";
import {
  AREA_LABELS,
  GOAL_SCORE,
  ITP_MAX,
  cefrForScore,
  type Area,
} from "./itp";

const AREA_ACTION: Record<Area, { href: string; label: string }> = {
  listening: { href: "/today?section=comprension", label: "comprensión auditiva" },
  structure: { href: "/grammar", label: "gramática y estructura" },
  reading: { href: "/reading", label: "lectura" },
  vocab: { href: "/today?section=vocab", label: "vocabulario" },
};

export interface StudyPlan {
  hasPlan: boolean;
  examDate: string | null; // YYYY-MM-DD
  daysLeft: number;
  weeksLeft: number;
  current: number;
  target: number;
  cefrTarget: string;
  pointsNeeded: number;
  studyDaysLast14: number;
  gainPerWeek: number;
  projectedScore: number;
  onTrack: boolean;
  requiredDaysPerWeek: number;
  focusArea: Area | null;
  focusLabel: string | null;
  focusHref: string | null;
  message: string;
}

function dayKeyLocal(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Puntos estimados de mejora por semana según la constancia reciente.
function gainForDaysPerWeek(daysPerWeek: number): number {
  if (daysPerWeek >= 5) return 9;
  if (daysPerWeek >= 3) return 6;
  if (daysPerWeek >= 1) return 3;
  return 1;
}

export async function getStudyPlan(userId: string): Promise<StudyPlan> {
  const progress = await ensureProgress(userId);
  const stats = await getProgressStats(userId);
  const insights = await getProgressInsights(userId);

  const current = progress.estimatedItpScore;
  const target = progress.targetScore ?? GOAL_SCORE;

  // Días estudiados en las últimas 2 semanas → ritmo semanal.
  let studyDaysLast14 = 0;
  for (let k = 0; k < 14; k++) {
    const d = new Date();
    d.setDate(d.getDate() - k);
    if (stats.studyDates.has(dayKeyLocal(d))) studyDaysLast14++;
  }
  const daysPerWeek = studyDaysLast14 / 2;
  const gainPerWeek = gainForDaysPerWeek(daysPerWeek);

  const examDate = progress.examDate
    ? dayKeyLocal(new Date(progress.examDate))
    : null;

  let daysLeft = 0;
  if (progress.examDate) {
    const ms = new Date(progress.examDate).getTime() - Date.now();
    daysLeft = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }
  const weeksLeft = daysLeft / 7;
  const effWeeks = Math.max(0.5, weeksLeft);

  const pointsNeeded = Math.max(0, target - current);
  const projectedScore = Math.min(
    ITP_MAX,
    Math.round(current + gainPerWeek * weeksLeft)
  );
  const onTrack = projectedScore >= target;

  // Días/semana necesarios para llegar a la meta a tiempo.
  const requiredGainPerWeek = pointsNeeded / effWeeks;
  let requiredDaysPerWeek = 0;
  if (requiredGainPerWeek <= 1) requiredDaysPerWeek = 1;
  else if (requiredGainPerWeek <= 3) requiredDaysPerWeek = 2;
  else if (requiredGainPerWeek <= 6) requiredDaysPerWeek = 4;
  else if (requiredGainPerWeek <= 9) requiredDaysPerWeek = 6;
  else requiredDaysPerWeek = 7;

  const focusArea = insights.weakestArea?.area ?? null;
  const focusLabel = focusArea ? AREA_LABELS[focusArea] : null;
  const focusHref = focusArea ? AREA_ACTION[focusArea].href : null;

  let message: string;
  if (!progress.examDate) {
    message = "Define tu fecha de examen y tu meta para ver tu plan personalizado.";
  } else if (pointsNeeded === 0) {
    message = `¡Ya superaste tu meta de ${target}! Sigue practicando para asegurarla y llegar aún más alto.`;
  } else if (onTrack) {
    message = `Vas bien encaminado: a tu ritmo actual (~${gainPerWeek} pts/semana) deberías llegar a ${projectedScore} para tu examen, por encima de tu meta de ${target}.`;
  } else if (daysLeft === 0) {
    message = "Tu examen es hoy o ya pasó. Actualiza la fecha si quieres un nuevo plan.";
  } else {
    message = `A tu ritmo actual proyectas ${projectedScore}, por debajo de tu meta de ${target}. Sube a ~${requiredDaysPerWeek} días de estudio por semana${
      focusLabel ? `, enfocándote en ${focusLabel}` : ""
    } para cerrar la brecha.`;
  }

  return {
    hasPlan: !!progress.examDate,
    examDate,
    daysLeft,
    weeksLeft: Math.round(weeksLeft * 10) / 10,
    current,
    target,
    cefrTarget: cefrForScore(target),
    pointsNeeded,
    studyDaysLast14,
    gainPerWeek,
    projectedScore,
    onTrack,
    requiredDaysPerWeek,
    focusArea,
    focusLabel,
    focusHref,
    message,
  };
}
