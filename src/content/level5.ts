import type { LessonDef, SeedSrsItem } from "./types";

// NIVEL 5 — Intermedio (B1). Contenido de MUESTRA, ampliable.

export const level5Lessons: LessonDef[] = [
  {
    id: "l5-grammar-conditional2",
    level: 5,
    order: 1,
    title: "Condicional 2 (situaciones hipotéticas)",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "El condicional 2 expresa situaciones irreales o improbables: If + pasado simple, would + verbo base.",
        examples: [
          { en: "If I had more time, I would travel.", es: "Si tuviera más tiempo, viajaría." },
          { en: "If she were here, she would help.", es: "Si ella estuviera aquí, ayudaría." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Completa el condicional 2.",
          sentence: "If I ___ rich, I would buy a house by the sea.",
          options: ["am", "were", "will be", "have been"],
          answerIndex: 1,
          explanation: "Condicional 2: If + pasado ('were'), would + verbo.",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "If he", label: "A" },
            { text: "would know", label: "B" },
            { text: "the answer,", label: "C" },
            { text: "he would tell us.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "En la cláusula 'if' va el pasado ('knew'), no 'would know'.",
        },
      ],
    },
  },
  {
    id: "l5-grammar-relative",
    level: 5,
    order: 2,
    title: "Cláusulas relativas (who / which / that)",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "Las cláusulas relativas dan información sobre un sustantivo: who (personas), which (cosas), that (ambos).",
        examples: [
          { en: "The man who called is my boss.", es: "El hombre que llamó es mi jefe." },
          { en: "The book which I read was great.", es: "El libro que leí fue genial." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Elige el pronombre relativo correcto.",
          sentence: "The engineer ___ designed the system won an award.",
          options: ["which", "who", "where", "whose"],
          answerIndex: 1,
          explanation: "Para personas se usa 'who'.",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "The company", label: "A" },
            { text: "who", label: "B" },
            { text: "makes these phones", label: "C" },
            { text: "is very large.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "Para cosas/organizaciones se usa 'which' o 'that', no 'who'.",
        },
      ],
    },
  },
  {
    id: "l5-listening-lecture",
    level: 5,
    order: 3,
    title: "Listening: mini-charla académica",
    area: "listening",
    type: "listening",
    content: {
      intro: {
        explanationEs:
          "Escucha una breve charla académica, como en la sección de listening del ITP. Toma nota mental de la idea principal.",
        examples: [],
      },
      activities: [
        {
          kind: "listening",
          scriptLabel: "Fragmento de una clase sobre el sueño.",
          script:
            "Today we will talk about sleep. Sleep is essential for memory. While we sleep, the brain organizes the information we learned during the day. Studies show that students who sleep well before a test perform better than those who study all night. Therefore, getting enough sleep is not a waste of time; it is part of effective learning.",
          questions: [
            {
              prompt: "What is the main topic of the lecture?",
              options: [
                "How to study all night",
                "The importance of sleep for memory and learning",
                "Why tests are difficult",
                "How the brain forgets information",
              ],
              answerIndex: 1,
              explanation: "La charla trata sobre el sueño y su papel en la memoria y el aprendizaje.",
            },
            {
              prompt: "According to the lecture, students who sleep well before a test...",
              options: [
                "perform better",
                "forget everything",
                "study all night",
                "do worse",
              ],
              answerIndex: 0,
              explanation: "'students who sleep well before a test perform better.'",
            },
          ],
        },
      ],
    },
  },
];

export const level5Srs: SeedSrsItem[] = [
  { type: "grammar", area: "structure", front: "Condicional 2: estructura", back: "If + pasado, would + verbo", example: "If I had time, I would travel.", conceptKey: "grammar:cond2" },
  { type: "grammar", area: "structure", front: "Relativo para personas", back: "who", example: "The man who called.", conceptKey: "grammar:rel-who" },
  { type: "grammar", area: "structure", front: "Relativo para cosas", back: "which / that", example: "The book which I read.", conceptKey: "grammar:rel-which" },
  { type: "vocab", area: "vocab", front: "essential", back: "esencial", example: "Sleep is essential.", conceptKey: "vocab:essential" },
];
