import type { LessonDef, SeedSrsItem } from "./types";

// NIVEL 1 — Fundamentos (A1). Contenido original.

export const level1Lessons: LessonDef[] = [
  {
    id: "l1-vocab-greetings",
    level: 1,
    order: 1,
    title: "Saludos y palabras esenciales",
    area: "vocab",
    type: "flashcards",
    content: {
      intro: {
        explanationEs:
          "Empezamos con saludos y palabras de uso diario. Escucha cada palabra y asóciala con su significado. Estas se añadirán a tu repaso espaciado.",
        examples: [
          { en: "Hello, how are you?", es: "Hola, ¿cómo estás?" },
          { en: "Nice to meet you.", es: "Mucho gusto." },
        ],
      },
      activities: [
        { kind: "flashcard", word: "hello", meaning: "hola", example: "Hello! My name is Ana.", exampleEs: "¡Hola! Mi nombre es Ana." },
        { kind: "flashcard", word: "goodbye", meaning: "adiós", example: "Goodbye, see you tomorrow.", exampleEs: "Adiós, nos vemos mañana." },
        { kind: "flashcard", word: "please", meaning: "por favor", example: "Water, please.", exampleEs: "Agua, por favor." },
        { kind: "flashcard", word: "thank you", meaning: "gracias", example: "Thank you for your help.", exampleEs: "Gracias por tu ayuda." },
        { kind: "flashcard", word: "yes", meaning: "sí", example: "Yes, I am a student.", exampleEs: "Sí, soy estudiante." },
        { kind: "flashcard", word: "no", meaning: "no", example: "No, it is not here.", exampleEs: "No, no está aquí." },
        {
          kind: "matching",
          prompt: "Empareja cada palabra con su significado.",
          pairs: [
            { left: "hello", right: "hola" },
            { left: "goodbye", right: "adiós" },
            { left: "please", right: "por favor" },
            { left: "thank you", right: "gracias" },
          ],
        },
      ],
    },
  },
  {
    id: "l1-grammar-tobe",
    level: 1,
    order: 2,
    title: "El verbo to be (am / is / are)",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "El verbo to be significa 'ser' o 'estar'. Usa I am, you/we/they are, he/she/it is. Es la base para presentarte y describir.",
        examples: [
          { en: "I am an engineer.", es: "Soy ingeniero." },
          { en: "She is at home.", es: "Ella está en casa." },
          { en: "They are students.", es: "Ellos son estudiantes." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Elige la forma correcta del verbo to be.",
          sentence: "I ___ from Mexico.",
          options: ["am", "is", "are", "be"],
          answerIndex: 0,
          explanation: "Con el pronombre I siempre se usa 'am': I am.",
        },
        {
          kind: "mcq",
          prompt: "Elige la forma correcta del verbo to be.",
          sentence: "She ___ a doctor.",
          options: ["am", "are", "is", "be"],
          answerIndex: 2,
          explanation: "Con he/she/it se usa 'is': She is a doctor.",
        },
        {
          kind: "mcq",
          prompt: "Elige la forma correcta del verbo to be.",
          sentence: "They ___ my friends.",
          options: ["is", "am", "are", "be"],
          answerIndex: 2,
          explanation: "Con we/you/they se usa 'are': They are my friends.",
        },
        {
          kind: "order-words",
          prompt: "Ordena las palabras para formar una oración.",
          words: ["is", "He", "teacher", "a"],
          correct: "He is a teacher",
          translationEs: "Él es profesor.",
        },
      ],
    },
  },
  {
    id: "l1-vocab-numbers-family",
    level: 1,
    order: 3,
    title: "Números y familia",
    area: "vocab",
    type: "flashcards",
    content: {
      intro: {
        explanationEs:
          "Vocabulario de números básicos y miembros de la familia, muy frecuente en exámenes y conversación.",
        examples: [
          { en: "I have two brothers.", es: "Tengo dos hermanos." },
          { en: "My mother is a nurse.", es: "Mi madre es enfermera." },
        ],
      },
      activities: [
        { kind: "flashcard", word: "one", meaning: "uno", example: "I have one sister.", exampleEs: "Tengo una hermana." },
        { kind: "flashcard", word: "two", meaning: "dos", example: "Two coffees, please.", exampleEs: "Dos cafés, por favor." },
        { kind: "flashcard", word: "three", meaning: "tres", example: "Three books are on the table.", exampleEs: "Tres libros están sobre la mesa." },
        { kind: "flashcard", word: "mother", meaning: "madre", example: "My mother works here.", exampleEs: "Mi madre trabaja aquí." },
        { kind: "flashcard", word: "father", meaning: "padre", example: "His father is tall.", exampleEs: "Su padre es alto." },
        { kind: "flashcard", word: "brother", meaning: "hermano", example: "My brother plays soccer.", exampleEs: "Mi hermano juega fútbol." },
        {
          kind: "matching",
          prompt: "Empareja la palabra con su significado.",
          pairs: [
            { left: "mother", right: "madre" },
            { left: "father", right: "padre" },
            { left: "brother", right: "hermano" },
            { left: "three", right: "tres" },
          ],
        },
      ],
    },
  },
  {
    id: "l1-structure-articles",
    level: 1,
    order: 4,
    title: "Artículos a / an / the",
    area: "structure",
    type: "grammar",
    content: {
      intro: {
        explanationEs:
          "Usa 'a' antes de sonido consonante (a book), 'an' antes de sonido vocal (an apple) y 'the' para algo específico ya conocido.",
        examples: [
          { en: "I read a book.", es: "Leo un libro." },
          { en: "She ate an apple.", es: "Ella comió una manzana." },
          { en: "The car is red.", es: "El carro es rojo." },
        ],
      },
      activities: [
        {
          kind: "mcq",
          prompt: "Elige el artículo correcto.",
          sentence: "I need ___ umbrella.",
          options: ["a", "an", "the", "—"],
          answerIndex: 1,
          explanation: "'umbrella' empieza con sonido vocal, por eso se usa 'an'.",
        },
        {
          kind: "mcq",
          prompt: "Elige el artículo correcto.",
          sentence: "She has ___ dog.",
          options: ["an", "a", "the", "—"],
          answerIndex: 1,
          explanation: "'dog' empieza con sonido consonante, por eso se usa 'a'.",
        },
        {
          kind: "error-id",
          prompt: "Identifica la parte incorrecta de la oración.",
          segments: [
            { text: "She is", label: "A" },
            { text: "a", label: "B" },
            { text: "engineer", label: "C" },
            { text: "at a big company.", label: "D" },
          ],
          answerLabel: "B",
          explanation:
            "'engineer' empieza con sonido vocal, así que debe ser 'an engineer', no 'a engineer'.",
        },
      ],
    },
  },
  {
    id: "l1-reading-introductions",
    level: 1,
    order: 5,
    title: "Lectura: una presentación",
    area: "reading",
    type: "reading",
    content: {
      intro: {
        explanationEs:
          "Lee este texto corto. No necesitas entender cada palabra; busca la idea general y los datos clave.",
        examples: [],
      },
      activities: [
        {
          kind: "reading",
          title: "About David",
          passage:
            "David is from Spain. He is twenty-eight years old. He is an engineer and he works in a small company. He has a sister and a brother. In the morning, he drinks coffee and reads the news. David likes music and he plays the guitar on weekends.",
          questions: [
            {
              prompt: "Where is David from?",
              options: ["Mexico", "Spain", "France", "Italy"],
              answerIndex: 1,
              explanation: "El texto dice 'David is from Spain.'",
            },
            {
              prompt: "What is his job?",
              options: ["A teacher", "A doctor", "An engineer", "A nurse"],
              answerIndex: 2,
              explanation: "El texto dice 'He is an engineer.'",
            },
            {
              prompt: "What does David do on weekends?",
              options: ["He works", "He plays the guitar", "He reads the news", "He drinks coffee"],
              answerIndex: 1,
              explanation: "'he plays the guitar on weekends.'",
            },
          ],
        },
      ],
    },
  },
  {
    id: "l1-listening-cafe",
    level: 1,
    order: 6,
    title: "Listening: en la cafetería",
    area: "listening",
    type: "listening",
    content: {
      intro: {
        explanationEs:
          "Pulsa el botón para escuchar el diálogo (voz sintetizada en inglés). Puedes repetirlo. Luego responde.",
        examples: [],
      },
      activities: [
        {
          kind: "listening",
          scriptLabel: "Un cliente pide en una cafetería.",
          script:
            "Good morning! Can I have a coffee, please? Sure. Small or large? A small coffee, please. That is two dollars. Here you are. Thank you!",
          questions: [
            {
              prompt: "What does the customer order?",
              options: ["A tea", "A coffee", "A juice", "Water"],
              answerIndex: 1,
              explanation: "El cliente dice 'Can I have a coffee, please?'",
            },
            {
              prompt: "How much is it?",
              options: ["One dollar", "Two dollars", "Three dollars", "Five dollars"],
              answerIndex: 1,
              explanation: "'That is two dollars.'",
            },
          ],
        },
      ],
    },
  },
];

