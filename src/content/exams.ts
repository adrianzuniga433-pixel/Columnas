import type { LevelExamDef } from "./types";
import { PASS_THRESHOLD } from "@/lib/itp";

// Exámenes de fin de nivel. Mezclan las tres secciones del ITP.
// Contenido original que imita formato y nivel; NO reproduce material de ETS.

export const levelExams: LevelExamDef[] = [
  {
    level: 1,
    title: "Examen de nivel 1 — Fundamentos",
    passThreshold: PASS_THRESHOLD,
    items: [
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Elige la opción correcta.",
          sentence: "We ___ engineers.",
          options: ["am", "is", "are", "be"],
          answerIndex: 2,
          explanation: "Con 'we' se usa 'are'.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Elige el artículo correcto.",
          sentence: "I bought ___ orange.",
          options: ["a", "an", "the", "—"],
          answerIndex: 1,
          explanation: "'orange' empieza con sonido vocal: 'an'.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "He", label: "A" },
            { text: "are", label: "B" },
            { text: "a good", label: "C" },
            { text: "teacher.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "Con 'he' se usa 'is', no 'are'.",
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Maria",
          passage:
            "Maria is from Italy. She is a nurse. She has one brother and two sisters. She likes coffee and books.",
          questions: [
            {
              prompt: "What is Maria's job?",
              options: ["Teacher", "Nurse", "Doctor", "Engineer"],
              answerIndex: 1,
              explanation: "'She is a nurse.'",
            },
            {
              prompt: "How many sisters does she have?",
              options: ["One", "Two", "Three", "None"],
              answerIndex: 1,
              explanation: "'two sisters.'",
            },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "En una tienda.",
          script:
            "Hello, how much is this book? It is five dollars. OK, I will take it. Thank you.",
          questions: [
            {
              prompt: "How much is the book?",
              options: ["Two dollars", "Five dollars", "Ten dollars", "Fifteen dollars"],
              answerIndex: 1,
              explanation: "'It is five dollars.'",
            },
          ],
        },
      },
    ],
  },
  {
    level: 2,
    title: "Examen de nivel 2 — Básico",
    passThreshold: PASS_THRESHOLD,
    items: [
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Pasado simple: elige la opción.",
          sentence: "She ___ a great movie last night.",
          options: ["watch", "watched", "watches", "watching"],
          answerIndex: 1,
          explanation: "Regular: 'watched'.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Presente continuo: elige la opción.",
          sentence: "They ___ studying right now.",
          options: ["is", "am", "are", "be"],
          answerIndex: 2,
          explanation: "'they' + are + studying.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "I was born", label: "A" },
            { text: "on", label: "B" },
            { text: "1990", label: "C" },
            { text: "in Madrid.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "Con años se usa 'in', no 'on'.",
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "The new gym",
          passage:
            "A new gym opened near my house. It is open from 6 a.m. to 10 p.m. The first month is free for students. I usually go in the morning before work.",
          questions: [
            {
              prompt: "When does the gym open?",
              options: ["At 6 a.m.", "At 10 a.m.", "At noon", "At 6 p.m."],
              answerIndex: 0,
              explanation: "'open from 6 a.m.'",
            },
            {
              prompt: "Who gets the first month free?",
              options: ["Everyone", "Students", "Workers", "Children"],
              answerIndex: 1,
              explanation: "'free for students.'",
            },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Pidiendo direcciones.",
          script:
            "Excuse me, where is the station? Go straight and turn left at the bank. It is about five minutes away.",
          questions: [
            {
              prompt: "Where should you turn left?",
              options: ["At the park", "At the bank", "At the station", "At the school"],
              answerIndex: 1,
              explanation: "'turn left at the bank.'",
            },
          ],
        },
      },
    ],
  },
  {
    level: 3,
    title: "Examen de nivel 3 — Pre-intermedio (META 400)",
    passThreshold: PASS_THRESHOLD,
    items: [
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Futuro: elige la opción.",
          sentence: "I think it ___ be a good year.",
          options: ["will", "is going", "going to", "wills"],
          answerIndex: 0,
          explanation: "Predicción/opinión: 'will be'.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Presente perfecto: elige la opción.",
          sentence: "We have ___ in this city for five years.",
          options: ["live", "lived", "living", "lives"],
          answerIndex: 1,
          explanation: "have + participio 'lived'.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "This problem is", label: "A" },
            { text: "more difficult", label: "B" },
            { text: "that", label: "C" },
            { text: "the last one.", label: "D" },
          ],
          answerLabel: "C",
          explanation: "El comparativo usa 'than', no 'that'.",
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Recycling",
          passage:
            "Recycling helps reduce waste and saves energy. When we recycle paper, fewer trees are cut down. However, recycling only works if people separate their waste correctly. Therefore, many cities provide different bins for paper, plastic, and glass.",
          questions: [
            {
              prompt: "What is the main idea?",
              options: [
                "Recycling is useless",
                "Recycling helps but needs correct sorting",
                "Trees are not important",
                "Cities have no bins",
              ],
              answerIndex: 1,
              explanation: "El texto explica beneficios y la condición de separar bien.",
            },
            {
              prompt: "Which word introduces a condition/contrast?",
              options: ["Therefore", "However", "And", "Because"],
              answerIndex: 1,
              explanation: "'However' marca el contraste.",
            },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Conversación sobre planes.",
          script:
            "Have you finished the report? Almost. I have written the introduction, but I haven't done the conclusion yet. I will finish it tonight.",
          questions: [
            {
              prompt: "What part is not finished?",
              options: ["The introduction", "The conclusion", "The title", "Everything"],
              answerIndex: 1,
              explanation: "'I haven't done the conclusion yet.'",
            },
          ],
        },
      },
    ],
  },
  {
    level: 4,
    title: "Examen de nivel 4 — Intermedio bajo",
    passThreshold: PASS_THRESHOLD,
    items: [
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Condicional 1: elige la opción.",
          sentence: "If you mix blue and yellow, you ___ green.",
          options: ["will get", "get", "got", "would get"],
          answerIndex: 1,
          explanation: "Verdad general (condicional 0): presente 'get'.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "The results", label: "A" },
            { text: "was", label: "B" },
            { text: "published", label: "C" },
            { text: "last month.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "'results' es plural: 'were published'.",
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Electric cars",
          passage:
            "Electric cars are becoming more popular because they produce no exhaust emissions. Although they are still more expensive than gasoline cars, their running costs are lower. As charging stations become more common, more people are willing to switch.",
          questions: [
            {
              prompt: "Why are electric cars becoming popular?",
              options: [
                "They are cheaper to buy",
                "They produce no exhaust emissions",
                "They are slower",
                "They need no charging",
              ],
              answerIndex: 1,
              explanation: "'they produce no exhaust emissions.'",
            },
          ],
        },
      },
    ],
  },
  {
    level: 5,
    title: "Examen de nivel 5 — Intermedio",
    passThreshold: PASS_THRESHOLD,
    items: [
      {
        area: "structure",
        question: {
          kind: "mcq",
          prompt: "Condicional 2: elige la opción.",
          sentence: "If I were you, I ___ accept the offer.",
          options: ["will", "would", "am going to", "did"],
          answerIndex: 1,
          explanation: "Condicional 2: would + verbo.",
        },
      },
      {
        area: "structure",
        question: {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "The scientist", label: "A" },
            { text: "which", label: "B" },
            { text: "discovered it", label: "C" },
            { text: "won a prize.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "Para personas se usa 'who', no 'which'.",
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Mini-charla.",
          script:
            "Researchers found that people who take short breaks while studying remember more than those who study for hours without stopping.",
          questions: [
            {
              prompt: "What helps people remember more?",
              options: [
                "Studying for hours without stopping",
                "Taking short breaks while studying",
                "Never studying",
                "Studying only at night",
              ],
              answerIndex: 1,
              explanation: "'people who take short breaks ... remember more.'",
            },
          ],
        },
      },
    ],
  },
];
