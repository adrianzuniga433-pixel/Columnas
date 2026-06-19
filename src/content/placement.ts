import type { Area } from "@/lib/itp";

// Prueba diagnóstica (placement). Ítems originales de dificultad creciente
// (bloques 1 a 5) que cubren structure, reading y listening.

export interface PlacementItem {
  id: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  area: Area;
  prompt: string;
  passage?: string; // para reading
  script?: string; // para listening (se sintetiza)
  sentence?: string; // para structure
  options: string[];
  answerIndex: number;
}

export const placementItems: PlacementItem[] = [
  // ---- Bloque 1 (A1) ----
  {
    id: "p1",
    difficulty: 1,
    area: "structure",
    prompt: "Elige la opción correcta.",
    sentence: "I ___ a student.",
    options: ["am", "is", "are", "be"],
    answerIndex: 0,
  },
  {
    id: "p2",
    difficulty: 1,
    area: "structure",
    prompt: "Elige la opción correcta.",
    sentence: "She ___ from Canada.",
    options: ["am", "are", "is", "be"],
    answerIndex: 2,
  },
  {
    id: "p3",
    difficulty: 1,
    area: "structure",
    prompt: "Elige el artículo correcto.",
    sentence: "He has ___ apple.",
    options: ["a", "an", "the", "—"],
    answerIndex: 1,
  },
  {
    id: "p4",
    difficulty: 1,
    area: "reading",
    prompt: "Read: 'Tom is ten. He has a dog.' How old is Tom?",
    options: ["Five", "Ten", "Twelve", "Twenty"],
    answerIndex: 1,
  },
  // ---- Bloque 2 (A2 inicial) ----
  {
    id: "p5",
    difficulty: 2,
    area: "structure",
    prompt: "Elige el pasado simple.",
    sentence: "Yesterday they ___ to the cinema.",
    options: ["go", "went", "going", "gone"],
    answerIndex: 1,
  },
  {
    id: "p6",
    difficulty: 2,
    area: "structure",
    prompt: "Elige la preposición correcta.",
    sentence: "The meeting is ___ Monday.",
    options: ["in", "on", "at", "to"],
    answerIndex: 1,
  },
  {
    id: "p7",
    difficulty: 2,
    area: "structure",
    prompt: "Presente continuo: elige la opción.",
    sentence: "Look! It ___ raining.",
    options: ["is", "are", "am", "be"],
    answerIndex: 0,
  },
  {
    id: "p8",
    difficulty: 2,
    area: "reading",
    prompt:
      "Read: 'Sara works in a hospital. She is a nurse and starts at 7 a.m.' What is Sara's job?",
    options: ["Doctor", "Teacher", "Nurse", "Driver"],
    answerIndex: 2,
  },
  {
    id: "p9",
    difficulty: 2,
    area: "listening",
    prompt: "Listen and answer: What does the person want?",
    script: "Hi, can I have a small coffee, please?",
    options: ["A tea", "A small coffee", "A sandwich", "Water"],
    answerIndex: 1,
  },
  // ---- Bloque 3 (A2 consolidado) ----
  {
    id: "p10",
    difficulty: 3,
    area: "structure",
    prompt: "Elige la opción correcta (futuro).",
    sentence: "Look at the clouds! It ___ rain.",
    options: ["will", "is going to", "go to", "wills"],
    answerIndex: 1,
  },
  {
    id: "p11",
    difficulty: 3,
    area: "structure",
    prompt: "Comparativo: elige la opción.",
    sentence: "This box is ___ than that one.",
    options: ["heavy", "heavier", "heaviest", "more heavy"],
    answerIndex: 1,
  },
  {
    id: "p12",
    difficulty: 3,
    area: "structure",
    prompt: "Presente perfecto: elige la opción.",
    sentence: "I have ___ my homework already.",
    options: ["do", "did", "done", "doing"],
    answerIndex: 2,
  },
  {
    id: "p13",
    difficulty: 3,
    area: "reading",
    prompt:
      "Read: 'Although the ticket was expensive, the concert was worth it.' What does 'although' show?",
    options: ["A reason", "A contrast", "A time", "A place"],
    answerIndex: 1,
  },
  {
    id: "p14",
    difficulty: 3,
    area: "listening",
    prompt: "Listen: What is the woman going to do on Saturday?",
    script: "On Saturday I am going to visit my parents, and on Sunday I will study.",
    options: ["Study", "Visit her parents", "Go to the gym", "Work"],
    answerIndex: 1,
  },
  // ---- Bloque 4 (A2 alto / B1 inicial) ----
  {
    id: "p15",
    difficulty: 4,
    area: "structure",
    prompt: "Condicional 1: elige la opción.",
    sentence: "If it rains tomorrow, we ___ at home.",
    options: ["stay", "will stay", "stayed", "would stay"],
    answerIndex: 1,
  },
  {
    id: "p16",
    difficulty: 4,
    area: "structure",
    prompt: "Voz pasiva: elige la opción.",
    sentence: "The bridge ___ in 2010.",
    options: ["built", "was built", "is building", "builds"],
    answerIndex: 1,
  },
  {
    id: "p17",
    difficulty: 4,
    area: "structure",
    prompt: "Identifica la opción correcta.",
    sentence: "He asked me where ___.",
    options: ["I lived", "did I live", "do I live", "I live did"],
    answerIndex: 0,
  },
  {
    id: "p18",
    difficulty: 4,
    area: "reading",
    prompt:
      "Read: 'Solar panels convert sunlight into electricity, reducing the need for fossil fuels.' What do solar panels reduce?",
    options: [
      "The need for fossil fuels",
      "The amount of sunlight",
      "The price of electricity only",
      "The number of panels",
    ],
    answerIndex: 0,
  },
  // ---- Bloque 5 (B1) ----
  {
    id: "p19",
    difficulty: 5,
    area: "structure",
    prompt: "Condicional 2: elige la opción.",
    sentence: "If I ___ more time, I would learn another language.",
    options: ["have", "had", "will have", "am having"],
    answerIndex: 1,
  },
  {
    id: "p20",
    difficulty: 5,
    area: "structure",
    prompt: "Cláusula relativa: elige la opción.",
    sentence: "The company ___ makes these chips is in Asia.",
    options: ["who", "which", "where", "whose"],
    answerIndex: 1,
  },
  {
    id: "p21",
    difficulty: 5,
    area: "reading",
    prompt:
      "Read: 'While we sleep, the brain consolidates memories, which is why rest improves learning.' Why does rest improve learning?",
    options: [
      "Because the brain consolidates memories during sleep",
      "Because we study while sleeping",
      "Because sleep is a waste of time",
      "Because the brain stops working",
    ],
    answerIndex: 0,
  },
  {
    id: "p22",
    difficulty: 5,
    area: "listening",
    prompt: "Listen: What is the speaker's main point?",
    script:
      "Getting enough sleep before an exam is not a waste of time; it is part of effective learning.",
    options: [
      "Sleep helps you learn effectively",
      "Exams are easy",
      "You should study all night",
      "Sleep is unimportant",
    ],
    answerIndex: 0,
  },
];
