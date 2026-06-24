/**
 * Validación de integridad del contenido del curso.
 *
 * Corre en cada build (antes de tocar la base de datos) y FALLA si encuentra
 * un problema: una respuesta correcta fuera de rango, opciones duplicadas, un
 * dictado cuyo texto no está entre las respuestas aceptadas, un ejercicio de
 * "ordenar" que no se puede resolver, un examen con una clave inválida, etc.
 *
 * También verifica la invariante de rotación: ningún ejercicio se repite en
 * días consecutivos de la sesión diaria.
 *
 * Uso: `tsx scripts/validateContent.ts` (o `npm run validate`).
 */
import {
  grammarLessons,
  vocabSets,
  readingTasks,
  listeningTasks,
  orderTasks,
  dictationTasks,
  productionPrompts,
  writtenExpressionTasks,
  readingTasksB1,
  listeningTasksB1,
  getDailySession,
} from "../src/content/daily";
import { levelExams } from "../src/content/exams";
import { placementItems } from "../src/content/placement";
import { dialogues } from "../src/content/dialogues";
import { allLessons } from "../src/content";

const problems: string[] = [];
const fail = (msg: string) => problems.push(msg);

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Valida un set de opciones + índice de respuesta correcta.
function checkChoices(
  tag: string,
  options: unknown,
  answerIndex: number,
  { min = 2 }: { min?: number } = {}
) {
  if (!Array.isArray(options) || options.length < min) {
    fail(`${tag}: se esperaban al menos ${min} opciones`);
    return;
  }
  if (options.some((o) => typeof o !== "string" || o.trim() === "")) {
    fail(`${tag}: hay opciones vacías o no textuales`);
  }
  if (new Set(options as string[]).size !== options.length) {
    fail(`${tag}: opciones duplicadas (${(options as string[]).join(" / ")})`);
  }
  if (
    typeof answerIndex !== "number" ||
    answerIndex < 0 ||
    answerIndex >= options.length
  ) {
    fail(`${tag}: answerIndex (${answerIndex}) fuera de rango`);
  }
}

// Valida un arreglo de preguntas tipo ReadingQuestion.
function checkQuestions(tag: string, questions: any[]) {
  if (!Array.isArray(questions) || questions.length === 0) {
    fail(`${tag}: sin preguntas`);
    return;
  }
  questions.forEach((q, qi) => {
    checkChoices(`${tag} Q${qi}`, q.options, q.answerIndex);
    if (!q.prompt || typeof q.prompt !== "string") {
      fail(`${tag} Q${qi}: falta prompt`);
    }
  });
}

// ---- 1. Lecciones de gramática (sesión diaria) ----
grammarLessons.forEach((l, li) => {
  if (!l.title) fail(`grammarLessons[${li}]: sin título`);
  if (!l.tipEs) fail(`gramática "${l.title}": sin tipEs`);
  if (!l.examples?.length) fail(`gramática "${l.title}": sin ejemplos`);
  // La rotación diaria muestra ventanas disjuntas de 3 sobre 3 días, así que
  // cada lección necesita al menos 9 preguntas para no repetir.
  if (l.practice.length < 9) {
    fail(
      `gramática "${l.title}": solo ${l.practice.length} preguntas (se necesitan ≥9 para la rotación sin repetición)`
    );
  }
  l.practice.forEach((q, qi) => {
    const tag = `gramática "${l.title}" Q${qi}`;
    checkChoices(tag, q.options, q.answerIndex, { min: 3 });
    if (!q.explanation) fail(`${tag}: sin explicación`);
  });
});

// ---- 2. Vocabulario ----
vocabSets.forEach((v, vi) => {
  if (!v.theme) fail(`vocabSets[${vi}]: sin tema`);
  if (!v.cards?.length) fail(`vocab "${v.theme}": sin tarjetas`);
  v.cards.forEach((c, ci) => {
    if (!c.word || !c.meaning) {
      fail(`vocab "${v.theme}" tarjeta ${ci}: falta word o meaning`);
    }
  });
});

// ---- 3. Lecturas ----
readingTasks.forEach((r, i) => {
  if (!r.title) fail(`readingTasks[${i}]: sin título`);
  if (!r.passage) fail(`reading "${r.title}": sin pasaje`);
  checkQuestions(`reading "${r.title}"`, r.questions);
});
const readingTitles = readingTasks.map((r) => r.title);
if (new Set(readingTitles).size !== readingTitles.length) {
  fail("readingTasks: hay títulos de lectura duplicados");
}

