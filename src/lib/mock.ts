import { levelExams } from "@/content";
import type { ExamItem } from "@/content/types";
import type { Area, MockSection } from "@/lib/itp";

// Construye el simulacro completo agrupando preguntas de los exámenes de los
// 5 niveles en las 3 secciones oficiales. Es DETERMINISTA (sin mezcla
// aleatoria) para que la página que lo muestra y la API que lo califica
// generen exactamente el mismo orden de ítems.

// Vocabulario se evalúa dentro de Reading en el ITP.
function sectionOf(area: Area): MockSection {
  if (area === "listening") return "listening";
  if (area === "structure") return "structure";
  return "reading";
}

// Tope de ítems por sección para que el simulacro sea exigente pero abarcable.
const SECTION_CAPS: Record<MockSection, number> = {
  listening: 8,
  structure: 16,
  reading: 8,
};

const SECTION_ORDER: MockSection[] = ["listening", "structure", "reading"];

export interface MockSectionPool {
  section: MockSection;
  items: ExamItem[];
}

/** Devuelve los ítems del simulacro agrupados por sección, en orden fijo. */
export function buildMockPool(): MockSectionPool[] {
  const buckets: Record<MockSection, ExamItem[]> = {
    listening: [],
    structure: [],
    reading: [],
  };

  for (const exam of levelExams) {
    for (const item of exam.items) {
      buckets[sectionOf(item.area)].push(item);
    }
  }

  return SECTION_ORDER.map((section) => ({
    section,
    items: buckets[section].slice(0, SECTION_CAPS[section]),
  }));
}

/** Lista plana de ítems en el orden exacto en que se presentan/califican. */
export function flatMockItems(): ExamItem[] {
  return buildMockPool().flatMap((s) => s.items);
}

/** Cuenta cuántas preguntas (sub-preguntas incluidas) tiene un ítem. */
export function questionCount(item: ExamItem): number {
  const q = item.question;
  if (q.kind === "reading" || q.kind === "listening") return q.questions.length;
  return 1;
}

/** Total de preguntas del simulacro (para temporizador y conteo). */
export function totalMockQuestions(): number {
  return flatMockItems().reduce((n, item) => n + questionCount(item), 0);
}

// Tipos sin la clave de respuesta, para enviar al cliente.
export type SanitizedMockItem =
  | { section: MockSection; kind: "mcq"; prompt: string; sentence?: string; options: string[] }
  | {
      section: MockSection;
      kind: "error-id";
      prompt: string;
      segments: { text: string; label?: string }[];
    }
  | {
      section: MockSection;
      kind: "reading";
      title: string;
      passage: string;
      questions: { prompt: string; options: string[] }[];
    }
  | {
      section: MockSection;
      kind: "listening";
      scriptLabel?: string;
      script: string;
      questions: { prompt: string; options: string[] }[];
    };

/** Quita las respuestas correctas antes de mandar el ítem al navegador. */
export function sanitizeMockItem(item: ExamItem): SanitizedMockItem {
  const section = sectionOf(item.area);
  const q = item.question;
  if (q.kind === "mcq") {
    return { section, kind: "mcq", prompt: q.prompt, sentence: q.sentence, options: q.options };
  }
  if (q.kind === "error-id") {
    return { section, kind: "error-id", prompt: q.prompt, segments: q.segments };
  }
  if (q.kind === "reading") {
    return {
      section,
      kind: "reading",
      title: q.title,
      passage: q.passage,
      questions: q.questions.map((x) => ({ prompt: x.prompt, options: x.options })),
    };
  }
  return {
    section,
    kind: "listening",
    scriptLabel: q.scriptLabel,
    script: q.script,
    questions: q.questions.map((x) => ({ prompt: x.prompt, options: x.options })),
  };
}