export const level1Srs: SeedSrsItem[] = [
  { type: "vocab", area: "vocab", front: "hello", back: "hola", example: "Hello! My name is Ana.", conceptKey: "vocab:hello" },
  { type: "vocab", area: "vocab", front: "goodbye", back: "adiós", example: "Goodbye, see you tomorrow.", conceptKey: "vocab:goodbye" },
  { type: "vocab", area: "vocab", front: "please", back: "por favor", example: "Water, please.", conceptKey: "vocab:please" },
  { type: "vocab", area: "vocab", front: "thank you", back: "gracias", example: "Thank you for your help.", conceptKey: "vocab:thankyou" },
  { type: "vocab", area: "vocab", front: "mother", back: "madre", example: "My mother works here.", conceptKey: "vocab:mother" },
  { type: "vocab", area: "vocab", front: "father", back: "padre", example: "His father is tall.", conceptKey: "vocab:father" },
  { type: "vocab", area: "vocab", front: "brother", back: "hermano", example: "My brother plays soccer.", conceptKey: "vocab:brother" },
  { type: "grammar", area: "structure", front: "to be: I ___", back: "am (I am)", example: "I am an engineer.", conceptKey: "grammar:tobe-i" },
  { type: "grammar", area: "structure", front: "to be: he/she/it ___", back: "is (She is)", example: "She is at home.", conceptKey: "grammar:tobe-he" },
  { type: "grammar", area: "structure", front: "Artículo antes de sonido vocal", back: "an (an apple)", example: "She ate an apple.", conceptKey: "grammar:article-an" },
];
