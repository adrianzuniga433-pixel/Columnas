/**
 * Tests de lógica (no de contenido). Cubren las funciones puras del negocio:
 * puntaje ITP, repetición espaciada (SRS), proyección del plan y rotación de la
 * sesión diaria. Corre con `npm test` (tsx, sin dependencias extra).
 */
import {
  scoreToItpInLevel,
  scaledSubscore,
  mockTotalScore,
  cefrForScore,
  placementFromRatio,
  progressToGoal,
  getLevel,
  ITP_MIN,
  ITP_MAX,
} from "../src/lib/itp";
import { reviewItem, interleave, SRS_INTERVALS } from "../src/lib/srs";
import {
  gainForDaysPerWeek,
  projectScore,
  requiredDaysPerWeek,
} from "../src/lib/planMath";
import { pickStride, pickQuestionWindow } from "../src/content/daily";

let passed = 0;
const failures: string[] = [];

function eq(actual: unknown, expected: unknown, msg: string) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) passed++;
  else failures.push(`${msg}: esperado ${JSON.stringify(expected)}, obtuve ${JSON.stringify(actual)}`);
}
function ok(cond: boolean, msg: string) {
  if (cond) passed++;
  else failures.push(msg);
}
function near(actual: number, expected: number, tol: number, msg: string) {
  if (Math.abs(actual - expected) <= tol) passed++;
  else failures.push(`${msg}: esperado ~${expected} (±${tol}), obtuve ${actual}`);
}

// ===================== Puntaje ITP =====================

eq(getLevel(3).itpFrom, 391, "getLevel(3).itpFrom");
eq(getLevel(3).itpTo, 430, "getLevel(3).itpTo");
eq(scoreToItpInLevel(3, 0), 391, "scoreToItpInLevel min");
eq(scoreToItpInLevel(3, 1), 430, "scoreToItpInLevel max");
eq(scoreToItpInLevel(3, -5), 391, "scoreToItpInLevel clamp inferior");
eq(scoreToItpInLevel(3, 9), 430, "scoreToItpInLevel clamp superior");
ok(scoreToItpInLevel(3, 0.5) > 391 && scoreToItpInLevel(3, 0.5) < 430, "scoreToItpInLevel intermedio");

eq(scaledSubscore(0), 31, "scaledSubscore(0)");
eq(scaledSubscore(1), 68, "scaledSubscore(1)");
near(scaledSubscore(0.5), 50, 1, "scaledSubscore(0.5)");

eq(mockTotalScore([31, 31, 31]), 310, "mockTotalScore mínimo");
eq(mockTotalScore([68, 68, 68]), ITP_MAX, "mockTotalScore tope (cap 677)");
eq(mockTotalScore([]), ITP_MIN, "mockTotalScore vacío");
ok(mockTotalScore([50, 50, 50]) >= ITP_MIN && mockTotalScore([50, 50, 50]) <= ITP_MAX, "mockTotalScore en rango");

eq(cefrForScore(336), "A1 / pre-A2", "cefr 336");
eq(cefrForScore(337), "A2", "cefr 337");
eq(cefrForScore(459), "A2", "cefr 459");
eq(cefrForScore(460), "B1", "cefr 460");
eq(cefrForScore(543), "B2", "cefr 543");
eq(cefrForScore(627), "C1", "cefr 627");
eq(cefrForScore(200), "A1 / pre-A2", "cefr bajo");
eq(cefrForScore(700), "C1", "cefr alto");

eq(placementFromRatio(0.1).placedLevel, 1, "placement nivel 1");
eq(placementFromRatio(0.3).placedLevel, 2, "placement nivel 2");
eq(placementFromRatio(0.5).placedLevel, 3, "placement nivel 3");
eq(placementFromRatio(0.7).placedLevel, 4, "placement nivel 4");
eq(placementFromRatio(0.95).placedLevel, 5, "placement nivel 5");
ok(placementFromRatio(0.5).estimatedItpScore >= 391, "placement score coherente");

eq(progressToGoal(310), 0, "progressToGoal mínimo");
eq(progressToGoal(400), 1, "progressToGoal meta");
near(progressToGoal(355), 0.5, 0.02, "progressToGoal medio");
eq(progressToGoal(500), 1, "progressToGoal clamp superior");
eq(progressToGoal(200), 0, "progressToGoal clamp inferior");

// ===================== SRS =====================