// Lecturas B1 (densas, nivel intermedio).
readingTasksB1.forEach((r, i) => {
  if (!r.title) fail(`readingTasksB1[${i}]: sin título`);
  if (!r.passage) fail(`reading B1 "${r.title}": sin pasaje`);
  checkQuestions(`reading B1 "${r.title}"`, r.questions);
});
const allReadingTitles = [...readingTasks, ...readingTasksB1].map((r) => r.title);
if (new Set(allReadingTitles).size !== allReadingTitles.length) {
  fail("readingTasks + B1: hay títulos de lectura duplicados entre bancos");
}

// ---- 4. Escuchas (incluye conversaciones multi-turno) ----
listeningTasks.forEach((l, i) => {
  if (!l.script) fail(`listeningTasks[${i}]: sin script`);
  checkQuestions(`listening #${i}`, l.questions);
  if (l.turns) {
    if (l.turns.length < 2) fail(`listening #${i}: turns con menos de 2 turnos`);
    l.turns.forEach((t, ti) => {
      if (!t.speaker || !t.text) {
        fail(`listening #${i} turno ${ti}: falta speaker o text`);
      }
    });
  }
});

// Escuchas B1 (charlas/discusiones largas, algunas multi-turno).
listeningTasksB1.forEach((l, i) => {
  if (!l.script) fail(`listeningTasksB1[${i}]: sin script`);
  checkQuestions(`listening B1 #${i}`, l.questions);
  if (l.turns) {
    if (l.turns.length < 2) fail(`listening B1 #${i}: turns con menos de 2 turnos`);
    l.turns.forEach((t, ti) => {
      if (!t.speaker || !t.text) {
        fail(`listening B1 #${i} turno ${ti}: falta speaker o text`);
      }
    });
  }
});

// ---- 5. Ordenar palabras (debe ser resoluble) ----
orderTasks.forEach((o, i) => {
  const fromWords = [...o.words].map(norm).sort().join("|");
  const fromCorrect = o.correct.split(/\s+/).map(norm).sort().join("|");
  if (fromWords !== fromCorrect) {
    fail(
      `orderTasks[${i}] "${o.correct}": las palabras no forman exactamente la oración correcta`
    );
  }
});

// ---- 6. Dictados (el texto debe estar entre los aceptados) ----
dictationTasks.forEach((d, i) => {
  const target = norm(d.text);
  if (!d.accepted.some((a) => norm(a) === target)) {
    fail(`dictation #${i}: el texto no está en 'accepted' → "${d.text}"`);
  }
});

// ---- 6b. Written Expression (identificar el error) ----
writtenExpressionTasks.forEach((e, i) => {
  const tag = `writtenExpression[${i}]`;
  if (!e.prompt) fail(`${tag}: sin prompt`);
  if (!e.explanation) fail(`${tag}: sin explicación`);
  const labels = e.segments.map((s) => s.label).filter(Boolean) as string[];
  if (labels.length < 2) fail(`${tag}: menos de 2 segmentos marcables`);
  if (new Set(labels).size !== labels.length) fail(`${tag}: etiquetas duplicadas`);
  if (!labels.includes(e.answerLabel)) {
    fail(`${tag}: answerLabel "${e.answerLabel}" no existe entre los segmentos`);
  }
  if (e.segments.some((s) => !s.text || s.text.trim() === "")) {
    fail(`${tag}: hay segmentos vacíos`);
  }
});

// ---- 7. Consignas de producción ----
productionPrompts.forEach((p, i) => {
  if (typeof p !== "string" || p.trim() === "") {
    fail(`productionPrompts[${i}]: vacío`);
  }
});

// ---- 8. Diálogos ----
dialogues.forEach((d, i) => {
  if (!d.id || !d.title) fail(`dialogues[${i}]: falta id o título`);
  if (!d.lines?.length || d.lines.length < 2) {
    fail(`diálogo "${d.title}": muy corto`);
  }
  d.lines?.forEach((ln, li) => {
    if (!ln.en || !ln.es || !ln.who) {
      fail(`diálogo "${d.title}" línea ${li}: falta en/es/who`);
    }
  });
});
const dialogueIds = dialogues.map((d) => d.id);
if (new Set(dialogueIds).size !== dialogueIds.length) {
  fail("dialogues: hay ids de diálogo duplicados");
}

