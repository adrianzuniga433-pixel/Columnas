// Lógica pura del avance diario y de los bloques de la sesión (sin servidor),
// para poder testearla y reutilizarla en lib/progress.ts.

// Secciones con ejercicios que pueden marcarse como hechas.
export const DAILY_SECTIONS = [
  "grammar",
  "vocab",
  "comprension",
  "conversation",
  "pronunciation",
] as const;
export type DailySectionKey = (typeof DAILY_SECTIONS)[number];

// Núcleo que, una vez completo, da por cerrado el día y lo avanza.
export const CORE_SECTIONS: DailySectionKey[] = ["grammar", "vocab", "comprension"];

export function isKnownSection(s: string): s is DailySectionKey {
  return (DAILY_SECTIONS as readonly string[]).includes(s);
}

/**
 * El avance se acredita por día COMPLETADO (no por día calendario): un día solo
 * se acredita si aún no estaba completado.
 */
export function dayAlreadyCredited(
  studyDay: number,
  lastCompletedDay: number
): boolean {
  return studyDay <= lastCompletedDay;
}

/** ¿Las secciones núcleo (gramática + vocabulario + comprensión) están hechas? */
export function coreComplete(done: Iterable<string>): boolean {
  const set = new Set(done);
  return CORE_SECTIONS.every((s) => set.has(s));
}