{
  const r = reviewItem({ interval: 0, easeFactor: 2.5, repetitions: 0, lapses: 0 }, true);
  eq(r.interval, SRS_INTERVALS[0], "SRS primer acierto interval=1");
  eq(r.repetitions, 1, "SRS primer acierto repetitions=1");
  ok(r.easeFactor > 2.5, "SRS acierto sube ease");
  ok(r.nextReviewAt instanceof Date && r.nextReviewAt.getTime() > Date.now(), "SRS próximo repaso en el futuro");
}
{
  // Avance por la escala fija.
  const r2 = reviewItem({ interval: 1, easeFactor: 2.5, repetitions: 1, lapses: 0 }, true);
  eq(r2.interval, SRS_INTERVALS[1], "SRS segundo acierto interval=3");
  const r5 = reviewItem({ interval: 16, easeFactor: 2.5, repetitions: 4, lapses: 0 }, true);
  eq(r5.interval, SRS_INTERVALS[4], "SRS quinto acierto interval=35");
}
{
  // Más allá de la escala fija usa el factor de facilidad.
  const r6 = reviewItem({ interval: 35, easeFactor: 2.0, repetitions: 5, lapses: 0 }, true);
  eq(r6.interval, 70, "SRS más allá de la escala usa ease (35*2.0)");
}
{
  // Fallo: reinicia el ciclo, baja el ease y suma un lapse.
  const f = reviewItem({ interval: 35, easeFactor: 2.5, repetitions: 5, lapses: 0 }, false);
  eq(f.interval, SRS_INTERVALS[0], "SRS fallo reinicia interval");
  eq(f.repetitions, 0, "SRS fallo reinicia repetitions");
  eq(f.lapses, 1, "SRS fallo suma lapse");
  near(f.easeFactor, 2.3, 0.0001, "SRS fallo baja ease 0.2");
}
{
  const floor = reviewItem({ interval: 1, easeFactor: 1.3, repetitions: 0, lapses: 0 }, false);
  eq(floor.easeFactor, 1.3, "SRS ease no baja de 1.3");
}
{
  const items = [
    { area: "a", id: 1 }, { area: "a", id: 2 }, { area: "a", id: 3 }, { area: "b", id: 4 },
  ];
  const mixed = interleave(items);
  eq(mixed.length, items.length, "interleave preserva el número de ítems");
  eq(new Set(mixed.map((x) => x.id)).size, 4, "interleave no pierde ni duplica ítems");
  // El primer 'b' debe adelantarse (no quedar todo 'a' junto al inicio).
  ok(mixed.findIndex((x) => x.area === "b") <= 1, "interleave intercala áreas");
}

// ===================== Plan (proyección) =====================

eq(gainForDaysPerWeek(5), 9, "gain 5+ días");
eq(gainForDaysPerWeek(4), 6, "gain 3-4 días");
eq(gainForDaysPerWeek(2), 3, "gain 1-2 días");
eq(gainForDaysPerWeek(0), 1, "gain 0 días");

eq(projectScore(400, 9, 4), 436, "projectScore suma");
eq(projectScore(670, 9, 10), ITP_MAX, "projectScore acota al máximo");
eq(projectScore(400, 0, 4), 400, "projectScore sin ganancia");

eq(requiredDaysPerWeek(0, 4), 1, "required sin brecha");
eq(requiredDaysPerWeek(90, 2), 7, "required brecha grande");
eq(requiredDaysPerWeek(10, 5), 2, "required brecha pequeña");
ok(requiredDaysPerWeek(40, 5) >= 4, "required brecha media");

// ===================== Rotación (sin repetición) =====================

{
  // pickStride: días consecutivos nunca comparten elementos.
  const pool = Array.from({ length: 12 }, (_, k) => k);
  let overlap = false;
  for (let d = 0; d < 30; d++) {
    const a = new Set(pickStride(pool, d, 2));
    const b = pickStride(pool, d + 1, 2);
    if (b.some((x) => a.has(x))) overlap = true;
  }
  ok(!overlap, "pickStride: días consecutivos disjuntos");
  eq(pickStride(pool, 0, 2), [0, 1], "pickStride día 0");
  eq(pickStride(pool, 1, 2), [2, 3], "pickStride día 1");
}
{
  // pickQuestionWindow sobre banco de 9 con ventanas de 3: 3 días consecutivos
  // (como aparece una lección de gramática) son disjuntos entre sí.
  const pool = Array.from({ length: 9 }, (_, k) => k);
  let bad = false;
  for (let d = 0; d < 30; d++) {
    const w0 = new Set(pickQuestionWindow(pool, d, 3));
    const w1 = new Set(pickQuestionWindow(pool, d + 1, 3));
    const w2 = pickQuestionWindow(pool, d + 2, 3);
    if ([...w1].some((x) => w0.has(x))) bad = true;
    if (w2.some((x) => w0.has(x) || w1.has(x))) bad = true;
  }
  ok(!bad, "pickQuestionWindow: 3 días consecutivos disjuntos");
  eq(pickQuestionWindow(pool, 0, 3).length, 3, "pickQuestionWindow tamaño 3");
}

// ===================== Reporte =====================

if (failures.length > 0) {
  console.error(`\n❌ Tests de lógica: ${failures.length} fallo(s) de ${passed + failures.length}:`);
  for (const f of failures) console.error("  • " + f);
  process.exit(1);
}
console.log(`✅ Tests de lógica: ${passed} aserciones, todo correcto.`);
