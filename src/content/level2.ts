import type { LessonDef, SeedSrsItem } from "./types";

// NIVEL 2 — Básico (A2 inicial). Contenido original.

export const level2Lessons: LessonDef[] = [
  {
    id: "l2-grammar-present-continuous",
    level: 2,
    order: 1,
    title: "Presente continuo (am/is/are + -ing)",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "El presente continuo describe acciones que ocurren ahora: sujeto + am/is/are + verbo-ing. Ejemplo: 'I am working'.",
        examples: [
          { en: "She is reading a book.", es: "Ella está leyendo un libro." },
          { en: "We are studying English.", es: "Estamos estudiando inglés." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Completa con la forma correcta.",
          sentence: "Look! The children ___ playing in the park.",
          options: ["is", "am", "are", "be"],
          answerIndex: 2,
          explanation: "'children' es plural, por eso 'are' + playing.",
        },
        {
          kind: "mcq",
          prompt: "Completa con la forma correcta.",
          sentence: "He ___ writing an email right now.",
          options: ["are", "is", "am", "be"],
          answerIndex: 1,
          explanation: "Con 'he' se usa 'is' + writing.",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "Right now", label: "A" },
            { text: "I", label: "B" },
            { text: "am study", label: "C" },
            { text: "for the exam.", label: "D" },
          ],
          answerLabel: "C",
          explanation: "Debe ser 'am studying' (verbo en -ing), no 'am study'.",
        },
        {
          kind: "order-words",
          prompt: "Ordena la oración.",
          words: ["is", "She", "now", "cooking", "dinner"],
          correct: "She is cooking dinner now",
          translationEs: "Ella está cocinando la cena ahora.",
        },
      ],
    },
  },
  {
    id: "l2-grammar-past-simple",
    level: 2,
    order: 2,
    title: "Pasado simple (verbos regulares e irregulares)",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "El pasado simple describe acciones terminadas. Regulares añaden -ed (worked). Irregulares cambian (go → went, have → had).",
        examples: [
          { en: "I worked yesterday.", es: "Trabajé ayer." },
          { en: "She went to the store.", es: "Ella fue a la tienda." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Completa con el pasado simple.",
          sentence: "Yesterday I ___ to the office by bus.",
          options: ["go", "went", "gone", "going"],
          answerIndex: 1,
          explanation: "'go' es irregular: su pasado es 'went'.",
        },
        {
          kind: "mcq",
          prompt: "Completa con el pasado simple.",
          sentence: "They ___ a movie last night.",
          options: ["watch", "watches", "watched", "watching"],
          answerIndex: 2,
          explanation: "'watch' es regular: pasado 'watched'.",
        },
        {
          kind: "error-id",
          prompt: "Identifica el error.",
          segments: [
            { text: "Last week she", label: "A" },
            { text: "buyed", label: "B" },
            { text: "a new", label: "C" },
            { text: "laptop.", label: "D" },
          ],
          answerLabel: "B",
          explanation: "'buy' es irregular: su pasado es 'bought', no 'buyed'.",
        },
      ],
    },
  },
  {
    id: "l2-vocab-daily-routine",
    level: 2,
    order: 3,
    title: "Vocabulario: rutina diaria y trabajo",
    area: "vocab",
    type: "flashcards",
    content: {
      intro: {
        explanationEs: "Verbos y sustantivos frecuentes para describir tu día y tu trabajo.",
        examples: [
          { en: "I start work at nine.", es: "Empiezo a trabajar a las nueve." },
          { en: "She finished the report.", es: "Ella terminó el informe." },
        ],
      },
      activities: [
        { kind: "flashcard", word: "to start", meaning: "empezar", example: "We start at eight.", exampleEs: "Empezamos a las ocho." },
        { kind: "flashcard", word: "to finish", meaning: "terminar", example: "I finish at five.", exampleEs: "Termino a las cinco." },
        { kind: "flashcard", word: "meeting", meaning: "reunión", example: "The meeting is at noon.", exampleEs: "La reunión es al mediodía." },
        { kind: "flashcard", word: "report", meaning: "informe", example: "She wrote the report.", exampleEs: "Ella escribió el informe." },
        { kind: "flashcard", word: "early", meaning: "temprano", example: "He wakes up early.", exampleEs: "Él se levanta temprano." },
        { kind: "flashcard", word: "late", meaning: "tarde", example: "Do not be late.", exampleEs: "No llegues tarde." },
        {
          kind: "matching",
          prompt: "Empareja palabra y significado.",
          pairs: [
            { left: "to finish", right: "terminar" },
            { left: "meeting", right: "reunión" },
            { left: "early", right: "temprano" },
            { left: "report", right: "informe" },
          ],
        },
      ],
    },
  },
  {
    id: "l2-structure-prepositions",
    level: 2,
    order: 4,
    title: "Preposiciones de tiempo y lugar (in/on/at)",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "Tiempo: at (horas), on (días/fechas), in (meses/años). Lugar: at (punto), on (superficie), in (espacio cerrado).",
        examples: [
          { en: "The class is at 9 a.m. on Monday.", es: "La clase es a las 9 a.m. el lunes." },
          { en: "The keys are in the drawer.", es: "Las llaves están en el cajón." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Elige la preposición de tiempo.",
          sentence: "The meeting is ___ Monday.",
          options: ["in", "at", "on", "by"],
          answerIndex: 2,
          explanation: "Con días de la semana se usa 'on': on Monday.",
        },
        {
          kind: "mcq",
          prompt: "Elige la preposición de tiempo.",
          sentence: "I was born ___ 1995.",
          options: ["on", "in", "at", "to"],
          answerIndex: 1,
          explanation: "Con años se usa 'in': in 1995.",
        },
        {
          kind: "mcq",
          prompt: "Elige la preposición de lugar.",
          sentence: "The book is ___ the table.",
          options: ["in", "on", "at", "to"],
          answerIndex: 1,
          explanation: "Sobre una superficie se usa 'on': on the table.",
        },
      ],
    },
  },
  {
    id: "l2-reading-email",
    level: 2,
    order: 5,
    title: "Lectura: un correo de trabajo",
    area: "reading",
    type: "reading",
    content: {
      intro: {
        explanationEs: "Lee este correo breve y responde sobre los detalles.",
        examples: [],
      },
      activities: [
        {
          kind: "reading",
          title: "A short email",
          passage:
            "Hi Tom, I am writing about the project meeting. We changed the time. The meeting is now on Wednesday at 10 a.m. in Room 4. Please bring the report and your laptop. After the meeting, we will have lunch together. See you there. Best, Laura.",
          questions: [
            {
              prompt: "When is the meeting now?",
              options: ["Monday at 9 a.m.", "Wednesday at 10 a.m.", "Friday at noon", "Tuesday at 8 a.m."],
              answerIndex: 1,
              explanation: "'The meeting is now on Wednesday at 10 a.m.'",
            },
            {
              prompt: "What should Tom bring?",
              options: ["Lunch", "The report and his laptop", "A book", "Nothing"],
              answerIndex: 1,
              explanation: "'Please bring the report and your laptop.'",
            },
            {
              prompt: "What will they do after the meeting?",
              options: ["Go home", "Write a report", "Have lunch", "Start a new project"],
              answerIndex: 2,
              explanation: "'we will have lunch together.'",
            },
          ],
        },
      ],
    },
  },
  {
    id: "l2-listening-directions",
    level: 2,
    order: 6,
    title: "Listening: pidiendo direcciones",
    area: "listening",
    type: "listening",
    content: {
      intro: {
        explanationEs: "Escucha cómo una persona pide indicaciones en la calle. Repite el audio si lo necesitas.",
        examples: [],
      },
      activities: [
        {
          kind: "listening",
          scriptLabel: "Una persona busca la estación de tren.",
          script:
            "Excuse me, where is the train station? Go straight ahead and turn left at the bank. The station is next to a small park. Is it far? No, about five minutes on foot. Thank you very much!",
          questions: [
            {
              prompt: "What is the person looking for?",
              options: ["A bank", "A park", "The train station", "A hotel"],
              answerIndex: 2,
              explanation: "'where is the train station?'",
            },
            {
              prompt: "How long does it take on foot?",
              options: ["Five minutes", "Ten minutes", "Half an hour", "One hour"],
              answerIndex: 0,
              explanation: "'about five minutes on foot.'",
            },
          ],
        },
      ],
    },
  },
];

