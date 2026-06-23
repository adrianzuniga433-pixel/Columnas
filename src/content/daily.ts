// Currículo de estudio diario — basado en la Guía de Inglés Autodidacta
// (plan de 6 meses, 1 hora diaria: gramática + vocabulario + escucha/lectura +
// producción). El contenido es original. Cada día combina piezas de varios
// "pools" para que la sesión sea distinta cada vez y avance de forma gradual.

import type {
  Activity,
  DialogueActivity,
  Dictation,
  Flashcard,
  Listening,
  Matching,
  Mcq,
  OrderWords,
  PronunciationActivity,
  Reading,
} from "./types";
import { dialogues } from "./dialogues";

// Frases para la práctica de pronunciación dentro de la sesión.
const pronunciationPool: PronunciationActivity[] = [
  { kind: "pronunciation", text: "Nice to meet you. My name is Carlos.", es: "Mucho gusto. Me llamo Carlos." },
  { kind: "pronunciation", text: "I usually wake up early in the morning.", es: "Normalmente me despierto temprano en la mañana." },
  { kind: "pronunciation", text: "Could I have a coffee with milk, please?", es: "¿Me da un café con leche, por favor?" },
  { kind: "pronunciation", text: "How much does this jacket cost?", es: "¿Cuánto cuesta esta chaqueta?" },
  { kind: "pronunciation", text: "I have never been to the United States.", es: "Nunca he estado en Estados Unidos." },
  { kind: "pronunciation", text: "You should drink more water every day.", es: "Deberías tomar más agua cada día." },
  { kind: "pronunciation", text: "Excuse me, where is the train station?", es: "Disculpe, ¿dónde está la estación de tren?" },
  { kind: "pronunciation", text: "I look forward to hearing from you.", es: "Espero con gusto tu respuesta." },
];

function dialogueActivity(i: number): DialogueActivity {
  const d = dialogues[i % dialogues.length];
  return {
    kind: "dialogue",
    title: d.title,
    situation: d.situation,
    lines: d.lines,
  };
}

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
  grammarPractice: Mcq[];
  vocab: VocabSet;
  comprehensionSet: Activity[];
  dialogue: DialogueActivity;
  pronunciationSet: PronunciationActivity[];
  activities: Activity[];
  productionPrompt: string;
  resources: DayResource[];
  estimatedMinutes: number;
}

