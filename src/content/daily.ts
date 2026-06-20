// Currículo de estudio diario — basado en la Guía de Inglés Autodidacta
// (plan de 6 meses, 1 hora diaria: gramática + vocabulario + escucha/lectura +
// producción). El contenido es original. Cada día combina piezas de varios
// "pools" para que la sesión sea distinta cada vez y avance de forma gradual.

import type {
  Activity,
  Flashcard,
  Listening,
  Mcq,
  OrderWords,
  Reading,
} from "./types";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface GrammarLesson {
  title: string;
  tipEs: string;
  examples: { en: string; es: string }[];
  practice: Mcq[];
}

export interface VocabSet {
  theme: string;
  cards: Flashcard[];
}

export interface DayResource {
  icon: string;
  label: string;
  detail: string;
}

export interface DailySession {
  day: number;
  week: number;
  stage: string;
  stageEmoji: string;
  monthFocus: string;
  grammar: GrammarLesson;
  vocab: VocabSet;
  comprehensionSet: Activity[];
  activities: Activity[];
  productionPrompt: string;
  resources: DayResource[];
}

// ---------------------------------------------------------------------------
// Pool de gramática (10 lecciones, 5 prácticas cada una)
// ---------------------------------------------------------------------------

export const grammarLessons: GrammarLesson[] = [
  {
    title: "El verbo TO BE (am / is / are)",
    tipEs:
      "TO BE significa 'ser' o 'estar'. Se usa I am, you/we/they are, he/she/it is. Es la base para presentarte y describir cosas.",
    examples: [
      { en: "I am a student.", es: "Soy estudiante." },
      { en: "She is from Mexico.", es: "Ella es de México." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con la forma correcta de TO BE.", sentence: "They ___ my friends.", options: ["is", "am", "are", "be"], answerIndex: 2, explanation: "Con 'they' se usa 'are'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "My name ___ Carlos.", options: ["am", "is", "are", "be"], answerIndex: 1, explanation: "Con 'name' (it) se usa 'is'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I ___ very happy today.", options: ["is", "are", "am", "be"], answerIndex: 2, explanation: "Con 'I' siempre se usa 'am'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We ___ ready to start.", options: ["is", "am", "are", "be"], answerIndex: 2, explanation: "Con 'we' se usa 'are'." },
      { kind: "mcq", prompt: "Elige la forma negativa correcta.", sentence: "He ___ at home right now.", options: ["isn't", "aren't", "am not", "don't"], answerIndex: 0, explanation: "Con 'he', la negación de is es isn't." },
    ],
  },
  {
    title: "Presente simple (rutinas)",
    tipEs:
      "El presente simple describe hábitos y rutinas. Con he/she/it se agrega -s al verbo: I work / she works. Para negar y preguntar usa do/does.",
    examples: [
      { en: "I drink coffee every morning.", es: "Tomo café cada mañana." },
      { en: "He works in an office.", es: "Él trabaja en una oficina." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "She ___ to school by bus.", options: ["go", "goes", "going", "gone"], answerIndex: 1, explanation: "Con 'she' el verbo lleva -s: goes." },
      { kind: "mcq", prompt: "Elige la forma correcta de la pregunta.", sentence: "___ you like pizza?", options: ["Does", "Is", "Do", "Are"], answerIndex: 2, explanation: "Con 'you' la pregunta usa 'Do'." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "He ___ eat meat.", options: ["don't", "doesn't", "isn't", "not"], answerIndex: 1, explanation: "Con 'he' la negación es doesn't." },
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "My parents ___ in another city.", options: ["lives", "live", "living", "to live"], answerIndex: 1, explanation: "Con 'parents' (they) el verbo no lleva -s: live." },
      { kind: "mcq", prompt: "Elige la pregunta correcta.", sentence: "___ she work on weekends?", options: ["Do", "Does", "Is", "Are"], answerIndex: 1, explanation: "Con 'she' la pregunta usa 'Does'." },
    ],
  },
  {
    title: "Artículos a / an / the",
    tipEs:
      "Usa 'a' antes de sonido consonante (a car) y 'an' antes de sonido vocal (an apple). 'The' se usa para algo específico o ya mencionado.",
    examples: [
      { en: "I have a dog and an umbrella.", es: "Tengo un perro y un paraguas." },
      { en: "The car outside is mine.", es: "El carro de afuera es mío." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "She is ___ engineer.", options: ["a", "an", "the", "—"], answerIndex: 1, explanation: "'engineer' empieza con sonido vocal: an." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "I bought ___ new phone yesterday.", options: ["an", "the", "a", "—"], answerIndex: 2, explanation: "'new' empieza con sonido consonante: a." },
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "Can you close ___ door, please?", options: ["a", "an", "the", "—"], answerIndex: 2, explanation: "Es una puerta específica: the." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We waited for ___ hour.", options: ["a", "an", "the", "—"], answerIndex: 1, explanation: "'hour' tiene sonido vocal (la h es muda): an." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I like ___ music.", options: ["a", "an", "the", "—"], answerIndex: 3, explanation: "Para algo en general (la música), no se usa artículo." },
    ],
  },
  {
    title: "Pasado simple (regular e irregular)",
    tipEs:
      "Para hablar del pasado, los verbos regulares terminan en -ed (work → worked). Los irregulares cambian (go → went, eat → ate). En negativo/pregunta se usa 'did'.",
    examples: [
      { en: "I watched a movie last night.", es: "Vi una película anoche." },
      { en: "We went to the beach.", es: "Fuimos a la playa." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "Yesterday I ___ a great book.", options: ["read", "readed", "reads", "reading"], answerIndex: 0, explanation: "'read' es irregular: su pasado se escribe igual (se pronuncia 'red')." },
      { kind: "mcq", prompt: "Elige el pasado correcto.", sentence: "They ___ to Spain in 2019.", options: ["goed", "went", "go", "gone"], answerIndex: 1, explanation: "go → went (irregular)." },
      { kind: "mcq", prompt: "Completa la pregunta en pasado.", sentence: "___ you call her yesterday?", options: ["Do", "Did", "Was", "Are"], answerIndex: 1, explanation: "En pasado las preguntas usan 'Did'." },
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "She ___ dinner an hour ago.", options: ["cook", "cooks", "cooked", "cooking"], answerIndex: 2, explanation: "Verbo regular: cook → cooked." },
      { kind: "mcq", prompt: "Elige la negación correcta.", sentence: "We ___ see the email.", options: ["didn't", "don't", "wasn't", "weren't"], answerIndex: 0, explanation: "Negación en pasado: didn't + verbo base." },
    ],
  },
  {
    title: "Futuro: will y going to",
    tipEs:
      "Usa 'will' para decisiones del momento y predicciones; 'going to' para planes ya decididos. Ambos hablan del futuro.",
    examples: [
      { en: "I will help you with that.", es: "Te ayudaré con eso." },
      { en: "We are going to travel next month.", es: "Vamos a viajar el próximo mes." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige la mejor opción (plan ya decidido).", sentence: "I ___ visit my family this weekend.", options: ["will", "am going to", "go", "would"], answerIndex: 1, explanation: "Es un plan decidido: going to." },
      { kind: "mcq", prompt: "Completa (decisión del momento).", sentence: "The phone is ringing. I ___ answer it.", options: ["am going to", "will", "would", "going"], answerIndex: 1, explanation: "Decisión espontánea: will." },
      { kind: "mcq", prompt: "Elige la forma correcta.", sentence: "Look at those clouds! It ___ rain.", options: ["will", "is going to", "goes to", "would"], answerIndex: 1, explanation: "Predicción con evidencia presente: going to." },
      { kind: "mcq", prompt: "Completa la predicción.", sentence: "I think she ___ win the game.", options: ["will", "is going to", "go to", "would"], answerIndex: 0, explanation: "Predicción/opinión ('I think'): will." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "We ___ to start a business next year.", options: ["will", "are going", "going", "go"], answerIndex: 1, explanation: "Plan a futuro: are going to." },
    ],
  },
  {
    title: "Comparativos y superlativos",
    tipEs:
      "Comparativos cortos: adjetivo + -er + than (taller than). Largos: more + adjetivo (more expensive). Superlativos: the + -est / the most.",
    examples: [
      { en: "This car is faster than that one.", es: "Este carro es más rápido que aquel." },
      { en: "She is the best student in class.", es: "Ella es la mejor estudiante de la clase." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa el comparativo.", sentence: "Today is ___ than yesterday.", options: ["hot", "hotter", "hottest", "more hot"], answerIndex: 1, explanation: "Adjetivo corto: hot → hotter." },
      { kind: "mcq", prompt: "Elige el comparativo correcto.", sentence: "This phone is ___ than mine.", options: ["expensiver", "more expensive", "most expensive", "expensive"], answerIndex: 1, explanation: "Adjetivo largo: more expensive." },
      { kind: "mcq", prompt: "Completa el superlativo.", sentence: "It was the ___ day of my life.", options: ["happier", "more happy", "happiest", "happy"], answerIndex: 2, explanation: "Superlativo de happy: the happiest." },
      { kind: "mcq", prompt: "Elige la opción correcta (irregular).", sentence: "Her English is ___ than mine.", options: ["gooder", "more good", "better", "best"], answerIndex: 2, explanation: "good → better (comparativo irregular)." },
      { kind: "mcq", prompt: "Completa el superlativo.", sentence: "This is the ___ restaurant in town.", options: ["better", "best", "good", "more good"], answerIndex: 1, explanation: "Superlativo de good: the best." },
    ],
  },
  {
    title: "Presente perfecto (have / has + participio)",
    tipEs:
      "Se forma con have/has + participio pasado. Describe experiencias o acciones con efecto en el presente. Suele ir con 'ever', 'never', 'already', 'yet'.",
    examples: [
      { en: "I have visited London twice.", es: "He visitado Londres dos veces." },
      { en: "She has just finished her work.", es: "Ella acaba de terminar su trabajo." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con presente perfecto.", sentence: "I ___ never been to Japan.", options: ["have", "has", "had", "am"], answerIndex: 0, explanation: "Con 'I' se usa have." },
      { kind: "mcq", prompt: "Elige el participio correcto.", sentence: "He has ___ his keys.", options: ["lose", "lost", "losed", "losing"], answerIndex: 1, explanation: "lose → lost (participio)." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ you ever eaten sushi?", options: ["Has", "Have", "Did", "Are"], answerIndex: 1, explanation: "Con 'you' se usa Have." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She ___ already finished the report.", options: ["have", "has", "is", "did"], answerIndex: 1, explanation: "Con 'she' se usa has." },
      { kind: "mcq", prompt: "Completa con el participio.", sentence: "We have ___ this movie before.", options: ["see", "saw", "seen", "seeing"], answerIndex: 2, explanation: "see → seen (participio)." },
    ],
  },
  {
    title: "Verbos modales (can / should / must)",
    tipEs:
      "'Can' = poder/saber. 'Should' = debería (consejo). 'Must' = deber (obligación fuerte). Después del modal va el verbo en su forma base.",
    examples: [
      { en: "You should rest more.", es: "Deberías descansar más." },
      { en: "I can speak a little English.", es: "Puedo hablar un poco de inglés." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el modal correcto (consejo).", sentence: "You look tired. You ___ go to bed.", options: ["can", "should", "must", "could"], answerIndex: 1, explanation: "Es un consejo: should." },
      { kind: "mcq", prompt: "Completa (habilidad).", sentence: "She ___ play the guitar very well.", options: ["must", "should", "can", "would"], answerIndex: 2, explanation: "Habilidad: can." },
      { kind: "mcq", prompt: "Elige la forma correcta del verbo.", sentence: "We must ___ before the test.", options: ["studying", "studies", "study", "studied"], answerIndex: 2, explanation: "Después de un modal va el verbo base: study." },
      { kind: "mcq", prompt: "Completa (obligación fuerte).", sentence: "Drivers ___ stop at a red light.", options: ["can", "should", "must", "would"], answerIndex: 2, explanation: "Obligación/regla: must." },
      { kind: "mcq", prompt: "Elige la negación correcta.", sentence: "You ___ smoke here; it's not allowed.", options: ["mustn't", "shouldn't", "can", "don't"], answerIndex: 0, explanation: "Prohibición: mustn't." },
    ],
  },
  {
    title: "Condicionales (1º y 2º)",
    tipEs:
      "1º condicional (situación real futura): If + presente, will + verbo. 2º condicional (situación hipotética): If + pasado, would + verbo.",
    examples: [
      { en: "If it rains, I will stay home.", es: "Si llueve, me quedaré en casa." },
      { en: "If I had money, I would travel.", es: "Si tuviera dinero, viajaría." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If you study, you ___ pass the exam.", options: ["would", "will", "are", "passed"], answerIndex: 1, explanation: "1º condicional: If + presente, will + verbo." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "If I ___ you, I would apologize.", options: ["am", "was", "were", "be"], answerIndex: 2, explanation: "En el 2º condicional se usa 'were' para todas las personas." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She would buy a house if she ___ rich.", options: ["is", "were", "will be", "be"], answerIndex: 1, explanation: "Situación hipotética: were." },
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If it ___ tomorrow, we'll cancel the trip.", options: ["rains", "will rain", "rained", "would rain"], answerIndex: 0, explanation: "Tras 'if' va el presente: rains." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "If I had more time, I ___ learn the piano.", options: ["will", "would", "can", "am"], answerIndex: 1, explanation: "2º condicional: would + verbo base." },
    ],
  },
  {
    title: "Preguntas WH- (what, where, when...)",
    tipEs:
      "Las preguntas WH- piden información: what (qué), where (dónde), when (cuándo), who (quién), why (por qué), how (cómo). Estructura: WH + auxiliar + sujeto + verbo.",
    examples: [
      { en: "Where do you live?", es: "¿Dónde vives?" },
      { en: "Why are you late?", es: "¿Por qué llegas tarde?" },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige la palabra WH- correcta.", sentence: "___ is your birthday?", options: ["Where", "When", "Who", "How"], answerIndex: 1, explanation: "Pregunta por tiempo: When." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ do you go to work?", options: ["What", "Who", "How", "Which"], answerIndex: 2, explanation: "Pregunta por el medio/manera: How." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "___ does this jacket cost?", options: ["How much", "How many", "What time", "Where"], answerIndex: 0, explanation: "Para precio incontable: How much." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ is that woman? She's my teacher.", options: ["What", "Who", "Where", "When"], answerIndex: 1, explanation: "Pregunta por una persona: Who." },
      { kind: "mcq", prompt: "Elige la palabra correcta.", sentence: "___ books do you have?", options: ["How much", "How many", "What time", "Why"], answerIndex: 1, explanation: "Para algo contable (books): How many." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Pool de vocabulario por tema (8 tarjetas por set)
// ---------------------------------------------------------------------------

export const vocabSets: VocabSet[] = [
  {
    theme: "Saludos y presentaciones",
    cards: [
      { kind: "flashcard", word: "Nice to meet you", meaning: "Mucho gusto", example: "Nice to meet you, my name is Carlos." },
      { kind: "flashcard", word: "How are you?", meaning: "¿Cómo estás?", example: "Hi! How are you today?" },
      { kind: "flashcard", word: "I'm from...", meaning: "Soy de...", example: "I'm from Mexico, from León." },
      { kind: "flashcard", word: "See you later", meaning: "Hasta luego", example: "I have to go. See you later!" },
      { kind: "flashcard", word: "Take care", meaning: "Cuídate", example: "Bye! Take care." },
      { kind: "flashcard", word: "What's your name?", meaning: "¿Cómo te llamas?", example: "Hello! What's your name?" },
      { kind: "flashcard", word: "How's it going?", meaning: "¿Qué tal?", example: "Hey! How's it going?" },
      { kind: "flashcard", word: "Have a nice day", meaning: "Que tengas buen día", example: "Thanks for your help. Have a nice day!" },
    ],
  },
  {
    theme: "La familia",
    cards: [
      { kind: "flashcard", word: "parents", meaning: "padres", example: "My parents live in another city." },
      { kind: "flashcard", word: "sibling", meaning: "hermano/a", example: "Do you have any siblings?" },
      { kind: "flashcard", word: "aunt / uncle", meaning: "tía / tío", example: "My aunt and uncle visit us every summer." },
      { kind: "flashcard", word: "cousin", meaning: "primo/a", example: "My cousin is the same age as me." },
      { kind: "flashcard", word: "grandparents", meaning: "abuelos", example: "I love spending time with my grandparents." },
      { kind: "flashcard", word: "husband / wife", meaning: "esposo / esposa", example: "Her husband works at a bank." },
      { kind: "flashcard", word: "son / daughter", meaning: "hijo / hija", example: "They have one son and two daughters." },
      { kind: "flashcard", word: "relatives", meaning: "parientes", example: "All my relatives came to the party." },
    ],
  },
  {
    theme: "Comida y restaurantes",
    cards: [
      { kind: "flashcard", word: "I would like...", meaning: "Quisiera...", example: "I would like a coffee with milk, please." },
      { kind: "flashcard", word: "delicious", meaning: "delicioso", example: "This pizza is absolutely delicious!" },
      { kind: "flashcard", word: "the bill / the check", meaning: "la cuenta", example: "Can we have the bill, please?" },
      { kind: "flashcard", word: "menu", meaning: "menú", example: "Can I see the menu, please?" },
      { kind: "flashcard", word: "spicy", meaning: "picante", example: "Be careful, this sauce is very spicy." },
      { kind: "flashcard", word: "for here or to go?", meaning: "¿para comer aquí o llevar?", example: "For here or to go? — To go, please." },
      { kind: "flashcard", word: "I'm allergic to...", meaning: "Soy alérgico a...", example: "I'm allergic to peanuts." },
      { kind: "flashcard", word: "starter / main / dessert", meaning: "entrada / plato fuerte / postre", example: "For dessert, I'll have ice cream." },
    ],
  },
  {
    theme: "Rutina diaria",
    cards: [
      { kind: "flashcard", word: "wake up", meaning: "despertarse", example: "I wake up at 6 a.m. every day." },
      { kind: "flashcard", word: "have breakfast", meaning: "desayunar", example: "I have breakfast before work." },
      { kind: "flashcard", word: "get to work", meaning: "llegar al trabajo", example: "I get to work at nine o'clock." },
      { kind: "flashcard", word: "go to bed", meaning: "irse a la cama", example: "I usually go to bed at eleven." },
      { kind: "flashcard", word: "take a shower", meaning: "ducharse", example: "She takes a shower in the morning." },
      { kind: "flashcard", word: "brush my teeth", meaning: "lavarme los dientes", example: "I brush my teeth after every meal." },
      { kind: "flashcard", word: "get dressed", meaning: "vestirse", example: "He gets dressed quickly in the morning." },
      { kind: "flashcard", word: "have lunch", meaning: "almorzar", example: "We have lunch at two o'clock." },
    ],
  },
  {
    theme: "Trabajo y profesiones",
    cards: [
      { kind: "flashcard", word: "deadline", meaning: "fecha límite", example: "I have a deadline for the report tomorrow." },
      { kind: "flashcard", word: "meeting", meaning: "reunión", example: "We have a meeting at 3 p.m." },
      { kind: "flashcard", word: "I'm in charge of...", meaning: "Estoy a cargo de...", example: "I'm in charge of the marketing team." },
      { kind: "flashcard", word: "coworker", meaning: "compañero de trabajo", example: "My coworker helped me finish the project." },
      { kind: "flashcard", word: "salary", meaning: "salario", example: "They offered me a good salary." },
      { kind: "flashcard", word: "schedule", meaning: "horario", example: "My schedule is very busy this week." },
      { kind: "flashcard", word: "to apply for a job", meaning: "postularse a un empleo", example: "I want to apply for a job at that company." },
      { kind: "flashcard", word: "overtime", meaning: "horas extra", example: "She worked overtime to finish on time." },
    ],
  },
  {
    theme: "Viajes y transporte",
    cards: [
      { kind: "flashcard", word: "I'd like to book...", meaning: "Quisiera reservar...", example: "I'd like to book a room for two nights." },
      { kind: "flashcard", word: "boarding pass", meaning: "pase de abordar", example: "Don't forget your boarding pass!" },
      { kind: "flashcard", word: "luggage", meaning: "equipaje", example: "My luggage is too heavy." },
      { kind: "flashcard", word: "round trip", meaning: "viaje redondo", example: "I bought a round trip ticket to Madrid." },
      { kind: "flashcard", word: "delayed", meaning: "retrasado", example: "Our flight is delayed two hours." },
      { kind: "flashcard", word: "passport", meaning: "pasaporte", example: "Please show me your passport." },
      { kind: "flashcard", word: "to check in", meaning: "registrarse", example: "We need to check in two hours before the flight." },
      { kind: "flashcard", word: "departure / arrival", meaning: "salida / llegada", example: "The departure is at noon and the arrival at six." },
    ],
  },
  {
    theme: "Emociones y estados",
    cards: [
      { kind: "flashcard", word: "frustrated", meaning: "frustrado", example: "I feel frustrated when things don't work." },
      { kind: "flashcard", word: "relieved", meaning: "aliviado", example: "I was relieved when I passed the test." },
      { kind: "flashcard", word: "overwhelmed", meaning: "abrumado", example: "I feel overwhelmed with so much work." },
      { kind: "flashcard", word: "I can't wait to...", meaning: "Tengo muchas ganas de...", example: "I can't wait to travel to Japan!" },
      { kind: "flashcard", word: "excited", meaning: "emocionado", example: "She is excited about her new job." },
      { kind: "flashcard", word: "nervous", meaning: "nervioso", example: "I'm nervous about the interview." },
      { kind: "flashcard", word: "proud", meaning: "orgulloso", example: "My parents are proud of me." },
      { kind: "flashcard", word: "disappointed", meaning: "decepcionado", example: "He was disappointed with the result." },
    ],
  },
  {
    theme: "Phrasal verbs útiles",
    cards: [
      { kind: "flashcard", word: "give up", meaning: "rendirse", example: "Don't give up! You're doing great." },
      { kind: "flashcard", word: "find out", meaning: "averiguar", example: "I need to find out what happened." },
      { kind: "flashcard", word: "look forward to", meaning: "esperar con ansias", example: "I look forward to hearing from you." },
      { kind: "flashcard", word: "run out of", meaning: "quedarse sin", example: "We ran out of milk this morning." },
      { kind: "flashcard", word: "figure out", meaning: "resolver/entender", example: "I can't figure out this problem." },
      { kind: "flashcard", word: "look up", meaning: "buscar (información)", example: "Look up the word in the dictionary." },
      { kind: "flashcard", word: "turn off", meaning: "apagar", example: "Please turn off the lights." },
      { kind: "flashcard", word: "carry on", meaning: "continuar", example: "Carry on, you're almost done." },
    ],
  },
  {
    theme: "Expresiones (idioms)",
    cards: [
      { kind: "flashcard", word: "a piece of cake", meaning: "muy fácil", example: "The exam was a piece of cake!" },
      { kind: "flashcard", word: "break a leg", meaning: "mucha suerte", example: "Break a leg at your presentation!" },
      { kind: "flashcard", word: "hit the books", meaning: "ponerse a estudiar", example: "I need to hit the books tonight." },
      { kind: "flashcard", word: "under the weather", meaning: "sentirse mal", example: "I'm feeling a bit under the weather today." },
      { kind: "flashcard", word: "on the same page", meaning: "estar de acuerdo", example: "Let's make sure we're on the same page." },
      { kind: "flashcard", word: "hang in there", meaning: "aguanta / no te rindas", example: "Hang in there, it gets easier." },
      { kind: "flashcard", word: "no worries", meaning: "no hay problema", example: "No worries, take your time." },
      { kind: "flashcard", word: "make up your mind", meaning: "decídete", example: "Make up your mind: tea or coffee?" },
    ],
  },
  {
    theme: "Conectores para escribir",
    cards: [
      { kind: "flashcard", word: "However", meaning: "Sin embargo", example: "I studied hard. However, the test was difficult." },
      { kind: "flashcard", word: "Furthermore", meaning: "Además", example: "Furthermore, the company plans to expand." },
      { kind: "flashcard", word: "Although", meaning: "Aunque", example: "Although it was raining, we went out." },
      { kind: "flashcard", word: "Therefore", meaning: "Por lo tanto", example: "He was sick; therefore, he stayed home." },
      { kind: "flashcard", word: "In addition", meaning: "Adicionalmente", example: "In addition, we offer free delivery." },
      { kind: "flashcard", word: "Moreover", meaning: "Es más", example: "Moreover, the plan saves money." },
      { kind: "flashcard", word: "On the other hand", meaning: "Por otro lado", example: "On the other hand, it takes more time." },
      { kind: "flashcard", word: "As a result", meaning: "Como resultado", example: "It rained; as a result, the game was cancelled." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Pool de lecturas (comprensión)
// ---------------------------------------------------------------------------

export const readingTasks: Reading[] = [
  {
    kind: "reading",
    title: "A New Routine",
    passage:
      "Sofia started a new job last month. Now she wakes up at six o'clock and takes the bus to the office. She likes her coworkers, but the mornings are very busy. After work, she studies English for one hour because she wants to travel abroad next year.",
    questions: [
      { prompt: "What time does Sofia wake up?", options: ["At seven", "At six", "At eight", "At nine"], answerIndex: 1, explanation: "El texto dice 'she wakes up at six o'clock'." },
      { prompt: "Why does she study English?", options: ["To find a new job", "Because she is bored", "Because she wants to travel abroad", "To help her coworkers"], answerIndex: 2, explanation: "'she wants to travel abroad next year'." },
    ],
  },
  {
    kind: "reading",
    title: "Weekend Plans",
    passage:
      "Daniel and his friends are going to the mountains this weekend. They will leave on Saturday morning and come back on Sunday night. Daniel is bringing the food, and his friend Mark is bringing a tent. They hope the weather will be sunny.",
    questions: [
      { prompt: "When will they come back?", options: ["Saturday morning", "Sunday night", "Monday", "Friday"], answerIndex: 1, explanation: "'come back on Sunday night'." },
      { prompt: "What is Daniel bringing?", options: ["A tent", "The food", "Nothing", "A car"], answerIndex: 1, explanation: "'Daniel is bringing the food'." },
    ],
  },
  {
    kind: "reading",
    title: "A Small Problem at the Office",
    passage:
      "This morning the printer at the office stopped working. Lisa had an important report to print before a meeting. She asked her coworker for help, but he was busy. Finally, she sent the report by email instead. The meeting went well, and her boss was happy with her work.",
    questions: [
      { prompt: "What was the problem?", options: ["Lisa was late", "The printer stopped working", "The meeting was cancelled", "Her boss was angry"], answerIndex: 1, explanation: "'the printer at the office stopped working'." },
      { prompt: "How did Lisa solve it?", options: ["She fixed the printer", "She cancelled the meeting", "She sent the report by email", "She asked her boss"], answerIndex: 2, explanation: "'she sent the report by email instead'." },
    ],
  },
  {
    kind: "reading",
    title: "Learning to Cook",
    passage:
      "Tom never cooked when he lived with his parents. When he moved to his own apartment, he had to learn. At first, his food was terrible. But he watched videos online and practiced every day. Now, six months later, he can make several delicious meals and even invites friends for dinner.",
    questions: [
      { prompt: "Why did Tom learn to cook?", options: ["His parents asked him", "He moved to his own apartment", "He wanted to be a chef", "His friends taught him"], answerIndex: 1, explanation: "'When he moved to his own apartment, he had to learn'." },
      { prompt: "How did he improve?", options: ["He took a class", "He watched videos and practiced daily", "He hired a cook", "He stopped trying"], answerIndex: 1, explanation: "'he watched videos online and practiced every day'." },
    ],
  },
  {
    kind: "reading",
    title: "The Power of Small Habits",
    passage:
      "Many people think big changes happen overnight, but that is rarely true. Real progress comes from small habits repeated every day. For example, learning ten new words a day may seem like nothing, but after one year it becomes more than three thousand words. The secret is not speed; it is consistency.",
    questions: [
      { prompt: "According to the text, where does real progress come from?", options: ["From big changes overnight", "From small daily habits", "From learning quickly", "From luck"], answerIndex: 1, explanation: "'Real progress comes from small habits repeated every day'." },
      { prompt: "What is 'the secret', according to the author?", options: ["Speed", "Talent", "Consistency", "Money"], answerIndex: 2, explanation: "'it is consistency'." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Pool de escuchas (Web Speech sintetiza el guion)
// ---------------------------------------------------------------------------

export const listeningTasks: Listening[] = [
  {
    kind: "listening",
    scriptLabel: "Una persona se presenta.",
    script:
      "Hello! My name is Anna. I am twenty-five years old and I am from Canada. I work as a nurse at a hospital. In my free time, I like reading and playing tennis.",
    questions: [
      { prompt: "Where is Anna from?", options: ["The United States", "Canada", "England", "Australia"], answerIndex: 1, explanation: "'I am from Canada'." },
      { prompt: "What is her job?", options: ["Teacher", "Doctor", "Nurse", "Engineer"], answerIndex: 2, explanation: "'I work as a nurse'." },
    ],
  },
  {
    kind: "listening",
    scriptLabel: "Un mensaje sobre planes.",
    script:
      "Hi, it's me. I'm calling about Saturday. I can't meet you at noon because I have a doctor's appointment. Can we meet at four o'clock instead? Let me know. Thanks, bye!",
    questions: [
      { prompt: "Why can't the person meet at noon?", options: ["They are tired", "They have a doctor's appointment", "They are at work", "They forgot"], answerIndex: 1, explanation: "'I have a doctor's appointment'." },
      { prompt: "What time do they suggest instead?", options: ["Two o'clock", "Three o'clock", "Four o'clock", "Five o'clock"], answerIndex: 2, explanation: "'Can we meet at four o'clock instead?'." },
    ],
  },
  {
    kind: "listening",
    scriptLabel: "En una cafetería.",
    script:
      "Good morning! Can I have a medium coffee and a chocolate muffin, please? For here, not to go. Oh, and could I get a glass of water too? Thank you very much.",
    questions: [
      { prompt: "What does the customer order to eat?", options: ["A sandwich", "A chocolate muffin", "A salad", "Nothing"], answerIndex: 1, explanation: "'a chocolate muffin'." },
      { prompt: "Is the order to go?", options: ["Yes", "No, for here", "We don't know", "Only the coffee"], answerIndex: 1, explanation: "'For here, not to go'." },
    ],
  },
  {
    kind: "listening",
    scriptLabel: "Indicaciones para llegar a un lugar.",
    script:
      "Sure, I can help you. Go straight for two blocks, then turn left at the bank. The library is on your right, next to the park. It takes about five minutes to walk.",
    questions: [
      { prompt: "Where do you turn left?", options: ["At the park", "At the bank", "At the library", "At the corner store"], answerIndex: 1, explanation: "'turn left at the bank'." },
      { prompt: "What is next to the library?", options: ["The bank", "A school", "The park", "A restaurant"], answerIndex: 2, explanation: "'next to the park'." },
    ],
  },
  {
    kind: "listening",
    scriptLabel: "Un consejo para aprender inglés.",
    script:
      "Here is my best tip for learning English: don't be afraid to make mistakes. Mistakes are part of learning. Speak a little every day, even if it's just to yourself. Little by little, you will feel more confident.",
    questions: [
      { prompt: "What is the main tip?", options: ["Study grammar only", "Don't be afraid to make mistakes", "Never speak until you're perfect", "Travel abroad"], answerIndex: 1, explanation: "'don't be afraid to make mistakes'." },
      { prompt: "How often should you speak?", options: ["Once a week", "Every day", "Only in class", "Never"], answerIndex: 1, explanation: "'Speak a little every day'." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Pool de "ordenar palabras" (producción guiada)
// ---------------------------------------------------------------------------

export const orderTasks: OrderWords[] = [
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["I", "to", "work", "go", "every", "day"], correct: "I go to work every day", translationEs: "Voy al trabajo todos los días." },
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["She", "is", "from", "a", "small", "town"], correct: "She is from a small town", translationEs: "Ella es de un pueblo pequeño." },
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["We", "watched", "a", "movie", "last", "night"], correct: "We watched a movie last night", translationEs: "Vimos una película anoche." },
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["They", "will", "travel", "next", "summer"], correct: "They will travel next summer", translationEs: "Ellos viajarán el próximo verano." },
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["I", "have", "never", "been", "there"], correct: "I have never been there", translationEs: "Nunca he estado ahí." },
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["You", "should", "drink", "more", "water"], correct: "You should drink more water", translationEs: "Deberías tomar más agua." },
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["What", "time", "does", "it", "start"], correct: "What time does it start", translationEs: "¿A qué hora empieza?" },
  { kind: "order-words", prompt: "Ordena las palabras para formar la oración.", words: ["This", "book", "is", "more", "interesting"], correct: "This book is more interesting", translationEs: "Este libro es más interesante." },
];

// ---------------------------------------------------------------------------
// Pool de consignas de producción (escritura / habla)
// ---------------------------------------------------------------------------

export const productionPrompts: string[] = [
  "Preséntate en inglés: nombre, de dónde eres y a qué te dedicas (5–6 oraciones).",
  "Describe tu rutina diaria usando el presente simple.",
  "Cuenta qué hiciste el fin de semana pasado (pasado simple).",
  "Escribe sobre tus planes para el próximo mes (will / going to).",
  "Describe a un miembro de tu familia y por qué es importante para ti.",
  "Describe tu comida favorita y cómo se prepara.",
  "Escribe sobre un viaje que te gustaría hacer y por qué.",
  "Compara tu ciudad con otra que conozcas (comparativos).",
  "Escribe sobre una experiencia que nunca has tenido pero te gustaría (presente perfecto + would).",
  "Da tres consejos a alguien que empieza a aprender inglés (should / must).",
  "Describe tu trabajo o tus estudios y qué es lo que más te gusta.",
  "Escribe un correo corto invitando a un amigo a un evento.",
];

// ---------------------------------------------------------------------------
// Recursos por etapa (de la guía: series, podcasts, lecturas, apps)
// ---------------------------------------------------------------------------

const resourcesByStage: Record<string, DayResource[]> = {
  Básico: [
    { icon: "🎬", label: "Serie", detail: "FRIENDS (temp. 1) — empieza con subtítulos en español y pásate al inglés." },
    { icon: "🎙️", label: "Podcast", detail: "BBC '6 Minute English' o 'ESL Pod' — un episodio corto." },
    { icon: "📖", label: "Lectura", detail: "Oxford Bookworms Starter/Level 1 — 1 capítulo (lee en voz alta)." },
    { icon: "📱", label: "App", detail: "Duolingo 10 min + Anki 5 min para repasar vocabulario." },
  ],
  Intermedio: [
    { icon: "🎬", label: "Serie", detail: "THE OFFICE (USA) o Brooklyn Nine-Nine — un episodio con subtítulos en inglés." },
    { icon: "🎙️", label: "Podcast", detail: "'All Ears English' o BBC '6 Minute English'." },
    { icon: "📖", label: "Lectura", detail: "Penguin Readers Level 2–3 (p. ej. 'Forrest Gump') o Newsela nivel 3–4." },
    { icon: "🎥", label: "YouTube", detail: "'English with Lucy' o 'Learn English with TV Series'." },
  ],
  "Intermedio-Alto": [
    { icon: "🎬", label: "Serie", detail: "Mindhunter o Brooklyn Nine-Nine — intenta sin subtítulos en español." },
    { icon: "🎙️", label: "Podcast", detail: "'Stuff You Should Know' — un tema que te interese." },
    { icon: "📖", label: "Lectura", detail: "'The Old Man and the Sea' (versión simplificada) o artículos de Medium." },
    { icon: "💬", label: "Comunidad", detail: "Lee comentarios en Reddit (r/explainlikeimfive) o usa HelloTalk." },
  ],
};

// ---------------------------------------------------------------------------
// Ensamblador: arma la sesión del día N (cíclico, distinto cada día)
// ---------------------------------------------------------------------------

const DAYS_PER_WEEK = 6; // la guía estudia 6 días y descansa 1

function stageForWeek(week: number): { stage: string; emoji: string; focus: string } {
  if (week <= 8) {
    return { stage: "Básico", emoji: "🟢", focus: "Fundamentos y vida cotidiana" };
  }
  if (week <= 16) {
    return { stage: "Intermedio", emoji: "🔵", focus: "Comunicación real y fluidez" };
  }
  return { stage: "Intermedio-Alto", emoji: "🟣", focus: "Contenido auténtico y autonomía" };
}

/** Devuelve la sesión completa para el día N (N empieza en 1). */
export function getDailySession(dayNumber: number): DailySession {
  const day = Math.max(1, Math.floor(dayNumber));
  const i = day - 1;
  const week = Math.floor(i / DAYS_PER_WEEK) + 1;
  const { stage, emoji, focus } = stageForWeek(week);

  const grammar = grammarLessons[i % grammarLessons.length];
  const vocab = vocabSets[i % vocabSets.length];

  // La comprensión del día incluye una lectura y una escucha.
  const reading = readingTasks[i % readingTasks.length];
  const listening = listeningTasks[i % listeningTasks.length];
  const comprehensionSet: Activity[] = [reading, listening];

  const order = orderTasks[i % orderTasks.length];
  const productionPrompt = productionPrompts[i % productionPrompts.length];

  // Sesión completa: vocabulario → gramática → comprensión → producción guiada.
  const activities: Activity[] = [
    ...vocab.cards,
    ...grammar.practice,
    reading,
    listening,
    order,
  ];

  return {
    day,
    week,
    stage,
    stageEmoji: emoji,
    monthFocus: focus,
    grammar,
    vocab,
    comprehensionSet,
    activities,
    productionPrompt,
    resources: resourcesByStage[stage],
  };
}

/** Ítems de vocabulario del día listos para inyectar al SRS. */
export function srsSeedForDay(dayNumber: number) {
  const { vocab } = getDailySession(dayNumber);
  return vocab.cards.map((c) => ({
    type: "vocab" as const,
    area: "vocab" as const,
    front: c.word,
    back: c.meaning,
    example: c.example,
    conceptKey: `daily-${c.word.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  }));
}