// ---- 9. Exámenes de nivel ----
levelExams.forEach((ex) => {
  if (!ex.items?.length) fail(`${ex.title}: sin ítems`);
  ex.items.forEach((it: any, ii: number) => {
    const q = it.question;
    const tag = `${ex.title} item ${ii}`;
    if (q.kind === "mcq") {
      checkChoices(tag, q.options, q.answerIndex, { min: 3 });
    } else if (q.kind === "error-id") {
      const labels = (q.segments as any[])
        .map((s) => s.label)
        .filter(Boolean);
      if (labels.length < 2) fail(`${tag}: error-id con menos de 2 segmentos marcables`);
      if (!labels.includes(q.answerLabel)) {
        fail(`${tag}: answerLabel "${q.answerLabel}" no existe entre los segmentos`);
      }
    } else if (q.kind === "reading" || q.kind === "listening") {
      checkQuestions(tag, q.questions);
    } else {
      fail(`${tag}: tipo de pregunta desconocido (${q.kind})`);
    }
  });
});

// ---- 10. Prueba diagnóstica (placement) ----
placementItems.forEach((p, i) => {
  checkChoices(`placement "${p.id}"`, p.options, p.answerIndex, { min: 3 });
});
const placementIds = placementItems.map((p) => p.id);
if (new Set(placementIds).size !== placementIds.length) {
  fail("placementItems: hay ids duplicados");
}

// ---- 11. Actividades de las lecciones del currículo ----
allLessons.forEach((lesson) => {
  lesson.content.activities?.forEach((a: any, ai: number) => {
    const tag = `lección "${lesson.id}" act ${ai}`;
    if (a.kind === "mcq") checkChoices(tag, a.options, a.answerIndex, { min: 3 });
    if (a.kind === "reading" || a.kind === "listening") {
      checkQuestions(tag, a.questions);
    }
    if (a.kind === "order-words") {
      const fromWords = [...a.words].map(norm).sort().join("|");
      const fromCorrect = a.correct.split(/\s+/).map(norm).sort().join("|");
      if (fromWords !== fromCorrect) fail(`${tag}: 'ordenar' no resoluble`);
    }
  });
});

// ---- 12. Invariante de rotación: nada se repite en días consecutivos ----
function activityKey(a: any): string {
  switch (a.kind) {
    case "mcq": return "mcq:" + a.sentence;
    case "flashcard": return "card:" + a.word;
    case "order-words": return "order:" + a.correct;
    case "reading": return "read:" + a.title;
    case "listening": return "listen:" + (a.script || "").slice(0, 30);
    case "dictation": return "dict:" + a.text;
    case "dialogue": return "dlg:" + a.title;
    case "pronunciation": return "pron:" + a.text;
    case "error-id": return "err:" + a.segments.map((s: any) => s.text).join(" ");
    default: return a.kind;
  }
}
// Tipos que NO deben repetirse en días consecutivos (las flashcards de
// vocabulario sí pueden, como repaso intencional).
const NO_REPEAT = new Set([
  "mcq",
  "error-id",
  "order-words",
  "reading",
  "listening",
  "dictation",
  "dialogue",
  "pronunciation",
]);
// Se verifica dentro de cada etapa por separado (la etapa Intermedio, semana
// 9+, añade los bancos B1, así que el cruce de la frontera no aplica).
const ROTATION_RANGES: [number, number][] = [
  [1, 40], // etapa Básico
  [55, 90], // etapa Intermedio/avanzada (con B1)
];
for (const [from, to] of ROTATION_RANGES) {
  for (let day = from; day < to; day++) {
    const today = getDailySession(day);
    const tomorrow = getDailySession(day + 1);
    const byTypeToday: Record<string, Set<string>> = {};
    for (const a of today.activities) {
      (byTypeToday[a.kind] ||= new Set()).add(activityKey(a));
    }
    for (const a of tomorrow.activities) {
      if (!NO_REPEAT.has(a.kind)) continue;
      if (byTypeToday[a.kind]?.has(activityKey(a))) {
        fail(
          `rotación: el ejercicio "${activityKey(a)}" (${a.kind}) se repite entre el día ${day} y el ${day + 1}`
        );
      }
    }
  }
}

// ---- Reporte ----
console.log(
  `Contenido: ${grammarLessons.length} lecciones de gramática, ${writtenExpressionTasks.length} ejercicios de Written Expression, ${readingTasks.length} lecturas, ${listeningTasks.length} escuchas, ${levelExams.length} exámenes de nivel, ${placementItems.length} ítems de diagnóstico.`
);
if (problems.length > 0) {
  console.error(`\n❌ Validación de contenido: ${problems.length} problema(s):`);
  for (const p of problems) console.error("  • " + p);
  process.exit(1);
}
console.log("✅ Validación de contenido: todo correcto.");