// ---------------------------------------------------------------------------
// Pool de gramática (18 lecciones). Cada práctica trae traducción al español.
// La explicación del tema (título + tip) se inyecta automáticamente al armar
// la sesión, así que la retroalimentación siempre explica el tema.
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
      { kind: "mcq", prompt: "Completa con la forma correcta de TO BE.", sentence: "They ___ my friends.", options: ["is", "am", "are", "be"], answerIndex: 2, translationEs: "Ellos son mis amigos.", explanation: "Regla: I → am; he/she/it → is; you/we/they → are. 'they' es plural, por eso 'are'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "My name ___ Carlos.", options: ["am", "is", "are", "be"], answerIndex: 1, translationEs: "Mi nombre es Carlos.", explanation: "'My name' equivale a 'it' (una cosa, singular), y con it se usa 'is'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I ___ very happy today.", options: ["is", "are", "am", "be"], answerIndex: 2, translationEs: "Estoy muy feliz hoy.", explanation: "Con el sujeto 'I' SIEMPRE se usa 'am', nunca is ni are." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We ___ ready to start.", options: ["is", "am", "are", "be"], answerIndex: 2, translationEs: "Estamos listos para empezar.", explanation: "'We' (nosotros) es plural, así que toma 'are'." },
      { kind: "mcq", prompt: "Elige la forma negativa correcta.", sentence: "He ___ at home right now.", options: ["isn't", "aren't", "am not", "don't"], answerIndex: 0, translationEs: "Él no está en casa ahora mismo.", explanation: "Con 'he' (is) la negación es is not = isn't. 'aren't' es para you/we/they." },
      { kind: "mcq", prompt: "Completa con TO BE.", sentence: "You ___ very kind.", options: ["am", "is", "are", "be"], answerIndex: 2, translationEs: "Eres muy amable.", explanation: "Con el sujeto 'you' siempre se usa 'are'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "It ___ a sunny day.", options: ["am", "is", "are", "be"], answerIndex: 1, translationEs: "Es un día soleado.", explanation: "Con 'it' (una cosa, singular) se usa 'is'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "The students ___ in the classroom.", options: ["is", "am", "are", "be"], answerIndex: 2, translationEs: "Los estudiantes están en el salón.", explanation: "'The students' es plural (they), por eso 'are'." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ you from Canada?", options: ["Am", "Is", "Are", "Be"], answerIndex: 2, translationEs: "¿Eres de Canadá?", explanation: "Para preguntar se invierte el orden: con 'you' → 'Are you...?'" },
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
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "She ___ to school by bus.", options: ["go", "goes", "going", "gone"], answerIndex: 1, translationEs: "Ella va a la escuela en autobús.", explanation: "Con he/she/it el verbo lleva -s (o -es). 'go' se vuelve 'goes'." },
      { kind: "mcq", prompt: "Elige la forma correcta de la pregunta.", sentence: "___ you like pizza?", options: ["Does", "Is", "Do", "Are"], answerIndex: 2, translationEs: "¿Te gusta la pizza?", explanation: "Para preguntar usamos do/does + sujeto + verbo. Con 'you' es 'Do'." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "He ___ eat meat.", options: ["don't", "doesn't", "isn't", "not"], answerIndex: 1, translationEs: "Él no come carne.", explanation: "Para negar usamos don't/doesn't + verbo base. Con he/she/it es 'doesn't'." },
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "My parents ___ in another city.", options: ["lives", "live", "living", "to live"], answerIndex: 1, translationEs: "Mis padres viven en otra ciudad.", explanation: "'My parents' es plural (they); con they el verbo NO lleva -s." },
      { kind: "mcq", prompt: "Elige la pregunta correcta.", sentence: "___ she work on weekends?", options: ["Do", "Does", "Is", "Are"], answerIndex: 1, translationEs: "¿Ella trabaja los fines de semana?", explanation: "Con he/she/it la pregunta usa 'Does', y el verbo va en base (sin -s)." },
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "I ___ in a bank.", options: ["work", "works", "working", "worked"], answerIndex: 0, translationEs: "Trabajo en un banco.", explanation: "Con 'I' el verbo va en base, sin -s: work." },
      { kind: "mcq", prompt: "Elige la forma correcta.", sentence: "He ___ TV every evening.", options: ["watch", "watches", "watching", "watched"], answerIndex: 1, translationEs: "Él ve la tele cada noche.", explanation: "Con he/she/it se agrega -es a 'watch' → watches." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "They ___ live here.", options: ["doesn't", "don't", "aren't", "isn't"], answerIndex: 1, translationEs: "Ellos no viven aquí.", explanation: "Negación con they: don't + verbo base." },
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "She ___ her homework after school.", options: ["do", "does", "doing", "did"], answerIndex: 1, translationEs: "Ella hace su tarea después de la escuela.", explanation: "Con 'she' el verbo 'do' se vuelve 'does'." },
    ],
  },
  {
    title: "Presente continuo (am/is/are + -ing)",
    tipEs:
      "El presente continuo describe algo que pasa AHORA mismo. Se forma con am/is/are + verbo terminado en -ing. Suele ir con 'now', 'right now', 'at the moment'.",
    examples: [
      { en: "I am studying English right now.", es: "Estoy estudiando inglés ahora." },
      { en: "They are watching TV.", es: "Ellos están viendo la tele." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con presente continuo.", sentence: "She ___ a book right now.", options: ["read", "reads", "is reading", "reading"], answerIndex: 2, translationEs: "Ella está leyendo un libro ahora mismo.", explanation: "Acción que ocurre ahora = am/is/are + -ing. Con 'she' usamos 'is reading'." },
      { kind: "mcq", prompt: "Elige el auxiliar correcto.", sentence: "We ___ having dinner.", options: ["is", "am", "are", "be"], answerIndex: 2, translationEs: "Estamos cenando.", explanation: "El continuo necesita TO BE como auxiliar. Con 'we' es 'are'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "Listen! The baby ___ .", options: ["cry", "cries", "is crying", "crying"], answerIndex: 2, translationEs: "¡Escucha! El bebé está llorando.", explanation: "'Listen!' indica algo en este momento, así que va continuo: is crying." },
      { kind: "mcq", prompt: "Elige la forma -ing correcta.", sentence: "He is ___ a letter.", options: ["write", "writeing", "writing", "wrote"], answerIndex: 2, translationEs: "Él está escribiendo una carta.", explanation: "Verbos en -e muda pierden la 'e' al agregar -ing: write → writing." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "What ___ you doing?", options: ["is", "do", "are", "does"], answerIndex: 2, translationEs: "¿Qué estás haciendo?", explanation: "En continuo, la pregunta usa TO BE: con 'you' es 'are'." },
      { kind: "mcq", prompt: "Completa con presente continuo.", sentence: "They ___ football in the park now.", options: ["play", "plays", "are playing", "playing"], answerIndex: 2, translationEs: "Ellos están jugando fútbol en el parque ahora.", explanation: "Acción que pasa ahora con 'they': are playing." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I ___ for the bus at the moment.", options: ["wait", "am waiting", "waits", "waiting"], answerIndex: 1, translationEs: "Estoy esperando el autobús en este momento.", explanation: "Con 'I': am + -ing → am waiting." },
      { kind: "mcq", prompt: "Elige la forma -ing correcta.", sentence: "He is ___ on the sofa.", options: ["siting", "sitting", "sit", "sat"], answerIndex: 1, translationEs: "Él está sentado en el sofá.", explanation: "Verbos cortos consonante-vocal-consonante doblan la última: sit → sitting." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "She ___ working today.", options: ["isn't", "aren't", "don't", "doesn't"], answerIndex: 0, translationEs: "Ella no está trabajando hoy.", explanation: "Negación del continuo con 'she': isn't + -ing." },
    ],
  },
  {
    title: "Artículos a / an / the",
    tipEs:
      "Usa 'a' antes de sonido consonante (a car) y 'an' antes de sonido vocal (an apple). 'The' es para algo específico o ya mencionado. Para algo en general (plural/incontable) no se usa artículo.",
    examples: [
      { en: "I have a dog and an umbrella.", es: "Tengo un perro y un paraguas." },
      { en: "The car outside is mine.", es: "El carro de afuera es mío." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "She is ___ engineer.", options: ["a", "an", "the", "—"], answerIndex: 1, translationEs: "Ella es ingeniera.", explanation: "Se usa 'an' antes de SONIDO vocal. 'engineer' empieza con /e/." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "I bought ___ new phone yesterday.", options: ["an", "the", "a", "—"], answerIndex: 2, translationEs: "Compré un teléfono nuevo ayer.", explanation: "'new' empieza con sonido consonante /n/, así que 'a'." },
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "Can you close ___ door, please?", options: ["a", "an", "the", "—"], answerIndex: 2, translationEs: "¿Puedes cerrar la puerta, por favor?", explanation: "Es UNA puerta específica (la que ambos conocemos), por eso 'the'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We waited for ___ hour.", options: ["a", "an", "the", "—"], answerIndex: 1, translationEs: "Esperamos una hora.", explanation: "Importa el SONIDO: en 'hour' la 'h' es muda y suena vocal, por eso 'an'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I like ___ music.", options: ["a", "an", "the", "—"], answerIndex: 3, translationEs: "Me gusta la música.", explanation: "Para algo EN GENERAL (la música como concepto) no se usa artículo." },
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "He is ___ honest man.", options: ["a", "an", "the", "—"], answerIndex: 1, translationEs: "Es un hombre honesto.", explanation: "La 'h' de 'honest' es muda y suena vocal, por eso 'an'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There is ___ apple on the table.", options: ["a", "an", "the", "—"], answerIndex: 1, translationEs: "Hay una manzana en la mesa.", explanation: "'apple' empieza con sonido vocal, por eso 'an'." },
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "She plays ___ piano beautifully.", options: ["a", "an", "the", "—"], answerIndex: 2, translationEs: "Ella toca el piano bellamente.", explanation: "Con instrumentos musicales se usa 'the': the piano." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I don't drink ___ coffee.", options: ["a", "an", "the", "—"], answerIndex: 3, translationEs: "No tomo café.", explanation: "Algo en general e incontable (coffee) no lleva artículo." },
    ],
  },
  {
    title: "There is / There are (hay)",
    tipEs:
      "'There is' = hay (singular). 'There are' = hay (plural). Negativo: there isn't / there aren't. Con incontables se usa there is (there is some water).",
    examples: [
      { en: "There is a book on the table.", es: "Hay un libro en la mesa." },
      { en: "There are three chairs.", es: "Hay tres sillas." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con there is/are.", sentence: "___ a cat in the garden.", options: ["There is", "There are", "It is", "Have"], answerIndex: 0, translationEs: "Hay un gato en el jardín.", explanation: "'a cat' es singular (uno), así que 'There is'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "___ many people at the party.", options: ["There is", "There are", "It is", "Has"], answerIndex: 1, translationEs: "Hay mucha gente en la fiesta.", explanation: "'many people' es plural, por eso 'There are'." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "There ___ any milk in the fridge.", options: ["isn't", "aren't", "not", "don't"], answerIndex: 0, translationEs: "No hay leche en el refrigerador.", explanation: "'milk' es incontable (se trata como singular): there isn't any milk." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ there a bank near here?", options: ["Is", "Are", "Do", "Has"], answerIndex: 0, translationEs: "¿Hay un banco cerca de aquí?", explanation: "Para preguntar invertimos: Is/Are there...? Con singular: Is there." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "There ___ two windows in this room.", options: ["is", "are", "be", "has"], answerIndex: 1, translationEs: "Hay dos ventanas en este cuarto.", explanation: "'two windows' es plural, por eso 'There are'." },
      { kind: "mcq", prompt: "Completa con there is/are.", sentence: "___ some books on the shelf.", options: ["There is", "There are", "It is", "Has"], answerIndex: 1, translationEs: "Hay algunos libros en el estante.", explanation: "'some books' es plural, por eso 'There are'." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ there any sugar?", options: ["Is", "Are", "Do", "Has"], answerIndex: 0, translationEs: "¿Hay azúcar?", explanation: "'sugar' es incontable (se trata como singular): Is there." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "There ___ a problem with the car.", options: ["is", "are", "be", "have"], answerIndex: 0, translationEs: "Hay un problema con el carro.", explanation: "'a problem' es singular, por eso 'There is'." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "There ___ any chairs in the room.", options: ["isn't", "aren't", "not", "doesn't"], answerIndex: 1, translationEs: "No hay sillas en el cuarto.", explanation: "'chairs' es plural, en negación: there aren't." },
    ],
  },
  {
    title: "Pasado simple (regular e irregular)",
    tipEs:
      "Para el pasado, los verbos regulares terminan en -ed (work → worked). Los irregulares cambian (go → went). En negativo/pregunta se usa 'did' y el verbo vuelve a su base.",
    examples: [
      { en: "I watched a movie last night.", es: "Vi una película anoche." },
      { en: "We went to the beach.", es: "Fuimos a la playa." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "Yesterday I ___ a great book.", options: ["read", "readed", "reads", "reading"], answerIndex: 0, translationEs: "Ayer leí un gran libro.", explanation: "'read' es irregular: su pasado se escribe igual pero se pronuncia 'red'. Nunca 'readed'." },
      { kind: "mcq", prompt: "Elige el pasado correcto.", sentence: "They ___ to Spain in 2019.", options: ["goed", "went", "go", "gone"], answerIndex: 1, translationEs: "Fueron a España en 2019.", explanation: "'go' es irregular: pasado 'went'. 'gone' es el participio (con have)." },
      { kind: "mcq", prompt: "Completa la pregunta en pasado.", sentence: "___ you call her yesterday?", options: ["Do", "Did", "Was", "Are"], answerIndex: 1, translationEs: "¿La llamaste ayer?", explanation: "En pasado, las preguntas usan 'Did' + sujeto + verbo base." },
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "She ___ dinner an hour ago.", options: ["cook", "cooks", "cooked", "cooking"], answerIndex: 2, translationEs: "Ella cocinó la cena hace una hora.", explanation: "'cook' es regular: se agrega -ed → cooked." },
      { kind: "mcq", prompt: "Elige la negación correcta.", sentence: "We ___ see the email.", options: ["didn't", "don't", "wasn't", "weren't"], answerIndex: 0, translationEs: "No vimos el correo.", explanation: "Negación en pasado: didn't + verbo base ('didn't see', no 'didn't saw')." },
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "She ___ to the party last night.", options: ["come", "came", "comed", "comes"], answerIndex: 1, translationEs: "Ella vino a la fiesta anoche.", explanation: "'come' es irregular: pasado 'came'." },
      { kind: "mcq", prompt: "Elige el pasado correcto.", sentence: "We ___ a new car last month.", options: ["buy", "buyed", "bought", "buys"], answerIndex: 2, translationEs: "Compramos un carro nuevo el mes pasado.", explanation: "'buy' es irregular: pasado 'bought'." },
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "They ___ in the park yesterday.", options: ["play", "plays", "played", "playing"], answerIndex: 2, translationEs: "Jugaron en el parque ayer.", explanation: "'play' es regular: se agrega -ed → played." },
      { kind: "mcq", prompt: "Completa la pregunta en pasado.", sentence: "Where ___ you go on vacation?", options: ["do", "did", "was", "were"], answerIndex: 1, translationEs: "¿A dónde fuiste de vacaciones?", explanation: "Pregunta en pasado: did + sujeto + verbo base." },
    ],
  },
  {
    title: "Futuro: will y going to",
    tipEs:
      "Usa 'will' para decisiones del momento y predicciones (opinión). Usa 'going to' para planes ya decididos y predicciones con evidencia presente.",
    examples: [
      { en: "I will help you with that.", es: "Te ayudaré con eso." },
      { en: "We are going to travel next month.", es: "Vamos a viajar el próximo mes." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige la mejor opción (plan ya decidido).", sentence: "I ___ visit my family this weekend.", options: ["will", "am going to", "go", "would"], answerIndex: 1, translationEs: "Voy a visitar a mi familia este fin de semana.", explanation: "Es un plan ya decidido, por eso 'going to'." },
      { kind: "mcq", prompt: "Completa (decisión del momento).", sentence: "The phone is ringing. I ___ answer it.", options: ["am going to", "will", "would", "going"], answerIndex: 1, translationEs: "El teléfono está sonando. Lo contestaré.", explanation: "Decides en el momento (no era un plan), por eso 'will'." },
      { kind: "mcq", prompt: "Elige la forma correcta.", sentence: "Look at those clouds! It ___ rain.", options: ["will", "is going to", "goes to", "would"], answerIndex: 1, translationEs: "¡Mira esas nubes! Va a llover.", explanation: "Hay evidencia presente (las nubes), así que 'going to'." },
      { kind: "mcq", prompt: "Completa la predicción.", sentence: "I think she ___ win the game.", options: ["will", "is going to", "go to", "would"], answerIndex: 0, translationEs: "Creo que ella ganará el partido.", explanation: "Opinión/predicción sin evidencia ('I think'), por eso 'will'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "We ___ to start a business next year.", options: ["will", "are going", "going", "go"], answerIndex: 1, translationEs: "Vamos a empezar un negocio el próximo año.", explanation: "'going to' necesita TO BE: are going to." },
      { kind: "mcq", prompt: "Elige la mejor opción.", sentence: "Maybe I ___ call you later.", options: ["am going to", "will", "go to", "would"], answerIndex: 1, translationEs: "Quizá te llame más tarde.", explanation: "'Maybe' indica posibilidad/predicción sin plan, por eso 'will'." },
      { kind: "mcq", prompt: "Elige la mejor opción (plan organizado).", sentence: "She has bought tickets; she ___ travel on Friday.", options: ["will", "is going to", "goes", "would"], answerIndex: 1, translationEs: "Ella va a viajar el viernes.", explanation: "Plan ya organizado (compró boletos), por eso 'going to'." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "I ___ go to the party. I'm too tired.", options: ["will", "won't", "am going", "would"], answerIndex: 1, translationEs: "No iré a la fiesta. Estoy muy cansado.", explanation: "Negación de will: won't (will not)." },
      { kind: "mcq", prompt: "Elige la opción correcta (plan futuro).", sentence: "They ___ build a new school next year.", options: ["will", "are going to", "going to", "go to"], answerIndex: 1, translationEs: "Van a construir una escuela nueva el próximo año.", explanation: "Plan futuro decidido, por eso 'are going to'." },
    ],
  },
  {
    title: "Comparativos y superlativos",
    tipEs:
      "Cortos: adjetivo + -er + than (taller than). Largos (2+ sílabas): more + adjetivo. Superlativos: the + -est / the most. Irregulares: good→better→best, bad→worse→worst.",
    examples: [
      { en: "This car is faster than that one.", es: "Este carro es más rápido que aquel." },
      { en: "She is the best student in class.", es: "Ella es la mejor estudiante de la clase." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa el comparativo.", sentence: "Today is ___ than yesterday.", options: ["hot", "hotter", "hottest", "more hot"], answerIndex: 1, translationEs: "Hoy hace más calor que ayer.", explanation: "'hot' es corto (1 sílaba): comparativo -er, se dobla la t → hotter." },
      { kind: "mcq", prompt: "Elige el comparativo correcto.", sentence: "This phone is ___ than mine.", options: ["expensiver", "more expensive", "most expensive", "expensive"], answerIndex: 1, translationEs: "Este teléfono es más caro que el mío.", explanation: "'expensive' es largo (3 sílabas), por eso 'more expensive'." },
      { kind: "mcq", prompt: "Completa el superlativo.", sentence: "It was the ___ day of my life.", options: ["happier", "more happy", "happiest", "happy"], answerIndex: 2, translationEs: "Fue el día más feliz de mi vida.", explanation: "Superlativo corto: the + -est. 'happy' cambia y→i: the happiest." },
      { kind: "mcq", prompt: "Elige la opción correcta (irregular).", sentence: "Her English is ___ than mine.", options: ["gooder", "more good", "better", "best"], answerIndex: 2, translationEs: "Su inglés es mejor que el mío.", explanation: "'good' es irregular: comparativo 'better' (no 'gooder')." },
      { kind: "mcq", prompt: "Completa el superlativo.", sentence: "This is the ___ restaurant in town.", options: ["better", "best", "good", "more good"], answerIndex: 1, translationEs: "Este es el mejor restaurante del pueblo.", explanation: "Superlativo irregular de good: the best." },
      { kind: "mcq", prompt: "Completa el comparativo.", sentence: "My bag is ___ than yours.", options: ["big", "bigger", "biggest", "more big"], answerIndex: 1, translationEs: "Mi bolsa es más grande que la tuya.", explanation: "'big' es corto y dobla la g: bigger." },
      { kind: "mcq", prompt: "Completa el superlativo (irregular).", sentence: "This is the ___ movie I've ever seen.", options: ["bad", "worse", "worst", "baddest"], answerIndex: 2, translationEs: "Es la peor película que he visto.", explanation: "Superlativo irregular de bad: the worst." },
      { kind: "mcq", prompt: "Elige el comparativo correcto.", sentence: "A train is ___ than a bus.", options: ["comfortabler", "more comfortable", "most comfortable", "comfortable"], answerIndex: 1, translationEs: "Un tren es más cómodo que un autobús.", explanation: "Adjetivo largo: more + comfortable." },
      { kind: "mcq", prompt: "Completa el superlativo.", sentence: "Mount Everest is the ___ mountain in the world.", options: ["high", "higher", "highest", "most high"], answerIndex: 2, translationEs: "El Everest es la montaña más alta del mundo.", explanation: "Superlativo corto: the + -est → the highest." },
    ],
  },
  {
    title: "Presente perfecto (have / has + participio)",
    tipEs:
      "Se forma con have/has + participio. Describe experiencias o acciones con efecto en el presente, sin decir CUÁNDO exactamente. Suele ir con 'ever', 'never', 'already', 'yet', 'just'.",
    examples: [
      { en: "I have visited London twice.", es: "He visitado Londres dos veces." },
      { en: "She has just finished her work.", es: "Ella acaba de terminar su trabajo." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con presente perfecto.", sentence: "I ___ never been to Japan.", options: ["have", "has", "had", "am"], answerIndex: 0, translationEs: "Nunca he estado en Japón.", explanation: "Con I/you/we/they se usa 'have'; con he/she/it 'has'." },
      { kind: "mcq", prompt: "Elige el participio correcto.", sentence: "He has ___ his keys.", options: ["lose", "lost", "losed", "losing"], answerIndex: 1, translationEs: "Él ha perdido sus llaves.", explanation: "Usa el PARTICIPIO. 'lose' es irregular: lose → lost → lost." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ you ever eaten sushi?", options: ["Has", "Have", "Did", "Are"], answerIndex: 1, translationEs: "¿Alguna vez has comido sushi?", explanation: "Pregunta de experiencia ('ever') = presente perfecto. Con 'you': Have." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She ___ already finished the report.", options: ["have", "has", "is", "did"], answerIndex: 1, translationEs: "Ella ya ha terminado el informe.", explanation: "Con he/she/it el auxiliar es 'has'. 'already' es típico del perfecto." },
      { kind: "mcq", prompt: "Completa con el participio.", sentence: "We have ___ this movie before.", options: ["see", "saw", "seen", "seeing"], answerIndex: 2, translationEs: "Hemos visto esta película antes.", explanation: "Participio irregular: see → saw → seen." },
      { kind: "mcq", prompt: "Completa con presente perfecto.", sentence: "They ___ lived here for ten years.", options: ["have", "has", "had", "are"], answerIndex: 0, translationEs: "Han vivido aquí por diez años.", explanation: "Con they: have + participio (lived)." },
      { kind: "mcq", prompt: "Completa con el participio.", sentence: "I haven't ___ my homework yet.", options: ["do", "did", "done", "doing"], answerIndex: 2, translationEs: "Todavía no he hecho mi tarea.", explanation: "Participio de do: done. 'yet' es típico del perfecto." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "He has ___ to Paris three times.", options: ["go", "went", "gone", "been"], answerIndex: 3, translationEs: "Él ha ido a París tres veces.", explanation: "Para experiencias se usa 'have been to' (haber estado). 'gone' implica que aún no regresa." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ she finished the book?", options: ["Have", "Has", "Did", "Is"], answerIndex: 1, translationEs: "¿Ha terminado el libro?", explanation: "Con she el auxiliar es 'has' + participio." },
    ],
  },
  {
    title: "Verbos modales (can / should / must)",
    tipEs:
      "'Can' = poder/saber. 'Should' = debería (consejo). 'Must' = deber (obligación/regla). Después del modal SIEMPRE va el verbo en base (sin to, sin -s, sin -ed).",
    examples: [
      { en: "You should rest more.", es: "Deberías descansar más." },
      { en: "I can speak a little English.", es: "Puedo hablar un poco de inglés." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el modal correcto (consejo).", sentence: "You look tired. You ___ go to bed.", options: ["can", "should", "must", "could"], answerIndex: 1, translationEs: "Te ves cansado. Deberías irte a la cama.", explanation: "Es un consejo, no una orden, por eso 'should'." },
      { kind: "mcq", prompt: "Completa (habilidad).", sentence: "She ___ play the guitar very well.", options: ["must", "should", "can", "would"], answerIndex: 2, translationEs: "Ella sabe tocar la guitarra muy bien.", explanation: "Hablas de una habilidad, por eso 'can'." },
      { kind: "mcq", prompt: "Elige la forma correcta del verbo.", sentence: "We must ___ before the test.", options: ["studying", "studies", "study", "studied"], answerIndex: 2, translationEs: "Debemos estudiar antes del examen.", explanation: "Después de cualquier modal va el verbo en base: study." },
      { kind: "mcq", prompt: "Completa (obligación fuerte).", sentence: "Drivers ___ stop at a red light.", options: ["can", "should", "must", "would"], answerIndex: 2, translationEs: "Los conductores deben detenerse en el semáforo en rojo.", explanation: "Es una regla obligatoria, por eso 'must'." },
      { kind: "mcq", prompt: "Elige la negación correcta.", sentence: "You ___ smoke here; it's not allowed.", options: ["mustn't", "shouldn't", "can", "don't"], answerIndex: 0, translationEs: "No debes fumar aquí; no está permitido.", explanation: "Prohibición fuerte = mustn't (must not)." },
      { kind: "mcq", prompt: "Elige el modal correcto (sugerencia).", sentence: "It's late. We ___ leave now.", options: ["should", "can", "must", "would"], answerIndex: 0, translationEs: "Es tarde. Deberíamos irnos ahora.", explanation: "Es una sugerencia, por eso 'should'." },
      { kind: "mcq", prompt: "Completa (pedir permiso).", sentence: "___ I open the window?", options: ["Must", "Can", "Should", "Would"], answerIndex: 1, translationEs: "¿Puedo abrir la ventana?", explanation: "Para pedir permiso se usa 'Can I...?'" },
      { kind: "mcq", prompt: "Elige la forma correcta del verbo.", sentence: "You should ___ more water.", options: ["drinks", "drinking", "drink", "drank"], answerIndex: 2, translationEs: "Deberías tomar más agua.", explanation: "Después de un modal va el verbo en base: drink." },
      { kind: "mcq", prompt: "Completa (falta de habilidad).", sentence: "I ___ swim; I never learned.", options: ["can", "can't", "must", "should"], answerIndex: 1, translationEs: "No sé nadar; nunca aprendí.", explanation: "Falta de habilidad = can't (cannot)." },
    ],
  },
  {
    title: "Preposiciones de lugar (in / on / at)",
    tipEs:
      "'in' = dentro de un espacio (in a room, in a city). 'on' = sobre una superficie (on the table). 'at' = en un punto específico (at the door, at school).",
    examples: [
      { en: "The keys are on the table.", es: "Las llaves están sobre la mesa." },
      { en: "She is at the bus stop.", es: "Ella está en la parada del autobús." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "The milk is ___ the fridge.", options: ["on", "in", "at", "to"], answerIndex: 1, translationEs: "La leche está en (dentro de) el refrigerador.", explanation: "Dentro de un espacio cerrado = 'in'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There is a picture ___ the wall.", options: ["in", "at", "on", "to"], answerIndex: 2, translationEs: "Hay un cuadro en (sobre) la pared.", explanation: "Sobre una superficie = 'on'." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "I'll meet you ___ the airport.", options: ["in", "on", "at", "to"], answerIndex: 2, translationEs: "Te veré en el aeropuerto.", explanation: "Un punto/lugar específico de encuentro = 'at'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "My books are ___ my bag.", options: ["on", "at", "in", "to"], answerIndex: 2, translationEs: "Mis libros están en (dentro de) mi mochila.", explanation: "Dentro de la mochila (espacio) = 'in'." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "She lives ___ Paris.", options: ["at", "on", "in", "to"], answerIndex: 2, translationEs: "Ella vive en París.", explanation: "Con ciudades y países se usa 'in'." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "He is waiting ___ the bus stop.", options: ["in", "on", "at", "to"], answerIndex: 2, translationEs: "Él espera en la parada del autobús.", explanation: "Un punto específico de encuentro = 'at'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "The cat is ___ the box.", options: ["in", "on", "at", "to"], answerIndex: 0, translationEs: "El gato está dentro de la caja.", explanation: "Dentro de un espacio cerrado = 'in'." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "Your phone is ___ the floor.", options: ["in", "at", "on", "to"], answerIndex: 2, translationEs: "Tu teléfono está en el suelo.", explanation: "Sobre una superficie = 'on'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There are many fish ___ the sea.", options: ["on", "at", "in", "to"], answerIndex: 2, translationEs: "Hay muchos peces en el mar.", explanation: "Dentro de un gran espacio = 'in'." },
    ],
  },
  {
    title: "Adverbios de frecuencia",
    tipEs:
      "Indican qué tan seguido: always (siempre), usually (normalmente), often (a menudo), sometimes (a veces), never (nunca). Van ANTES del verbo principal, pero DESPUÉS del verbo TO BE.",
    examples: [
      { en: "I always drink water in the morning.", es: "Siempre tomo agua en la mañana." },
      { en: "She is never late.", es: "Ella nunca llega tarde." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige la posición correcta.", sentence: "I ___ go to the gym on Mondays.", options: ["go usually", "usually go", "go to usually", "usually"], answerIndex: 1, translationEs: "Normalmente voy al gimnasio los lunes.", explanation: "El adverbio va ANTES del verbo principal: usually go." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "He is ___ happy on Fridays.", options: ["always", "happy always", "is always", "always is"], answerIndex: 0, translationEs: "Él siempre está feliz los viernes.", explanation: "Con TO BE (is), el adverbio va DESPUÉS: is always happy." },
      { kind: "mcq", prompt: "Elige el adverbio adecuado.", sentence: "I ___ eat meat; I'm vegetarian.", options: ["always", "usually", "never", "often"], answerIndex: 2, translationEs: "Nunca como carne; soy vegetariano.", explanation: "Por el contexto corresponde 'never' (nunca)." },
      { kind: "mcq", prompt: "Completa correctamente.", sentence: "They ___ watch TV at night.", options: ["watch sometimes", "sometimes watch", "watch to sometimes", "to sometimes"], answerIndex: 1, translationEs: "Ellos a veces ven la tele en la noche.", explanation: "El adverbio va antes del verbo: sometimes watch." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She ___ arrives on time.", options: ["always", "is always", "always is", "be always"], answerIndex: 0, translationEs: "Ella siempre llega a tiempo.", explanation: "'arrives' es verbo principal (no es TO BE): el adverbio va antes." },
      { kind: "mcq", prompt: "Elige el adverbio adecuado.", sentence: "He ___ drinks coffee; he prefers tea.", options: ["always", "rarely", "usually", "often"], answerIndex: 1, translationEs: "Él rara vez toma café; prefiere té.", explanation: "Por el contraste corresponde 'rarely' (rara vez)." },
      { kind: "mcq", prompt: "Elige la posición correcta.", sentence: "They are ___ busy on Mondays.", options: ["usually", "busy usually", "usually busy and", "to usually"], answerIndex: 0, translationEs: "Normalmente están ocupados los lunes.", explanation: "Con TO BE (are), el adverbio va después: are usually busy." },
      { kind: "mcq", prompt: "Elige la posición correcta.", sentence: "She ___ checks her email in the morning.", options: ["often", "checks often the", "to often", "often the"], answerIndex: 0, translationEs: "Ella revisa su correo a menudo en la mañana.", explanation: "El adverbio va antes del verbo principal: often checks." },
      { kind: "mcq", prompt: "Completa correctamente.", sentence: "I ___ forget my keys.", options: ["sometimes", "forget sometimes", "to sometimes", "sometimes the"], answerIndex: 0, translationEs: "A veces olvido mis llaves.", explanation: "El adverbio 'sometimes' va antes del verbo: sometimes forget." },
    ],
  },
  {
    title: "Contables, incontables y cuantificadores",
    tipEs:
      "Contables = se cuentan (a book, three books). Incontables = no se cuentan (water, money). 'many' con contables, 'much' con incontables, 'a lot of' con ambos. 'some' en afirmaciones, 'any' en negativas/preguntas.",
    examples: [
      { en: "I don't have much money.", es: "No tengo mucho dinero." },
      { en: "There are many cars.", es: "Hay muchos carros." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el cuantificador correcto.", sentence: "How ___ water do you drink?", options: ["many", "much", "some", "a lot"], answerIndex: 1, translationEs: "¿Cuánta agua tomas?", explanation: "'water' es incontable, por eso 'much'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There aren't ___ apples left.", options: ["much", "many", "some", "a"], answerIndex: 1, translationEs: "No quedan muchas manzanas.", explanation: "'apples' es contable plural, por eso 'many'." },
      { kind: "mcq", prompt: "Elige some/any.", sentence: "I need ___ help, please.", options: ["any", "many", "some", "much"], answerIndex: 2, translationEs: "Necesito algo de ayuda, por favor.", explanation: "En afirmaciones y peticiones amables se usa 'some'." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "We don't have ___ sugar.", options: ["some", "any", "many", "a"], answerIndex: 1, translationEs: "No tenemos nada de azúcar.", explanation: "En negaciones se usa 'any'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She has ___ of friends.", options: ["much", "many", "a lot", "a lot of"], answerIndex: 3, translationEs: "Ella tiene muchos amigos.", explanation: "La expresión es 'a lot of' + sustantivo." },
      { kind: "mcq", prompt: "Elige el cuantificador correcto.", sentence: "How ___ books are on the shelf?", options: ["much", "many", "some", "any"], answerIndex: 1, translationEs: "¿Cuántos libros hay en el estante?", explanation: "'books' es contable plural, por eso 'many'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There is ___ bread on the table.", options: ["many", "some", "a", "few"], answerIndex: 1, translationEs: "Hay algo de pan en la mesa.", explanation: "'bread' es incontable y es afirmación: 'some'." },
      { kind: "mcq", prompt: "Elige el cuantificador correcto.", sentence: "I don't have ___ time today.", options: ["many", "much", "some", "a"], answerIndex: 1, translationEs: "No tengo mucho tiempo hoy.", explanation: "'time' es incontable, por eso 'much'." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "Are there ___ eggs in the fridge?", options: ["much", "any", "some", "a"], answerIndex: 1, translationEs: "¿Hay huevos en el refrigerador?", explanation: "En preguntas se usa 'any'." },
    ],
  },
  {
    title: "Condicionales (1º y 2º)",
    tipEs:
      "1º condicional (real/probable): If + presente, will + verbo. 2º condicional (hipotético): If + pasado, would + verbo. Tras 'if' nunca va 'will'.",
    examples: [
      { en: "If it rains, I will stay home.", es: "Si llueve, me quedaré en casa." },
      { en: "If I had money, I would travel.", es: "Si tuviera dinero, viajaría." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If you study, you ___ pass the exam.", options: ["would", "will", "are", "passed"], answerIndex: 1, translationEs: "Si estudias, aprobarás el examen.", explanation: "1º condicional: If + presente (study), will + verbo (will pass)." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "If I ___ you, I would apologize.", options: ["am", "was", "were", "be"], answerIndex: 2, translationEs: "Si yo fuera tú, me disculparía.", explanation: "En el 2º condicional se usa 'were' para todas las personas." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She would buy a house if she ___ rich.", options: ["is", "were", "will be", "be"], answerIndex: 1, translationEs: "Ella compraría una casa si fuera rica.", explanation: "Situación imaginaria = 2º condicional con 'were'." },
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If it ___ tomorrow, we'll cancel the trip.", options: ["rains", "will rain", "rained", "would rain"], answerIndex: 0, translationEs: "Si llueve mañana, cancelaremos el viaje.", explanation: "Regla de oro: tras 'if' nunca va 'will'; va el presente (rains)." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "If I had more time, I ___ learn the piano.", options: ["will", "would", "can", "am"], answerIndex: 1, translationEs: "Si tuviera más tiempo, aprendería piano.", explanation: "2º condicional: If + pasado (had), would + verbo base." },
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If we leave now, we ___ catch the train.", options: ["would", "will", "are", "caught"], answerIndex: 1, translationEs: "Si salimos ahora, alcanzaremos el tren.", explanation: "1º condicional: If + presente, will + verbo." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "I would travel more if I ___ more money.", options: ["have", "had", "will have", "would have"], answerIndex: 1, translationEs: "Viajaría más si tuviera más dinero.", explanation: "2º condicional: If + pasado (had)." },
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If she ___ harder, she will get the job.", options: ["works", "will work", "worked", "would work"], answerIndex: 0, translationEs: "Si trabaja más duro, conseguirá el empleo.", explanation: "Tras 'if' va el presente: works (nunca 'will')." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "If I were taller, I ___ play basketball.", options: ["will", "would", "can", "am"], answerIndex: 1, translationEs: "Si fuera más alto, jugaría baloncesto.", explanation: "2º condicional: would + verbo base." },
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
      { kind: "mcq", prompt: "Elige la palabra WH- correcta.", sentence: "___ is your birthday?", options: ["Where", "When", "Who", "How"], answerIndex: 1, translationEs: "¿Cuándo es tu cumpleaños?", explanation: "Pregunta por tiempo: When." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ do you go to work?", options: ["What", "Who", "How", "Which"], answerIndex: 2, translationEs: "¿Cómo vas al trabajo?", explanation: "Pregunta por el medio/manera: How." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "___ does this jacket cost?", options: ["How much", "How many", "What time", "Where"], answerIndex: 0, translationEs: "¿Cuánto cuesta esta chaqueta?", explanation: "Para precio (incontable): How much." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ is that woman? She's my teacher.", options: ["What", "Who", "Where", "When"], answerIndex: 1, translationEs: "¿Quién es esa mujer? Es mi maestra.", explanation: "Pregunta por una persona: Who." },
      { kind: "mcq", prompt: "Elige la palabra correcta.", sentence: "___ books do you have?", options: ["How much", "How many", "What time", "Why"], answerIndex: 1, translationEs: "¿Cuántos libros tienes?", explanation: "Para algo contable (books): How many." },
      { kind: "mcq", prompt: "Elige la palabra WH- correcta.", sentence: "___ are you crying?", options: ["What", "Why", "Who", "Which"], answerIndex: 1, translationEs: "¿Por qué estás llorando?", explanation: "Pregunta por la razón: Why." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ do you spell your name?", options: ["What", "Who", "How", "Where"], answerIndex: 2, translationEs: "¿Cómo se escribe tu nombre?", explanation: "Pregunta por la manera: How." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "___ color do you prefer?", options: ["What", "Who", "When", "Why"], answerIndex: 0, translationEs: "¿Qué color prefieres?", explanation: "Para preguntar por una cosa/elección: What." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ are you going?", options: ["What", "Who", "Where", "Why"], answerIndex: 2, translationEs: "¿A dónde vas?", explanation: "Pregunta por lugar/destino: Where." },
    ],
  },
  {
    title: "Pronombres de objeto (me, him, her, us, them)",
    tipEs:
      "Los pronombres de sujeto (I, he, she, we, they) hacen la acción. Los de objeto (me, him, her, us, them) la reciben y van después del verbo o preposición: I see her / Call me.",
    examples: [
      { en: "Can you help me?", es: "¿Puedes ayudarme?" },
      { en: "I gave the book to him.", es: "Le di el libro a él." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el pronombre de objeto.", sentence: "I really like ___ .", options: ["she", "her", "hers", "herself"], answerIndex: 1, translationEs: "Ella me gusta mucho.", explanation: "Después del verbo va el pronombre de OBJETO: 'her' (no 'she', que es sujeto)." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "Please call ___ tomorrow.", options: ["I", "my", "me", "mine"], answerIndex: 2, translationEs: "Por favor llámame mañana.", explanation: "El objeto del verbo 'call' es 'me' (a mí)." },
      { kind: "mcq", prompt: "Elige el pronombre correcto.", sentence: "We invited ___ to the party.", options: ["they", "them", "their", "theirs"], answerIndex: 1, translationEs: "Los invitamos a la fiesta.", explanation: "Objeto del verbo 'invited' = 'them' (a ellos)." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "Can you give this to ___ ?", options: ["he", "his", "him", "himself"], answerIndex: 2, translationEs: "¿Puedes darle esto a él?", explanation: "Después de la preposición 'to' va el objeto: 'him'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She helped ___ with the homework.", options: ["we", "us", "our", "ours"], answerIndex: 1, translationEs: "Ella nos ayudó con la tarea.", explanation: "Objeto del verbo 'helped' = 'us' (a nosotros)." },
      { kind: "mcq", prompt: "Elige el pronombre de objeto.", sentence: "He gave ___ a gift.", options: ["I", "me", "my", "mine"], answerIndex: 1, translationEs: "Él me dio un regalo.", explanation: "Quien recibe la acción es 'me' (a mí)." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "I saw ___ at the mall yesterday.", options: ["she", "her", "hers", "herself"], answerIndex: 1, translationEs: "La vi en el centro comercial ayer.", explanation: "Objeto del verbo 'saw': her." },
      { kind: "mcq", prompt: "Elige el pronombre correcto.", sentence: "Listen to ___ carefully.", options: ["we", "us", "our", "ours"], answerIndex: 1, translationEs: "Escúchanos con atención.", explanation: "Tras la preposición 'to' va el objeto: us." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "Their parents visit ___ every summer.", options: ["they", "them", "their", "theirs"], answerIndex: 1, translationEs: "Sus padres los visitan cada verano.", explanation: "Objeto del verbo 'visit': them." },
    ],
  },
  {
    title: "Posesivos (my, your... y el genitivo 's)",
    tipEs:
      "Los adjetivos posesivos indican de quién es algo: my, your, his, her, our, their + sustantivo. Para personas también se usa 's: Maria's car (el carro de María).",
    examples: [
      { en: "This is my house.", es: "Esta es mi casa." },
      { en: "That is John's car.", es: "Ese es el carro de John." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el posesivo correcto.", sentence: "This is ___ book, not yours.", options: ["I", "me", "my", "mine"], answerIndex: 2, translationEs: "Este es mi libro, no el tuyo.", explanation: "Antes del sustantivo va el adjetivo posesivo 'my'." },
      { kind: "mcq", prompt: "Completa con el genitivo.", sentence: "That is ___ bicycle.", options: ["Sara", "Saras", "Sara's", "Saras'"], answerIndex: 2, translationEs: "Esa es la bicicleta de Sara.", explanation: "Para indicar posesión de una persona se usa 's: Sara's bicycle." },
      { kind: "mcq", prompt: "Elige el posesivo correcto.", sentence: "The dog wagged ___ tail.", options: ["it's", "its", "his", "her"], answerIndex: 1, translationEs: "El perro movió su cola.", explanation: "'its' (sin apóstrofo) es el posesivo. 'it's' significa 'it is'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "They love ___ new apartment.", options: ["they", "them", "their", "theirs"], answerIndex: 2, translationEs: "Ellos aman su nuevo departamento.", explanation: "Antes del sustantivo va 'their' (su, de ellos)." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "Is this ___ phone?", options: ["you", "your", "yours", "you're"], answerIndex: 1, translationEs: "¿Es este tu teléfono?", explanation: "Antes del sustantivo va 'your'. 'yours' va solo, sin sustantivo." },
      { kind: "mcq", prompt: "Elige el posesivo correcto.", sentence: "___ name is Ana.", options: ["She", "Her", "Hers", "She's"], answerIndex: 1, translationEs: "Su nombre es Ana.", explanation: "Antes del sustantivo va el adjetivo posesivo 'her'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "This house is ___ .", options: ["our", "ours", "us", "we"], answerIndex: 1, translationEs: "Esta casa es nuestra.", explanation: "Sin sustantivo después va el pronombre posesivo 'ours'." },
      { kind: "mcq", prompt: "Completa con el genitivo.", sentence: "These are ___ toys.", options: ["the children", "the childrens", "the children's", "the childrens'"], answerIndex: 2, translationEs: "Estos son los juguetes de los niños.", explanation: "Plural irregular 'children' + 's: the children's." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "Is this pen ___ or mine?", options: ["you", "your", "yours", "you're"], answerIndex: 2, translationEs: "¿Este bolígrafo es tuyo o mío?", explanation: "Sin sustantivo después va el pronombre posesivo 'yours'." },
    ],
  },
  {
    title: "Preposiciones de tiempo (in / on / at)",
    tipEs:
      "'at' para horas (at 5 o'clock). 'on' para días y fechas (on Monday, on July 3rd). 'in' para meses, años y partes del día (in May, in 2020, in the morning).",
    examples: [
      { en: "The class starts at nine.", es: "La clase empieza a las nueve." },
      { en: "I was born in 1995.", es: "Nací en 1995." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige la preposición de tiempo.", sentence: "I wake up ___ 7 a.m.", options: ["in", "on", "at", "to"], answerIndex: 2, translationEs: "Me despierto a las 7 a.m.", explanation: "Para horas exactas se usa 'at': at 7 a.m." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We have a meeting ___ Monday.", options: ["in", "on", "at", "to"], answerIndex: 1, translationEs: "Tenemos una reunión el lunes.", explanation: "Para días de la semana se usa 'on': on Monday." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "My birthday is ___ December.", options: ["in", "on", "at", "to"], answerIndex: 0, translationEs: "Mi cumpleaños es en diciembre.", explanation: "Para meses se usa 'in': in December." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "She studies ___ the morning.", options: ["at", "on", "in", "to"], answerIndex: 2, translationEs: "Ella estudia en la mañana.", explanation: "Para partes del día se usa 'in': in the morning (excepción: at night)." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "The store closes ___ midnight.", options: ["in", "on", "at", "to"], answerIndex: 2, translationEs: "La tienda cierra a medianoche.", explanation: "Con 'midnight' y 'night' se usa 'at': at midnight." },
      { kind: "mcq", prompt: "Elige la preposición de tiempo.", sentence: "The movie starts ___ 8 o'clock.", options: ["in", "on", "at", "to"], answerIndex: 2, translationEs: "La película empieza a las 8.", explanation: "Horas exactas se usan con 'at'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We travel ___ the summer.", options: ["in", "on", "at", "to"], answerIndex: 0, translationEs: "Viajamos en el verano.", explanation: "Estaciones del año se usan con 'in'." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "Her party is ___ Saturday.", options: ["in", "on", "at", "to"], answerIndex: 1, translationEs: "Su fiesta es el sábado.", explanation: "Días de la semana se usan con 'on'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "My grandparents got married ___ 1980.", options: ["in", "on", "at", "to"], answerIndex: 0, translationEs: "Mis abuelos se casaron en 1980.", explanation: "Años se usan con 'in': in 1980." },
    ],
  },
  {
    title: "Pasado continuo (was/were + -ing)",
    tipEs:
      "Describe una acción en progreso en el pasado. Se forma con was/were + verbo -ing. Suele interrumpirse por otra acción en pasado simple: I was sleeping when the phone rang.",
    examples: [
      { en: "I was watching TV at 9 p.m.", es: "Estaba viendo la tele a las 9 p.m." },
      { en: "They were studying when I arrived.", es: "Estaban estudiando cuando llegué." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con pasado continuo.", sentence: "She ___ cooking when I called.", options: ["is", "was", "were", "did"], answerIndex: 1, translationEs: "Ella estaba cocinando cuando llamé.", explanation: "Con she se usa 'was' + -ing: was cooking." },
      { kind: "mcq", prompt: "Elige el auxiliar correcto.", sentence: "We ___ walking in the park.", options: ["was", "were", "are", "did"], answerIndex: 1, translationEs: "Estábamos caminando en el parque.", explanation: "Con we/you/they se usa 'were'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "It ___ raining all morning.", options: ["was", "were", "is", "did"], answerIndex: 0, translationEs: "Estuvo lloviendo toda la mañana.", explanation: "Con it se usa 'was' + -ing." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "What ___ you doing at noon?", options: ["was", "were", "did", "are"], answerIndex: 1, translationEs: "¿Qué estabas haciendo al mediodía?", explanation: "Pregunta en pasado continuo con 'you': were." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "He was ___ when the lights went out.", options: ["read", "reads", "reading", "readed"], answerIndex: 2, translationEs: "Él estaba leyendo cuando se fue la luz.", explanation: "Tras was/were va el verbo en -ing: reading." },
      { kind: "mcq", prompt: "Completa con pasado continuo.", sentence: "They ___ sleeping when I got home.", options: ["was", "were", "are", "did"], answerIndex: 1, translationEs: "Estaban durmiendo cuando llegué a casa.", explanation: "Con they se usa 'were' + -ing." },
      { kind: "mcq", prompt: "Elige el auxiliar correcto.", sentence: "I ___ cooking at 7 p.m.", options: ["was", "were", "am", "did"], answerIndex: 0, translationEs: "Estaba cocinando a las 7 p.m.", explanation: "Con I se usa 'was' + -ing." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "While she ___ studying, the lights went out.", options: ["was", "were", "is", "did"], answerIndex: 0, translationEs: "Mientras ella estudiaba, se fue la luz.", explanation: "Acción en progreso con she: was studying." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "We ___ watching a movie when you called.", options: ["was", "were", "are", "did"], answerIndex: 1, translationEs: "Estábamos viendo una película cuando llamaste.", explanation: "Con we se usa 'were' + -ing." },
    ],
  },
  {
    title: "Used to (solía / antes)",
    tipEs:
      "'Used to' habla de hábitos o estados del pasado que ya no son ciertos: I used to play soccer (antes jugaba). En negativo y pregunta se usa 'use to': Did you use to...? / I didn't use to...",
    examples: [
      { en: "I used to live in a small town.", es: "Antes vivía en un pueblo pequeño." },
      { en: "She used to drink coffee, but not anymore.", es: "Ella solía tomar café, pero ya no." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa la oración.", sentence: "I ___ play the piano as a child.", options: ["use to", "used to", "used", "am used to"], answerIndex: 1, translationEs: "Antes tocaba el piano de niño.", explanation: "En afirmativo: 'used to' + verbo base." },
      { kind: "mcq", prompt: "Elige la forma correcta (pregunta).", sentence: "___ you use to smoke?", options: ["Do", "Did", "Are", "Were"], answerIndex: 1, translationEs: "¿Antes fumabas?", explanation: "La pregunta usa 'Did' + use to (sin -d)." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "He didn't ___ like vegetables.", options: ["used to", "use to", "uses to", "using to"], answerIndex: 1, translationEs: "Antes no le gustaban las verduras.", explanation: "En negativo: didn't + 'use to' (sin -d)." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "We ___ to have a dog.", options: ["use", "used", "using", "uses"], answerIndex: 1, translationEs: "Antes teníamos un perro.", explanation: "Afirmativo: 'used to'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There ___ to be a cinema here.", options: ["use", "used", "uses", "using"], answerIndex: 1, translationEs: "Antes había un cine aquí.", explanation: "Afirmativo con 'there': there used to be." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "She ___ have long hair.", options: ["use to", "used to", "uses to", "using to"], answerIndex: 1, translationEs: "Antes tenía el pelo largo.", explanation: "Afirmativo: used to + verbo base." },
      { kind: "mcq", prompt: "Elige la forma correcta (pregunta).", sentence: "___ they use to live in Madrid?", options: ["Do", "Did", "Were", "Are"], answerIndex: 1, translationEs: "¿Antes vivían en Madrid?", explanation: "La pregunta usa 'Did' + use to (sin -d)." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "I didn't ___ to like coffee.", options: ["used", "use", "using", "uses"], answerIndex: 1, translationEs: "Antes no me gustaba el café.", explanation: "Negativo: didn't + use to (sin -d)." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "We ___ to walk to school every day.", options: ["use", "used", "using", "uses"], answerIndex: 1, translationEs: "Antes caminábamos a la escuela cada día.", explanation: "Afirmativo: used to." },
    ],
  },
  {
    title: "Cláusulas relativas (who / which / that)",
    tipEs:
      "Unen información sobre un sustantivo. 'who' para personas, 'which' para cosas, 'that' para ambos. The man who called... / the book which/that I read...",
    examples: [
      { en: "The woman who lives next door is a doctor.", es: "La mujer que vive al lado es doctora." },
      { en: "This is the book that changed my life.", es: "Este es el libro que cambió mi vida." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el relativo correcto.", sentence: "The man ___ called you is my uncle.", options: ["which", "who", "where", "what"], answerIndex: 1, translationEs: "El hombre que te llamó es mi tío.", explanation: "Para personas se usa 'who'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "I have a phone ___ takes great photos.", options: ["who", "which", "where", "whose"], answerIndex: 1, translationEs: "Tengo un teléfono que toma excelentes fotos.", explanation: "Para cosas se usa 'which' (o 'that')." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She is the teacher ___ helped me.", options: ["which", "who", "what", "where"], answerIndex: 1, translationEs: "Ella es la maestra que me ayudó.", explanation: "Persona → 'who'." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "This is the house ___ we grew up.", options: ["which", "who", "where", "that"], answerIndex: 2, translationEs: "Esta es la casa donde crecimos.", explanation: "Para lugares se usa 'where'." },
      { kind: "mcq", prompt: "Elige la opción que sirve para ambos.", sentence: "The movie ___ we saw was great.", options: ["who", "where", "that", "whose"], answerIndex: 2, translationEs: "La película que vimos estuvo genial.", explanation: "'that' sirve para personas y cosas." },
      { kind: "mcq", prompt: "Elige el relativo correcto.", sentence: "The book ___ I bought is interesting.", options: ["who", "which", "where", "whose"], answerIndex: 1, translationEs: "El libro que compré es interesante.", explanation: "Para cosas se usa 'which' (o 'that')." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "That's the restaurant ___ we had lunch.", options: ["which", "who", "where", "that"], answerIndex: 2, translationEs: "Ese es el restaurante donde almorzamos.", explanation: "Para lugares se usa 'where'." },
      { kind: "mcq", prompt: "Elige el relativo correcto.", sentence: "I know a girl ___ speaks five languages.", options: ["which", "who", "where", "what"], answerIndex: 1, translationEs: "Conozco a una chica que habla cinco idiomas.", explanation: "Para personas se usa 'who'." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She is the artist ___ paintings I love.", options: ["who", "which", "whose", "where"], answerIndex: 2, translationEs: "Es la artista cuyas pinturas amo.", explanation: "Para posesión se usa 'whose' (cuyo/a)." },
    ],
  },
  {
    title: "Voz pasiva (be + participio)",
    tipEs:
      "Se usa cuando importa más la acción que quién la hace. Se forma con el verbo TO BE + participio: The house was built in 1990. El objeto pasa a ser el sujeto.",
    examples: [
      { en: "English is spoken all over the world.", es: "El inglés se habla en todo el mundo." },
      { en: "The cake was made by my mother.", es: "El pastel fue hecho por mi madre." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa la voz pasiva (presente).", sentence: "These cars ___ made in Japan.", options: ["is", "are", "was", "be"], answerIndex: 1, translationEs: "Estos carros se hacen en Japón.", explanation: "Pasiva presente con plural: are + participio (made)." },
      { kind: "mcq", prompt: "Elige el participio correcto.", sentence: "The letter was ___ yesterday.", options: ["send", "sent", "sended", "sending"], answerIndex: 1, translationEs: "La carta fue enviada ayer.", explanation: "send → sent (participio) en pasiva pasada." },
      { kind: "mcq", prompt: "Completa la voz pasiva (pasado).", sentence: "The bridge ___ built in 1980.", options: ["is", "was", "were", "did"], answerIndex: 1, translationEs: "El puente fue construido en 1980.", explanation: "Pasiva pasada singular: was + participio (built)." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "Spanish ___ spoken in Mexico.", options: ["is", "are", "was", "be"], answerIndex: 0, translationEs: "El español se habla en México.", explanation: "Pasiva presente singular: is + participio (spoken)." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "The room ___ cleaned every day.", options: ["is", "are", "be", "was"], answerIndex: 0, translationEs: "El cuarto se limpia todos los días.", explanation: "Pasiva presente (rutina) singular: is cleaned." },
      { kind: "mcq", prompt: "Completa la voz pasiva (presente).", sentence: "Coffee ___ grown in Colombia.", options: ["is", "are", "was", "be"], answerIndex: 0, translationEs: "El café se cultiva en Colombia.", explanation: "Pasiva presente singular: is + participio (grown)." },
      { kind: "mcq", prompt: "Completa la voz pasiva (pasado).", sentence: "The windows ___ cleaned last week.", options: ["was", "were", "is", "are"], answerIndex: 1, translationEs: "Las ventanas fueron limpiadas la semana pasada.", explanation: "Pasiva pasada plural: were + participio." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "This song ___ written by a famous singer.", options: ["is", "was", "were", "be"], answerIndex: 1, translationEs: "Esta canción fue escrita por un cantante famoso.", explanation: "Pasiva pasada singular: was + written." },
      { kind: "mcq", prompt: "Completa la voz pasiva (presente).", sentence: "Many languages ___ spoken in India.", options: ["is", "are", "was", "be"], answerIndex: 1, translationEs: "Se hablan muchos idiomas en India.", explanation: "Pasiva presente plural: are + spoken." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Pool de vocabulario por tema (18 temas, 8 tarjetas cada uno)
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
  {
    theme: "Clima y estaciones",
    cards: [
      { kind: "flashcard", word: "What's the weather like?", meaning: "¿Cómo está el clima?", example: "What's the weather like today?" },
      { kind: "flashcard", word: "sunny", meaning: "soleado", example: "It's warm and sunny today." },
      { kind: "flashcard", word: "rainy / it's raining", meaning: "lluvioso / está lloviendo", example: "Take an umbrella; it's raining." },
      { kind: "flashcard", word: "cloudy", meaning: "nublado", example: "The sky is grey and cloudy." },
      { kind: "flashcard", word: "windy", meaning: "ventoso", example: "It's very windy near the coast." },
      { kind: "flashcard", word: "spring / summer", meaning: "primavera / verano", example: "I love hiking in spring and swimming in summer." },
      { kind: "flashcard", word: "autumn (fall) / winter", meaning: "otoño / invierno", example: "It gets cold in autumn and snows in winter." },
      { kind: "flashcard", word: "It's freezing", meaning: "Hace mucho frío", example: "Wear a coat, it's freezing outside!" },
    ],
  },
  {
    theme: "Salud y cuerpo",
    cards: [
      { kind: "flashcard", word: "How are you feeling?", meaning: "¿Cómo te sientes?", example: "How are you feeling today?" },
      { kind: "flashcard", word: "I have a headache", meaning: "Me duele la cabeza", example: "I can't focus; I have a headache." },
      { kind: "flashcard", word: "I have a cold", meaning: "Tengo un resfriado", example: "I have a cold, so I'm staying home." },
      { kind: "flashcard", word: "to feel sick", meaning: "sentirse mal/enfermo", example: "She feels sick after the trip." },
      { kind: "flashcard", word: "appointment", meaning: "cita (médica)", example: "I have a doctor's appointment at noon." },
      { kind: "flashcard", word: "to rest", meaning: "descansar", example: "You should rest and drink water." },
      { kind: "flashcard", word: "It hurts", meaning: "Me duele", example: "My back hurts when I sit too long." },
      { kind: "flashcard", word: "Get well soon", meaning: "Que te mejores pronto", example: "I heard you're sick. Get well soon!" },
    ],
  },
  {
    theme: "Compras y dinero",
    cards: [
      { kind: "flashcard", word: "How much is it?", meaning: "¿Cuánto cuesta?", example: "Excuse me, how much is it?" },
      { kind: "flashcard", word: "expensive / cheap", meaning: "caro / barato", example: "This jacket is too expensive, but that one is cheap." },
      { kind: "flashcard", word: "on sale / discount", meaning: "en oferta / descuento", example: "These shoes are on sale with a 20% discount." },
      { kind: "flashcard", word: "to pay by card / cash", meaning: "pagar con tarjeta / efectivo", example: "Can I pay by card or only cash?" },
      { kind: "flashcard", word: "receipt", meaning: "recibo / ticket", example: "Can I have a receipt, please?" },
      { kind: "flashcard", word: "to afford", meaning: "poder pagar/permitirse", example: "I can't afford a new car right now." },
      { kind: "flashcard", word: "refund", meaning: "reembolso", example: "I'd like a refund for this item." },
      { kind: "flashcard", word: "Can I try it on?", meaning: "¿Me lo puedo probar?", example: "I like this shirt. Can I try it on?" },
    ],
  },
  {
    theme: "Tecnología e internet",
    cards: [
      { kind: "flashcard", word: "to download / upload", meaning: "descargar / subir", example: "Can you download this app for me?" },
      { kind: "flashcard", word: "to log in / log out", meaning: "iniciar / cerrar sesión", example: "Log in with your email and password." },
      { kind: "flashcard", word: "password", meaning: "contraseña", example: "I forgot my password again." },
      { kind: "flashcard", word: "to charge (the phone)", meaning: "cargar (el teléfono)", example: "I need to charge my phone; it's at 5%." },
      { kind: "flashcard", word: "screen", meaning: "pantalla", example: "The screen is too bright at night." },
      { kind: "flashcard", word: "to update", meaning: "actualizar", example: "You should update the app to the latest version." },
      { kind: "flashcard", word: "Wi-Fi connection", meaning: "conexión Wi-Fi", example: "The Wi-Fi connection is very slow here." },
      { kind: "flashcard", word: "device", meaning: "dispositivo", example: "You can open it on any device." },
    ],
  },
  {
    theme: "Pasatiempos y tiempo libre",
    cards: [
      { kind: "flashcard", word: "In my free time...", meaning: "En mi tiempo libre...", example: "In my free time, I like to read." },
      { kind: "flashcard", word: "I'm into...", meaning: "Me gusta mucho / me interesa...", example: "I'm into photography these days." },
      { kind: "flashcard", word: "to go for a walk", meaning: "salir a caminar", example: "Let's go for a walk in the park." },
      { kind: "flashcard", word: "to work out", meaning: "hacer ejercicio", example: "I work out three times a week." },
      { kind: "flashcard", word: "to hang out", meaning: "pasar el rato", example: "We hang out on weekends." },
      { kind: "flashcard", word: "hobby", meaning: "pasatiempo", example: "Cooking is my favorite hobby." },
      { kind: "flashcard", word: "to watch a series", meaning: "ver una serie", example: "I'm watching a great series right now." },
      { kind: "flashcard", word: "to take up (a hobby)", meaning: "empezar (un pasatiempo)", example: "I want to take up painting." },
    ],
  },
  {
    theme: "La ciudad y direcciones",
    cards: [
      { kind: "flashcard", word: "Excuse me, where is...?", meaning: "Disculpe, ¿dónde está...?", example: "Excuse me, where is the train station?" },
      { kind: "flashcard", word: "go straight", meaning: "sigue recto", example: "Go straight for two blocks." },
      { kind: "flashcard", word: "turn left / right", meaning: "gira a la izquierda / derecha", example: "Turn right at the bank." },
      { kind: "flashcard", word: "next to / across from", meaning: "junto a / enfrente de", example: "The shop is next to the pharmacy." },
      { kind: "flashcard", word: "corner", meaning: "esquina", example: "The café is on the corner." },
      { kind: "flashcard", word: "traffic light", meaning: "semáforo", example: "Stop at the traffic light." },
      { kind: "flashcard", word: "neighborhood", meaning: "barrio / colonia", example: "I live in a quiet neighborhood." },
      { kind: "flashcard", word: "It's around the corner", meaning: "Está a la vuelta", example: "The bakery is around the corner." },
    ],
  },
  {
    theme: "La casa y los muebles",
    cards: [
      { kind: "flashcard", word: "living room", meaning: "sala", example: "We watch TV in the living room." },
      { kind: "flashcard", word: "bedroom", meaning: "recámara / dormitorio", example: "My bedroom is small but cozy." },
      { kind: "flashcard", word: "kitchen", meaning: "cocina", example: "She is cooking in the kitchen." },
      { kind: "flashcard", word: "bathroom", meaning: "baño", example: "The bathroom is at the end of the hall." },
      { kind: "flashcard", word: "furniture", meaning: "muebles", example: "We bought new furniture for the apartment." },
      { kind: "flashcard", word: "to rent", meaning: "rentar / alquilar", example: "They rent a flat downtown." },
      { kind: "flashcard", word: "neighbor", meaning: "vecino/a", example: "My neighbor is very friendly." },
      { kind: "flashcard", word: "to move (house)", meaning: "mudarse", example: "We are going to move next month." },
    ],
  },
  {
    theme: "La ropa",
    cards: [
      { kind: "flashcard", word: "to wear", meaning: "llevar puesto / usar", example: "She is wearing a blue dress." },
      { kind: "flashcard", word: "shirt / T-shirt", meaning: "camisa / playera", example: "He bought a white shirt." },
      { kind: "flashcard", word: "trousers / pants", meaning: "pantalones", example: "These pants are too long." },
      { kind: "flashcard", word: "shoes", meaning: "zapatos", example: "I need new running shoes." },
      { kind: "flashcard", word: "jacket / coat", meaning: "chaqueta / abrigo", example: "Take a jacket; it's cold." },
      { kind: "flashcard", word: "size", meaning: "talla", example: "Do you have this in a bigger size?" },
      { kind: "flashcard", word: "It fits me well", meaning: "Me queda bien", example: "This shirt fits me well." },
      { kind: "flashcard", word: "to get dressed", meaning: "vestirse", example: "I get dressed before breakfast." },
    ],
  },
  {
    theme: "Naturaleza y animales",
    cards: [
      { kind: "flashcard", word: "tree / forest", meaning: "árbol / bosque", example: "We walked through a beautiful forest." },
      { kind: "flashcard", word: "beach / sea", meaning: "playa / mar", example: "I love swimming in the sea." },
      { kind: "flashcard", word: "mountain", meaning: "montaña", example: "They climbed a tall mountain." },
      { kind: "flashcard", word: "river / lake", meaning: "río / lago", example: "There is a quiet lake near my house." },
      { kind: "flashcard", word: "pet", meaning: "mascota", example: "Do you have any pets?" },
      { kind: "flashcard", word: "bird", meaning: "pájaro / ave", example: "A bird is singing in the tree." },
      { kind: "flashcard", word: "wild animals", meaning: "animales salvajes", example: "We saw wild animals on the safari." },
      { kind: "flashcard", word: "weather forecast", meaning: "pronóstico del clima", example: "The weather forecast says it will be sunny." },
    ],
  },
  {
    theme: "Deportes y ejercicio",
    cards: [
      { kind: "flashcard", word: "to go for a run", meaning: "salir a correr", example: "I go for a run every morning." },
      { kind: "flashcard", word: "team / match", meaning: "equipo / partido", example: "Our team won the match." },
      { kind: "flashcard", word: "to win / to lose", meaning: "ganar / perder", example: "We won the game last night." },
      { kind: "flashcard", word: "coach", meaning: "entrenador", example: "The coach gave us good advice." },
      { kind: "flashcard", word: "to score a goal", meaning: "anotar un gol", example: "He scored a goal in the last minute." },
      { kind: "flashcard", word: "gym", meaning: "gimnasio", example: "I go to the gym three times a week." },
      { kind: "flashcard", word: "to warm up", meaning: "calentar (antes de ejercitar)", example: "Always warm up before you run." },
      { kind: "flashcard", word: "to be in shape", meaning: "estar en forma", example: "She runs to stay in shape." },
    ],
  },
  {
    theme: "Educación y estudios",
    cards: [
      { kind: "flashcard", word: "to take a course", meaning: "tomar un curso", example: "I'm taking an English course online." },
      { kind: "flashcard", word: "homework / assignment", meaning: "tarea", example: "I have a lot of homework tonight." },
      { kind: "flashcard", word: "to pass / to fail", meaning: "aprobar / reprobar", example: "I studied hard to pass the exam." },
      { kind: "flashcard", word: "degree", meaning: "título / grado", example: "She has a degree in biology." },
      { kind: "flashcard", word: "to take notes", meaning: "tomar apuntes", example: "Take notes during the lesson." },
      { kind: "flashcard", word: "subject", meaning: "materia / asignatura", example: "Math is my favorite subject." },
      { kind: "flashcard", word: "to make progress", meaning: "progresar / avanzar", example: "I'm making progress with my English." },
      { kind: "flashcard", word: "deadline", meaning: "fecha de entrega", example: "The deadline for the essay is Friday." },
    ],
  },
  {
    theme: "Acuerdo y opinión",
    cards: [
      { kind: "flashcard", word: "I think that...", meaning: "Creo que...", example: "I think that it's a good idea." },
      { kind: "flashcard", word: "In my opinion...", meaning: "En mi opinión...", example: "In my opinion, the movie was boring." },
      { kind: "flashcard", word: "I agree / I disagree", meaning: "Estoy de acuerdo / en desacuerdo", example: "I agree with you on that." },
      { kind: "flashcard", word: "You're right", meaning: "Tienes razón", example: "You're right, I hadn't thought of that." },
      { kind: "flashcard", word: "It depends", meaning: "Depende", example: "Will you come? — It depends on the time." },
      { kind: "flashcard", word: "I'm not sure", meaning: "No estoy seguro", example: "I'm not sure that's true." },
      { kind: "flashcard", word: "to be honest...", meaning: "para ser honesto...", example: "To be honest, I didn't like it." },
      { kind: "flashcard", word: "That makes sense", meaning: "Eso tiene sentido", example: "That makes sense, thanks for explaining." },
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
  {
    kind: "reading",
    title: "Working from Home",
    passage:
      "Since last year, Marco has worked from home three days a week. He saves two hours of travel every day and feels less stressed. However, he sometimes misses talking to his coworkers in person. To stay connected, the team has a short video call every morning.",
    questions: [
      { prompt: "How many days does Marco work from home?", options: ["Every day", "Two days", "Three days", "Five days"], answerIndex: 2, explanation: "'Marco has worked from home three days a week'." },
      { prompt: "What does he sometimes miss?", options: ["His old salary", "Talking to coworkers in person", "The long travel", "His office chair"], answerIndex: 1, explanation: "'he sometimes misses talking to his coworkers in person'." },
    ],
  },
  {
    kind: "reading",
    title: "A Trip to the Market",
    passage:
      "Every Saturday, Elena goes to the local market near her house. She buys fresh fruit, vegetables, and bread. The prices are lower than at the supermarket, and she enjoys talking to the sellers. Her favorite stall sells homemade cheese, which she always buys for her family.",
    questions: [
      { prompt: "When does Elena go to the market?", options: ["Every day", "On Sundays", "On Saturdays", "Once a month"], answerIndex: 2, explanation: "'Every Saturday, Elena goes to the local market'." },
      { prompt: "Why does she prefer the market?", options: ["It is far away", "Prices are lower and she enjoys it", "It is open at night", "It sells phones"], answerIndex: 1, explanation: "'The prices are lower... and she enjoys talking to the sellers'." },
    ],
  },
  {
    kind: "reading",
    title: "Learning to Save Money",
    passage:
      "When Pablo got his first job, he spent all his money every month. After a while, he decided to change. Now he saves a small amount as soon as he gets paid, before spending on anything else. It isn't much, but after a year he had enough for a short vacation.",
    questions: [
      { prompt: "What was Pablo's problem at first?", options: ["He had no job", "He spent all his money", "He worked too much", "He couldn't travel"], answerIndex: 1, explanation: "'he spent all his money every month'." },
      { prompt: "What does he do now?", options: ["He saves before spending", "He stopped working", "He borrows money", "He spends more"], answerIndex: 0, explanation: "'he saves a small amount as soon as he gets paid, before spending'." },
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
  {
    kind: "listening",
    scriptLabel: "Reservando una mesa por teléfono.",
    script:
      "Good evening! I'd like to book a table for four people for tomorrow at eight o'clock. It's for a birthday dinner. Could we have a table near the window, please? My name is Roberto.",
    questions: [
      { prompt: "How many people is the table for?", options: ["Two", "Three", "Four", "Five"], answerIndex: 2, explanation: "'a table for four people'." },
      { prompt: "What is the special occasion?", options: ["A wedding", "A birthday dinner", "A business meeting", "Nothing special"], answerIndex: 1, explanation: "'It's for a birthday dinner'." },
    ],
  },
  {
    kind: "listening",
    scriptLabel: "Hablando del clima y los planes.",
    script:
      "The weather this weekend looks great. On Saturday it will be sunny and warm, perfect for the beach. But on Sunday it might rain in the afternoon, so take an umbrella if you go out.",
    questions: [
      { prompt: "How will the weather be on Saturday?", options: ["Rainy", "Cold and windy", "Sunny and warm", "Snowy"], answerIndex: 2, explanation: "'On Saturday it will be sunny and warm'." },
      { prompt: "What might happen on Sunday?", options: ["It might rain", "It will snow", "It will be very hot", "Nothing changes"], answerIndex: 0, explanation: "'on Sunday it might rain in the afternoon'." },
    ],
  },
  {
    kind: "listening",
    scriptLabel: "Instrucciones en el trabajo.",
    script:
      "Hi team, quick update. The client moved the meeting to Thursday at ten. Please finish the report by Wednesday evening and send it to me for review. If you have any questions, just send me a message. Thanks!",
    questions: [
      { prompt: "When is the meeting now?", options: ["Wednesday at ten", "Thursday at ten", "Friday evening", "Monday morning"], answerIndex: 1, explanation: "'The client moved the meeting to Thursday at ten'." },
      { prompt: "By when should the report be finished?", options: ["Thursday", "Friday", "Wednesday evening", "Next week"], answerIndex: 2, explanation: "'finish the report by Wednesday evening'." },
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
// Pool de dictados (escucha y escribe — listening + escritura)
// ---------------------------------------------------------------------------

export const dictationTasks: Dictation[] = [
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "I usually wake up early in the morning.", accepted: ["I usually wake up early in the morning"] },
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "She is going to visit her family next week.", accepted: ["She is going to visit her family next week"] },
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "There are many interesting books in the library.", accepted: ["There are many interesting books in the library"] },
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "We have never been to the United States.", accepted: ["We have never been to the United States"] },
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "You should drink more water every day.", accepted: ["You should drink more water every day"] },
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "How much does this jacket cost?", accepted: ["How much does this jacket cost"] },
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "If it rains tomorrow, we will stay home.", accepted: ["If it rains tomorrow we will stay home"] },
  { kind: "dictation", prompt: "Escucha y escribe la oración.", text: "My favorite hobby is reading in my free time.", accepted: ["My favorite hobby is reading in my free time"] },
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

/** Crea una actividad de emparejar (inglés → español) a partir del vocabulario. */
function matchingFromVocab(vocab: VocabSet): Matching {
  return {
    kind: "matching",
    prompt: `Empareja cada palabra de "${vocab.theme}" con su significado.`,
    pairs: vocab.cards.slice(0, 6).map((c) => ({ left: c.word, right: c.meaning })),
  };
}

/** Devuelve la sesión completa para el día N (N empieza en 1). */
/**
 * Devuelve una ventana de `size` preguntas de un banco, desplazada según el
 * día. Pensada para que un mismo tema, al repetirse en días consecutivos,
 * muestre preguntas distintas. Con un banco de 9 y ventanas de 3, los días
 * d-1, d, d+1 dan offsets disjuntos (0, 3, 6) → ningún solapamiento.
 */
function pickQuestionWindow<T>(pool: T[], day: number, size: number): T[] {
  if (pool.length === 0) return [];
  const slots = Math.max(1, Math.floor(pool.length / size));
  const start = ((day % slots) * size) % pool.length;
  const out: T[] = [];
  const take = Math.min(size, pool.length);
  for (let k = 0; k < take; k++) {
    out.push(pool[(start + k) % pool.length]);
  }
  return out;
}

export function getDailySession(dayNumber: number): DailySession {
  const day = Math.max(1, Math.floor(dayNumber));
  const i = day - 1;
  const week = Math.floor(i / DAYS_PER_WEEK) + 1;
  const { stage, emoji, focus } = stageForWeek(week);

  const enrich = (lesson: GrammarLesson): Mcq[] =>
    lesson.practice.map((m) => ({
      ...m,
      topicTitle: m.topicTitle ?? lesson.title,
      topicWhy: m.topicWhy ?? lesson.tipEs,
    }));

  // Gramática: el tema del día + dos de repaso. Cada lección aparece 3 días
  // seguidos (como tema del día y luego como repaso), así que rotamos una
  // VENTANA distinta de su banco de preguntas según el día: con 9 preguntas y
  // ventanas de 3, los 3 días en que se repite el tema muestran preguntas
  // completamente diferentes (sin solaparse).
  const grammar = grammarLessons[i % grammarLessons.length];
  const g1 = grammarLessons[(i + 1) % grammarLessons.length];
  const g2 = grammarLessons[(i + 2) % grammarLessons.length];
  const grammarPractice: Mcq[] = [
    ...pickQuestionWindow(enrich(grammar), day, 3),
    ...pickQuestionWindow(enrich(g1), day, 3),
    ...pickQuestionWindow(enrich(g2), day, 3),
  ];

  // Vocabulario: dos temas → ~16 tarjetas.
  const v0 = vocabSets[i % vocabSets.length];
  const v1 = vocabSets[(i + 1) % vocabSets.length];
  const vocab: VocabSet = { theme: v0.theme, cards: [...v0.cards, ...v1.cards] };
  const matching = matchingFromVocab({
    theme: v0.theme,
    cards: [...v0.cards.slice(0, 4), ...v1.cards.slice(0, 4)],
  });

  // Comprensión: 3 lecturas + 2 escuchas + dictado (formato TOEFL).
  const reading1 = readingTasks[i % readingTasks.length];
  const reading2 = readingTasks[(i + 2) % readingTasks.length];
  const reading3 = readingTasks[(i + 4) % readingTasks.length];
  const listening1 = listeningTasks[i % listeningTasks.length];
  const listening2 = listeningTasks[(i + 1) % listeningTasks.length];
  const dictation = dictationTasks[i % dictationTasks.length];
  const comprehensionSet: Activity[] = [
    reading1,
    listening1,
    reading2,
    listening2,
    reading3,
  ];

  // Ordenar oraciones: 6.
  const orders: OrderWords[] = Array.from(
    { length: 6 },
    (_, k) => orderTasks[(i + k) % orderTasks.length]
  );

  // Pronunciación: 6 frases.
  const pronunciationSet: PronunciationActivity[] = Array.from(
    { length: 6 },
    (_, k) => pronunciationPool[(i + k) % pronunciationPool.length]
  );

  const productionPrompt = productionPrompts[i % productionPrompts.length];
  const dialogue = dialogueActivity(i);

  // Sesión completa unificada: vocabulario, gramática, comprensión (TOEFL),
  // conversación y pronunciación. Es larga: se puede hacer por partes.
  const activities: Activity[] = [
    ...vocab.cards,
    matching,
    ...grammarPractice,
    ...orders,
    reading1,
    listening1,
    dictation,
    reading2,
    listening2,
    reading3,
    dialogue,
    ...pronunciationSet.slice(0, 3),
  ];

  return {
    day,
    week,
    stage,
    stageEmoji: emoji,
    monthFocus: focus,
    grammar,
    grammarPractice,
    vocab,
    comprehensionSet,
    dialogue,
    pronunciationSet,
    activities,
    productionPrompt,
    resources: resourcesByStage[stage],
    estimatedMinutes: 90,
  };
}

// ---------------------------------------------------------------------------
// Examen de avance: cada 5 días, repasa la gramática de esos días.
// ---------------------------------------------------------------------------

export const CHECKPOINT_EVERY = 5;

/**
 * Milestone (número de examen) disponible según los días completados.
 * Devuelve el examen más reciente desbloqueado, o null si aún no hay ninguno.
 * Que esté "aprobado" se verifica aparte (ExamAttempt).
 */
export function checkpointDue(studyDay: number): number | null {
  const completed = studyDay - 1;
  const milestone = Math.floor(completed / CHECKPOINT_EVERY);
  return milestone >= 1 ? milestone : null;
}

/** Construye las preguntas del examen de avance para un milestone dado. */
export function buildCheckpointExam(milestone: number): Mcq[] {
  // Días que cubre este examen (los 5 anteriores al checkpoint).
  const endDay = milestone * CHECKPOINT_EVERY; // último día incluido
  const startDay = endDay - CHECKPOINT_EVERY + 1;
  const questions: Mcq[] = [];
  for (let day = startDay; day <= endDay; day++) {
    const i = day - 1;
    const grammar = grammarLessons[i % grammarLessons.length];
    const enriched = grammar.practice.map((m) => ({
      ...m,
      topicTitle: m.topicTitle ?? grammar.title,
      topicWhy: m.topicWhy ?? grammar.tipEs,
    }));
    // 2 preguntas por día, rotadas por milestone para que cada examen de
    // avance (y cada reintento de un milestone distinto) varíe.
    questions.push(...pickQuestionWindow(enriched, milestone + day, 2));
  }
  return questions;
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
