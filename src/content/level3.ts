import type { LessonDef, SeedSrsItem } from "./types";

// NIVEL 3 — Pre-intermedio (A2 consolidado). META 400. Contenido original.

export const level3Lessons: LessonDef[] = [
  {
    id: "l3-grammar-future",
    level: 3,
    order: 1,
    title: "Futuro: will y going to",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "Usa 'will' para decisiones del momento y predicciones; 'going to' para planes ya decididos. Will + verbo base; be going to + verbo base.",
        examples: [
          { en: "I will call you later.", es: "Te llamaré más tarde." },
          { en: "We are going to travel in July.", es: "Vamos a viajar en julio." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Elige la mejor opción.",
          sentence: "Look at those clouds! It ___ rain.",
          options: ["will", "is going to", "go to", "wills"],
          answerIndex: 1,
          explanation: "Hay evidencia presente (las nubes), así que se prefiere 'is going to rain'.",
        },
        {
          kind: "mcq",
          prompt: "Elige la mejor opción.",
          sentence: "The phone is ringing. I ___ answer it.",
          options: ["am going to", "will", "going to", "am will"],
          answerIndex: 1,
          explanation: "Es una decisión espontánea, por eso 'will answer'.",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "Next year we", label: "A" },
            { text: "are going", label: "B" },
            { text: "to opening", label: "C" },
            { text: "a new office.", label: "D" },
          ],
          answerLabel: "C",
          explanation: "Después de 'going to' va el verbo en forma base: 'to open', no 'to opening'.",
        },
      ],
    },
  },
  {
    id: "l3-grammar-comparatives",
    level: 3,
    order: 2,
    title: "Comparativos y superlativos",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "Adjetivos cortos: -er / -est (fast → faster → the fastest). Largos: more / the most (more important). Irregulares: good → better → the best.",
        examples: [
          { en: "This car is faster than that one.", es: "Este carro es más rápido que aquel." },
          { en: "It is the most important step.", es: "Es el paso más importante." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Completa el comparativo.",
          sentence: "My new phone is ___ than the old one.",
          options: ["good", "better", "best", "more good"],
          answerIndex: 1,
          explanation: "'good' es irregular: comparativo 'better'.",
        },
        {
          kind: "mcq",
          prompt: "Completa el superlativo.",
          sentence: "This is ___ building in the city.",
          options: ["the tallest", "the most tall", "taller", "tallest"],
          answerIndex: 0,
          explanation: "Adjetivo corto: superlativo 'the tallest'.",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "This exercise is", label: "A" },
            { text: "more easier", label: "B" },
            { text: "than", label: "C" },
            { text: "the last one.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "No se combinan 'more' y '-er'. Debe ser solo 'easier'.",
        },
      ],
    },
  },
  {
    id: "l3-grammar-present-perfect",
    level: 3,
    order: 3,
    title: "Presente perfecto (have/has + participio)",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "El presente perfecto conecta el pasado con el presente: have/has + participio. Se usa con experiencias y acciones recientes (already, yet, ever, never, just).",
        examples: [
          { en: "I have finished the report.", es: "He terminado el informe." },
          { en: "She has never been to London.", es: "Ella nunca ha estado en Londres." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Completa con presente perfecto.",
          sentence: "I ___ already eaten lunch.",
          options: ["have", "has", "am", "did"],
          answerIndex: 0,
          explanation: "Con 'I' se usa 'have' + participio: have eaten.",
        },
        {
          kind: "mcq",
          prompt: "Completa con el participio correcto.",
          sentence: "She has ___ the book three times.",
          options: ["read", "readed", "reads", "reading"],
          answerIndex: 0,
          explanation: "El participio de 'read' es 'read' (no cambia de forma escrita).",
        },
        {
          kind: "order-words",
          prompt: "Ordena la oración.",
          words: ["have", "We", "the", "finished", "project"],
          correct: "We have finished the project",
          translationEs: "Hemos terminado el proyecto.",
        },
      ],
    },
  },
  {
    id: "l3-vocab-connectors",
    level: 3,
    order: 4,
    title: "Conectores y vocabulario académico",
    area: "vocab",
    type: "flashcards",
    content: {
      intro: {
        explanationEs:
          "Los conectores unen ideas y son clave en lectura y escritura. Apréndelos con ejemplos.",
        examples: [
          { en: "It was late; however, we continued.", es: "Era tarde; sin embargo, continuamos." },
          { en: "She studied a lot; therefore, she passed.", es: "Estudió mucho; por lo tanto, aprobó." },
        ],
      },
      activities: [
        { kind: "flashcard", word: "however", meaning: "sin embargo", example: "It is hard; however, it is possible.", exampleEs: "Es difícil; sin embargo, es posible." },
        { kind: "flashcard", word: "therefore", meaning: "por lo tanto", example: "He was sick; therefore, he stayed home.", exampleEs: "Estaba enfermo; por lo tanto, se quedó en casa." },
        { kind: "flashcard", word: "because", meaning: "porque", example: "I left because it was late.", exampleEs: "Me fui porque era tarde." },
        { kind: "flashcard", word: "although", meaning: "aunque", example: "Although it rained, we went out.", exampleEs: "Aunque llovió, salimos." },
        { kind: "flashcard", word: "in addition", meaning: "además", example: "In addition, prices increased.", exampleEs: "Además, los precios subieron." },
        {
          kind: "matching",
          prompt: "Empareja el conector con su significado.",
          pairs: [
            { left: "however", right: "sin embargo" },
            { left: "therefore", right: "por lo tanto" },
            { left: "although", right: "aunque" },
            { left: "in addition", right: "además" },
          ],
        },
      ],
    },
  },
  {
    id: "l3-reading-academic",
    level: 3,
    order: 5,
    title: "Lectura: texto académico corto",
    area: "reading",
    type: "reading",
    content: {
      intro: {
        explanationEs:
          "Lee el texto y busca la idea principal y los detalles. Fíjate en los conectores (however, because).",
        examples: [],
      },
      activities: [
        {
          kind: "reading",
          title: "Honey bees",
          passage:
            "Honey bees are small insects that live in large groups called colonies. Each colony has one queen, many worker bees, and some male bees. The workers collect nectar from flowers and turn it into honey. Bees are very important because they pollinate plants. However, in recent years the number of bees has decreased. Scientists believe that pesticides and the loss of flowers are the main reasons. Therefore, many countries are now trying to protect bees.",
          questions: [
            {
              prompt: "What is the main idea of the text?",
              options: [
                "Bees make too much honey",
                "Bees are important but their numbers are falling",
                "Queens do all the work",
                "Pesticides are good for bees",
              ],
              answerIndex: 1,
              explanation: "El texto destaca la importancia de las abejas y su disminución.",
            },
            {
              prompt: "Why are bees important?",
              options: ["They make colonies", "They pollinate plants", "They are small", "They have a queen"],
              answerIndex: 1,
              explanation: "'they pollinate plants.'",
            },
            {
              prompt: "What word in the text introduces a contrast?",
              options: ["Because", "Therefore", "However", "And"],
              answerIndex: 2,
              explanation: "'However' introduce el contraste sobre la disminución.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "l3-listening-conversation",
    level: 3,
    order: 6,
    title: "Listening: conversación sobre planes",
    area: "listening",
    type: "listening",
    content: {
      intro: {
        explanationEs:
          "Escucha la conversación entre dos amigos sobre el fin de semana. Repite el audio si lo necesitas.",
        examples: [],
      },
      activities: [
        {
          kind: "listening",
          scriptLabel: "Dos amigos hablan de sus planes.",
          script:
            "Hey, what are you going to do this weekend? I am going to visit my parents on Saturday. And on Sunday I will study for the English exam. That sounds good. Do you want to come to the gym with me on Sunday morning? Sure, but I have already paid for an online class at ten, so let's go at eight. Perfect, see you then.",
          questions: [
            {
              prompt: "What is the first speaker going to do on Saturday?",
              options: ["Study", "Go to the gym", "Visit his parents", "Take an online class"],
              answerIndex: 2,
              explanation: "'I am going to visit my parents on Saturday.'",
            },
            {
              prompt: "Why do they decide to go to the gym at eight?",
              options: [
                "The gym opens at eight",
                "He has already paid for an online class at ten",
                "It is cheaper",
                "His parents arrive at ten",
              ],
              answerIndex: 1,
              explanation: "'I have already paid for an online class at ten, so let's go at eight.'",
            },
          ],
        },
      ],
    },
  },
];

export const level3Srs: SeedSrsItem[] = [
  { type: "vocab", area: "vocab", front: "however", back: "sin embargo", example: "It is hard; however, it is possible.", conceptKey: "vocab:however" },
  { type: "vocab", area: "vocab", front: "therefore", back: "por lo tanto", example: "He was sick; therefore, he stayed home.", conceptKey: "vocab:therefore" },
  { type: "vocab", area: "vocab", front: "although", back: "aunque", example: "Although it rained, we went out.", conceptKey: "vocab:although" },
  { type: "vocab", area: "vocab", front: "in addition", back: "además", example: "In addition, prices increased.", conceptKey: "vocab:inaddition" },
  { type: "grammar", area: "structure", front: "Futuro con evidencia presente", back: "be going to (It is going to rain)", example: "It is going to rain.", conceptKey: "grammar:going-to" },
  { type: "grammar", area: "structure", front: "Comparativo de 'good'", back: "better", example: "better than", conceptKey: "grammar:comp-good" },
  { type: "grammar", area: "structure", front: "Presente perfecto: estructura", back: "have/has + participio", example: "I have finished.", conceptKey: "grammar:present-perfect" },
  { type: "grammar", area: "structure", front: "Superlativo de 'tall'", back: "the tallest", example: "the tallest building", conceptKey: "grammar:sup-tall" },
];
