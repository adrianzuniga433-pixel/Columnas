// Lógica de niveles, bandas MCER y conversión de desempeño a puntaje ITP.
// Contenido original; NO reproduce materiales oficiales de ETS.

export type Area = "listening" | "structure" | "reading" | "vocab";

export const AREA_LABELS: Record<Area, string> = {
  listening: "Listening",
  structure: "Structure & Written Expression",
  reading: "Reading",
  vocab: "Vocabulario",
};

export const GOAL_SCORE = 400;
export const ITP_MIN = 310;
export const ITP_MAX = 677;
export const PASS_THRESHOLD = 0.7;

export interface LevelDef {
  level: number;
  name: string;
  bandLabel: string;
  cefr: string;
  focus: string;
  // Rango de puntaje ITP que representa el nivel
  itpFrom: number;
  itpTo: number;
}

export const LEVELS: LevelDef[] = [
  {
    level: 1,
    name: "Fundamentos",
    bandLabel: "~310–336",
    cefr: "A1",
    focus:
      "Alfabeto fonético práctico, vocabulario esencial (números, familia, rutinas), verbo to be, presente simple, artículos y pronombres.",
    itpFrom: 310,
    itpTo: 336,
  },
  {
    level: 2,
    name: "Básico",
    bandLabel: "~337–390",
    cefr: "A2 inicial",
    focus:
      "Presente continuo, pasado simple, sustantivos contables/incontables, preposiciones de tiempo y lugar, vocabulario de alta frecuencia.",
    itpFrom: 337,
    itpTo: 390,
  },
  {
    level: 3,
    name: "Pre-intermedio",
    bandLabel: "~391–430 (META 400)",
    cefr: "A2 consolidado",
    focus:
      "Futuro (will/going to), comparativos y superlativos, presente perfecto, conectores, lectura de textos cortos y listening de conversaciones.",
    itpFrom: 391,
    itpTo: 430,
  },
  {
    level: 4,
    name: "Intermedio bajo",
    bandLabel: "~431–490",
    cefr: "A2 alto / B1 inicial",
    focus:
      "Condicionales 0 y 1, voz pasiva básica, reported speech simple, lectura académica breve y errores estructurales finos.",
    itpFrom: 431,
    itpTo: 490,
  },
  {
    level: 5,
    name: "Intermedio",
    bandLabel: "~491–542",
    cefr: "B1",
    focus:
      "Tiempos perfectos, condicionales 2, cláusulas relativas, textos académicos largos y listening de charlas.",
    itpFrom: 491,
    itpTo: 542,
  },
];

export function getLevel(level: number): LevelDef {
  return LEVELS.find((l) => l.level === level) ?? LEVELS[0];
}

export interface CefrBand {
  label: string;
  from: number;
  to: number;
}

// Equivalencias MCER indicadas en el objetivo del proyecto.
export const CEFR_BANDS: CefrBand[] = [
  { label: "A1 / pre-A2", from: 310, to: 336 },
  { label: "A2", from: 337, to: 459 },
  { label: "B1", from: 460, to: 542 },
  { label: "B2", from: 543, to: 626 },
  { label: "C1", from: 627, to: 677 },
];

export function cefrForScore(score: number): string {
  for (const band of CEFR_BANDS) {
    if (score >= band.from && score <= band.to) return band.label;
  }
  return score < 310 ? "A1 / pre-A2" : "C1";
}

/**
 * Convierte un porcentaje de acierto (0..1) a un puntaje ITP estimado dentro
 * del rango del nivel en el que se desempeñó. Se usa para los exámenes de nivel.
 */
export function scoreToItpInLevel(level: number, ratio: number): number {
  const def = getLevel(level);
  const clamped = Math.max(0, Math.min(1, ratio));
  return Math.round(def.itpFrom + (def.itpTo - def.itpFrom) * clamped);
}

/**
 * Tabla de conversión simple para la prueba diagnóstica.
 * Mapea el porcentaje de aciertos a un puntaje ITP estimado y a un nivel (1-5).
 * Es deliberadamente sencilla (no IRT); ubica al usuario en bloques.
 */
export interface PlacementOutcome {
  estimatedItpScore: number;
  placedLevel: number;
  cefr: string;
  rationale: string;
}

export function placementFromRatio(ratio: number): PlacementOutcome {
  const pct = Math.round(ratio * 100);
  let placedLevel: number;
  let estimatedItpScore: number;

  if (ratio < 0.25) {
    placedLevel = 1;
    estimatedItpScore = 320;
  } else if (ratio < 0.45) {
    placedLevel = 2;
    estimatedItpScore = 360;
  } else if (ratio < 0.65) {
    placedLevel = 3;
    estimatedItpScore = 405;
  } else if (ratio < 0.82) {
    placedLevel = 4;
    estimatedItpScore = 455;
  } else {
    placedLevel = 5;
    estimatedItpScore = 510;
  }

  const def = getLevel(placedLevel);
  const rationale =
    `Acertaste el ${pct}% de la diagnóstica. Ese desempeño corresponde a un nivel ` +
    `${def.cefr} (≈ ${estimatedItpScore} en el TOEFL ITP), por lo que empiezas en el ` +
    `Nivel ${placedLevel} — ${def.name}. ${
      estimatedItpScore >= GOAL_SCORE
        ? "Ya estás cerca o por encima de la meta de 400; reforzaremos para asegurarla."
        : "Desde aquí avanzarás de forma progresiva hasta superar la meta de 400."
    }`;

  return {
    estimatedItpScore,
    placedLevel,
    cefr: def.cefr,
    rationale,
  };
}

// ----- Puntaje escalado del simulacro completo (estilo TOEFL ITP) -----
// El ITP entrega 3 subpuntajes (uno por sección) en un rango de 31 a 68, y el
// puntaje final = (suma de los 3 subpuntajes) × 10 / 3, dentro de 310–677.
// Réplica del método de cálculo; NO usa tablas oficiales de ETS.

export const SCALED_MIN = 31;
export const SCALED_MAX = 68;

/** Las 3 secciones del examen ITP (vocabulario se integra en reading). */
export type MockSection = "listening" | "structure" | "reading";

export const MOCK_SECTION_LABELS: Record<MockSection, string> = {
  listening: "Section 1 — Listening Comprehension",
  structure: "Section 2 — Structure & Written Expression",
  reading: "Section 3 — Reading Comprehension",
};

/** Convierte el % de acierto (0..1) de una sección a su subpuntaje escalado. */
export function scaledSubscore(ratio: number): number {
  const clamped = Math.max(0, Math.min(1, ratio));
  return Math.round(SCALED_MIN + (SCALED_MAX - SCALED_MIN) * clamped);
}

/** Combina los subpuntajes de sección en el puntaje ITP total (310–677). */
export function mockTotalScore(subscores: number[]): number {
  if (subscores.length === 0) return ITP_MIN;
  const sum = subscores.reduce((a, b) => a + b, 0);
  const total = Math.round((sum * 10) / subscores.length);
  return Math.max(ITP_MIN, Math.min(ITP_MAX, total));
}

/** Progreso (0..1) del puntaje estimado hacia la meta de 400, anclado en ITP_MIN. */
export function progressToGoal(estimatedScore: number): number {
  const span = GOAL_SCORE - ITP_MIN;
  const val = (estimatedScore - ITP_MIN) / span;
  return Math.max(0, Math.min(1, val));
}
