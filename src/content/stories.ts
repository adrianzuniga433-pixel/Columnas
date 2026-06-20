// Historias cortas originales (graded readers) para practicar lectura dentro de
// la app. Cada una trae glosario y preguntas de comprensión. Contenido original.

export interface StoryGloss {
  en: string;
  es: string;
}

export interface StoryQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Story {
  id: string;
  title: string;
  level: string;
  emoji: string;
  minutes: number;
  paragraphs: string[];
  glossary: StoryGloss[];
  questions: StoryQuestion[];
}

export const stories: Story[] = [
  {
    id: "the-lost-key",
    title: "The Lost Key",
    level: "Básico",
    emoji: "🟢",
    minutes: 3,
    paragraphs: [
      "Mia came home after work, but she couldn't find her key. She looked in her bag, in her pockets, and on the floor. The key was not there.",
      "She remembered the coffee shop near her office. \"Maybe I left it there,\" she thought. She took the bus back and asked the waiter.",
      "The waiter smiled and gave her the key. \"You left it on the table,\" he said. Mia thanked him and went home, happy and relieved.",
    ],
    glossary: [
      { en: "couldn't find", es: "no podía encontrar" },
      { en: "pockets", es: "bolsillos" },
      { en: "I left it there", es: "lo dejé ahí" },
      { en: "waiter", es: "mesero" },
      { en: "relieved", es: "aliviada" },
    ],
    questions: [
      { prompt: "What was Mia's problem?", options: ["She lost her job", "She couldn't find her key", "She missed the bus", "She forgot her bag"], answerIndex: 1, explanation: "'she couldn't find her key'." },
      { prompt: "Where was the key?", options: ["In her bag", "On the floor", "At the coffee shop", "At her office"], answerIndex: 2, explanation: "El mesero se la dio: la dejó en la mesa de la cafetería." },
      { prompt: "How did Mia feel at the end?", options: ["Angry", "Sad", "Happy and relieved", "Tired"], answerIndex: 2, explanation: "'happy and relieved'." },
    ],
  },
  {
    id: "a-new-neighbor",
    title: "A New Neighbor",
    level: "Básico",
    emoji: "🟢",
    minutes: 3,
    paragraphs: [
      "Last week, a new family moved into the apartment next to ours. They have two children and a small dog.",
      "On Saturday, my mother made a cake and we visited them. The mother, Carla, was very friendly. She offered us coffee and we talked for an hour.",
      "Now our families are good friends. The children play together every afternoon, and sometimes we have dinner together on weekends.",
    ],
    glossary: [
      { en: "moved into", es: "se mudaron a" },
      { en: "next to", es: "junto a" },
      { en: "friendly", es: "amable" },
      { en: "offered", es: "ofreció" },
      { en: "weekends", es: "fines de semana" },
    ],
    questions: [
      { prompt: "Who moved in next door?", options: ["A new family", "An old man", "A teacher", "Nobody"], answerIndex: 0, explanation: "'a new family moved into the apartment next to ours'." },
      { prompt: "What did the mother make?", options: ["Dinner", "A cake", "Coffee", "Bread"], answerIndex: 1, explanation: "'my mother made a cake'." },
      { prompt: "What do the families do now?", options: ["They argue", "They are good friends", "They never talk", "They moved away"], answerIndex: 1, explanation: "'our families are good friends'." },
    ],
  },
  {
    id: "the-job-interview",
    title: "The Job Interview",
    level: "Intermedio",
    emoji: "🔵",
    minutes: 4,
    paragraphs: [
      "Diego had an interview for his dream job. He was nervous, so he prepared all weekend. He practiced answers in front of the mirror and chose his best clothes.",
      "On Monday morning, he arrived early. The interviewer asked him about his experience and his strengths. Diego spoke calmly and gave clear examples from his previous work.",
      "Two days later, he received an email. The company offered him the position. Diego realized that his preparation had made all the difference.",
    ],
    glossary: [
      { en: "dream job", es: "trabajo soñado" },
      { en: "nervous", es: "nervioso" },
      { en: "strengths", es: "fortalezas" },
      { en: "calmly", es: "con calma" },
      { en: "made all the difference", es: "marcó toda la diferencia" },
    ],
    questions: [
      { prompt: "How did Diego prepare?", options: ["He didn't prepare", "He practiced all weekend", "He asked a friend", "He read a book"], answerIndex: 1, explanation: "'he prepared all weekend' y practicó frente al espejo." },
      { prompt: "What did the interviewer ask about?", options: ["His family", "His hobbies", "His experience and strengths", "His salary"], answerIndex: 2, explanation: "'about his experience and his strengths'." },
      { prompt: "What was the result?", options: ["He failed", "He got the job", "He left early", "He was late"], answerIndex: 1, explanation: "'The company offered him the position'." },
    ],
  },
  {
    id: "a-rainy-trip",
    title: "A Rainy Trip",
    level: "Intermedio",
    emoji: "🔵",
    minutes: 4,
    paragraphs: [
      "Last summer, my friends and I planned a trip to the coast. We were excited about the beach, the sun, and the sea. However, the weather had other plans.",
      "When we arrived, it started to rain heavily, and it didn't stop for three days. Instead of complaining, we decided to make the best of it. We played board games, cooked together, and told stories late into the night.",
      "In the end, it became one of our favorite trips. Sometimes the best memories come from the moments we don't plan.",
    ],
    glossary: [
      { en: "coast", es: "costa" },
      { en: "heavily", es: "fuertemente" },
      { en: "make the best of it", es: "sacarle el mejor provecho" },
      { en: "board games", es: "juegos de mesa" },
      { en: "memories", es: "recuerdos" },
    ],
    questions: [
      { prompt: "What was the original plan?", options: ["To stay home", "A trip to the coast", "To visit family", "To study"], answerIndex: 1, explanation: "'a trip to the coast'." },
      { prompt: "What happened with the weather?", options: ["It was sunny", "It rained for three days", "It snowed", "It was windy"], answerIndex: 1, explanation: "'it started to rain heavily, and it didn't stop for three days'." },
      { prompt: "What is the message of the story?", options: ["Never travel", "Always check the weather", "The best memories can be unplanned", "Beaches are boring"], answerIndex: 2, explanation: "'the best memories come from the moments we don't plan'." },
    ],
  },
  {
    id: "the-old-bookshop",
    title: "The Old Bookshop",
    level: "Intermedio-Alto",
    emoji: "🟣",
    minutes: 5,
    paragraphs: [
      "On a narrow street in the old part of the city, there was a small bookshop that most people walked past without noticing. Its windows were dusty, and the sign above the door had faded years ago.",
      "One afternoon, Elena stepped inside out of curiosity. The owner, an elderly man with kind eyes, was reading behind the counter. He looked up and said, \"Take your time. Books find their readers when the moment is right.\"",
      "Elena spent two hours among the shelves and left with three novels she had never heard of. Over the following months, the little shop became her favorite escape from the noise of the city — a quiet world hidden in plain sight.",
    ],
    glossary: [
      { en: "narrow", es: "angosta / estrecha" },
      { en: "walked past", es: "pasaban de largo" },
      { en: "faded", es: "se había desteñido" },
      { en: "curiosity", es: "curiosidad" },
      { en: "hidden in plain sight", es: "escondido a la vista de todos" },
    ],
    questions: [
      { prompt: "Why did most people ignore the bookshop?", options: ["It was expensive", "They walked past without noticing it", "It was always closed", "It was too far"], answerIndex: 1, explanation: "'most people walked past without noticing'." },
      { prompt: "What did the owner say to Elena?", options: ["Buy something now", "Books find their readers when the moment is right", "The shop is closing", "Come back tomorrow"], answerIndex: 1, explanation: "Cita directa del dueño." },
      { prompt: "What did the shop become for Elena?", options: ["A place to work", "Her favorite escape from the city", "A restaurant", "A library she disliked"], answerIndex: 1, explanation: "'became her favorite escape from the noise of the city'." },
    ],
  },
  {
    id: "the-decision",
    title: "The Decision",
    level: "Intermedio-Alto",
    emoji: "🟣",
    minutes: 5,
    paragraphs: [
      "For years, Andrés had a stable job at a bank. The salary was good and the work was predictable, but every morning he felt a quiet sense of dissatisfaction that he could not ignore.",
      "He had always dreamed of opening a small restaurant. Friends warned him about the risks, and his savings were limited. Still, the idea kept returning, stronger each time.",
      "Eventually, he made the decision to leave the bank and follow his dream. The first year was difficult and full of doubts, but he never regretted choosing a life that finally felt like his own.",
    ],
    glossary: [
      { en: "stable", es: "estable" },
      { en: "predictable", es: "predecible" },
      { en: "dissatisfaction", es: "insatisfacción" },
      { en: "warned", es: "advirtieron" },
      { en: "regretted", es: "se arrepintió" },
    ],
    questions: [
      { prompt: "How did Andrés feel about his bank job?", options: ["Excited", "A quiet dissatisfaction", "Proud", "Afraid"], answerIndex: 1, explanation: "'a quiet sense of dissatisfaction'." },
      { prompt: "What was his dream?", options: ["To travel", "To open a small restaurant", "To work abroad", "To retire early"], answerIndex: 1, explanation: "'dreamed of opening a small restaurant'." },
      { prompt: "How did he feel about his decision in the end?", options: ["He regretted it", "He never regretted it", "He returned to the bank", "He gave up"], answerIndex: 1, explanation: "'he never regretted choosing a life that finally felt like his own'." },
    ],
  },
];

export function getStory(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}