export const level2Srs: SeedSrsItem[] = [
  { type: "vocab", area: "vocab", front: "to start", back: "empezar", example: "We start at eight.", conceptKey: "vocab:start" },
  { type: "vocab", area: "vocab", front: "to finish", back: "terminar", example: "I finish at five.", conceptKey: "vocab:finish" },
  { type: "vocab", area: "vocab", front: "meeting", back: "reunión", example: "The meeting is at noon.", conceptKey: "vocab:meeting" },
  { type: "vocab", area: "vocab", front: "report", back: "informe", example: "She wrote the report.", conceptKey: "vocab:report" },
  { type: "vocab", area: "vocab", front: "early", back: "temprano", example: "He wakes up early.", conceptKey: "vocab:early" },
  { type: "vocab", area: "vocab", front: "late", back: "tarde", example: "Do not be late.", conceptKey: "vocab:late" },
  { type: "grammar", area: "structure", front: "Presente continuo: estructura", back: "am/is/are + verbo-ing", example: "She is reading.", conceptKey: "grammar:present-continuous" },
  { type: "grammar", area: "structure", front: "Pasado de 'go'", back: "went", example: "I went home.", conceptKey: "grammar:past-go" },
  { type: "grammar", area: "structure", front: "Preposición con días (Monday)", back: "on (on Monday)", example: "on Monday", conceptKey: "grammar:prep-on-days" },
  { type: "grammar", area: "structure", front: "Preposición con años (1995)", back: "in (in 1995)", example: "in 1995", conceptKey: "grammar:prep-in-years" },
];
