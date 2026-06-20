import type { Area } from "@/lib/itp";

// ----- Tipos de actividad dentro de una lección -----

export interface Flashcard {
  kind: "flashcard";
  word: string; // inglés
  meaning: string; // español
  example: string; // oración de ejemplo en inglés
  exampleEs?: string; // traducción del ejemplo
}

export interface Mcq {
  kind: "mcq";
  prompt: string; // instrucción en español
  sentence?: string; // oración con hueco "___"
  options: string[];
  answerIndex: number;
  explanation: string; // feedback inmediato (por qué es la correcta / por qué no la otra)
  translationEs?: string; // traducción al español de la oración correcta
  topicTitle?: string; // tema de la pregunta (se inyecta automáticamente)
  topicWhy?: string; // breve explicación del tema y para qué sirve
}

// Identificar el error (réplica del formato Structure & Written Expression).
export interface ErrorId {
  kind: "error-id";
  prompt: string;
  // La oración se divide en segmentos; los subrayables tienen id (A, B, C, D).
  segments: { text: string; label?: string }[];
  answerLabel: string; // label del segmento incorrecto
  explanation: string;
}

export interface ReadingQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Reading {
  kind: "reading";
  title: string;
  passage: string; // texto en inglés (original)
  questions: ReadingQuestion[];
}

export interface Listening {
  kind: "listening";
  // Guion que se sintetiza con la Web Speech API (en inglés).
  script: string;
  scriptLabel?: string; // descripción en español del contexto
  questions: ReadingQuestion[];
}

export interface OrderWords {
  kind: "order-words";
  prompt: string;
  words: string[]; // desordenadas
  correct: string; // oración correcta
  translationEs: string;
}

export interface Matching {
  kind: "matching";
  prompt: string;
  pairs: { left: string; right: string }[];
}

export interface Dictation {
  kind: "dictation";
  prompt: string;
  text: string; // lo que se sintetiza y debe escribirse
  accepted: string[]; // respuestas aceptadas (normalizadas)
}

export type Activity =
  | Flashcard
  | Mcq
  | ErrorId
  | Reading
  | Listening
  | OrderWords
  | Matching
  | Dictation;

// ----- Estructura de una lección -----

export interface LessonIntro {
  explanationEs: string;
  examples: { en: string; es: string }[];
}

export interface LessonContent {
  intro?: LessonIntro;
  activities: Activity[];
}

export interface LessonDef {
  id: string;
  level: number;
  order: number;
  title: string;
  area: Area;
  type: string;
  content: LessonContent;
}

// Ítem de vocabulario/estructura que se inyecta al SRS al completar una lección.
export interface SeedSrsItem {
  type: "vocab" | "grammar";
  area: Area;
  front: string;
  back: string;
  example?: string;
  conceptKey: string;
}

// ----- Examen de nivel -----

export interface ExamItem {
  area: Area;
  // Reusa formatos de actividad evaluables.
  question: Mcq | ErrorId | Reading | Listening;
}

export interface LevelExamDef {
  level: number;
  title: string;
  passThreshold: number;
  items: ExamItem[];
}
