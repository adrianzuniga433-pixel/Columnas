import type { LessonDef, SeedSrsItem } from "./types";

// NIVEL 4 — Intermedio bajo (A2 alto / B1 inicial).
// Contenido de MUESTRA, ampliable. Estructura completa y funcional.

export const level4Lessons: LessonDef[] = [
  {
    id: "l4-grammar-conditionals",
    level: 4,
    order: 1,
    title: "Condicionales 0 y 1",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "Condicional 0 (verdades generales): If + presente, presente. Condicional 1 (futuro real): If + presente, will + verbo.",
        examples: [
          { en: "If you heat ice, it melts.", es: "Si calientas el hielo, se derrite." },
          { en: "If it rains, we will stay home.", es: "Si llueve, nos quedaremos en casa." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Completa el condicional 1.",
          sentence: "If you study hard, you ___ the exam.",
          options: ["pass", "will pass", "passed", "would pass"],
          answerIndex: 1,
          explanation: "Condicional 1: If + presente, will + verbo base ('will pass').",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "If water", label: "A" },
            { text: "will reach", label: "B" },
            { text: "100 degrees,", label: "C" },
            { text: "it boils.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "Condicional 0: en la cláusula 'if' va presente, 'reaches', no 'will reach'.",
        },
      ],
    },
  },
  {
    id: "l4-grammar-passive",
    level: 4,
    order: 2,
    title: "Voz pasiva básica",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "La pasiva enfoca la acción, no quién la hace: be + participio. 'They built the bridge' → 'The bridge was built'.",
        examples: [
          { en: "The letter was sent yesterday.", es: "La carta fue enviada ayer." },
          { en: "English is spoken here.", es: "Aquí se habla inglés." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Elige la forma pasiva correcta.",
          sentence: "The report ___ by the team last week.",
          options: ["wrote", "was written", "is writing", "writes"],
          answerIndex: 1,
          explanation: "Pasado pasivo: was/were + participio ('was written').",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "The new bridge", label: "A" },
            { text: "was build", label: "B" },
            { text: "in", label: "C" },
            { text: "2019.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "La pasiva usa el participio: 'was built', no 'was build'.",
        },
      ],
    },
  },
  {
    id: "l4-reading-academic",
    level: 4,
    order: 3,
    title: "Lectura académica breve",
    area: "reading",
    type: "reading",
    content: {
      intro: {
        explanationEs: "Texto académico con vocabulario más técnico. Identifica la idea principal y la inferencia.",
        examples: [],
      },
      activities: [
        {
          kind: "reading",
          title: "Renewable energy",
          passage:
            "Renewable energy comes from natural sources that are constantly replaced, such as sunlight and wind. Unlike fossil fuels, these sources do not run out and produce very little pollution. Solar panels, for example, convert sunlight into electricity. Although the initial cost can be high, the long-term savings are significant. As technology improves, renewable energy is becoming cheaper and more widely used around the world.",
          questions: [
            {
              prompt: "According to the text, what is an advantage of renewable energy?",
              options: [
                "It is always free",
                "It produces little pollution",
                "It runs out quickly",
                "It needs no technology",
              ],
              answerIndex: 1,
              explanation: "'produce very little pollution.'",
            },
            {
              prompt: "What can be inferred about the cost of renewable energy?",
              options: [
                "It is high at first but saves money later",
                "It never changes",
                "It is always cheap",
                "It is impossible to measure",
              ],
              answerIndex: 0,
              explanation: "'the initial cost can be high, the long-term savings are significant.'",
            },
          ],
        },
      ],
    },
  },
];

export const level4Srs: SeedSrsItem[] = [
  { type: "grammar", area: "structure", front: "Condicional 1: estructura", back: "If + presente, will + verbo", example: "If it rains, we will stay.", conceptKey: "grammar:cond1" },
  { type: "grammar", area: "structure", front: "Voz pasiva: estructura", back: "be + participio", example: "The bridge was built.", conceptKey: "grammar:passive" },
  { type: "vocab", area: "vocab", front: "renewable", back: "renovable", example: "Renewable energy is clean.", conceptKey: "vocab:renewable" },
  { type: "vocab", area: "vocab", front: "pollution", back: "contaminación", example: "Cars cause pollution.", conceptKey: "vocab:pollution" },
];
