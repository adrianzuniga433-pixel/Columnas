// Matemática pura del plan de estudio (sin dependencias de servidor), para que
// pueda probarse con tests de lógica además de usarse en lib/plan.ts.
import { ITP_MAX } from "./itp";

// Puntos estimados de mejora por semana según la constancia reciente.
export function gainForDaysPerWeek(daysPerWeek: number): number {
  if (daysPerWeek >= 5) return 9;
  if (daysPerWeek >= 3) return 6;
  if (daysPerWeek >= 1) return 3;
  return 1;
}

/** Puntaje proyectado al día del examen, acotado al rango ITP. */
export function projectScore(
  current: number,
  gainPerWeek: number,
  weeksLeft: number
): number {
  return Math.min(ITP_MAX, Math.round(current + gainPerWeek * weeksLeft));
}

/** Días/semana de estudio necesarios para cubrir los puntos que faltan. */
export function requiredDaysPerWeek(
  pointsNeeded: number,
  effWeeks: number
): number {
  const perWeek = pointsNeeded / Math.max(0.5, effWeeks);
  if (perWeek <= 1) return 1;
  if (perWeek <= 3) return 2;
  if (perWeek <= 6) return 4;
  if (perWeek <= 9) return 6;
  return 7;
}
