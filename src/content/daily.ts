// Currículo de estudio diario — basado en la Guía de Inglés Autodidacta
// (plan de 6 meses, 1 hora diaria: gramática + vocabulario + escucha/lectura +
// producción). El contenido es original. Cada día combina piezas de varios
// "pools" para que la sesión sea distinta cada vez y avance de forma gradual.

import type {
  Activity,
  Dictation,
  Flashcard,
  Listening,
  Matching,
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
  estimatedMinutes: number;
}

// ---------------------------------------------------------------------------
// Pool de gramática (15 lecciones, 5 prácticas cada una, con explicación amplia)
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
      { kind: "mcq", prompt: "Completa con la forma correcta de TO BE.", sentence: "They ___ my friends.", options: ["is", "am", "are", "be"], answerIndex: 2, explanation: "Regla: I → am; he/she/it → is; you/we/they → are. Como 'they' es plural, usamos 'are': They are my friends." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "My name ___ Carlos.", options: ["am", "is", "are", "be"], answerIndex: 1, explanation: "'My name' equivale a 'it' (singular, una cosa), y con it se usa 'is'. Por eso: My name is Carlos." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I ___ very happy today.", options: ["is", "are", "am", "be"], answerIndex: 2, explanation: "Con el sujeto 'I' SIEMPRE se usa 'am', nunca is ni are. Correcto: I am very happy." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We ___ ready to start.", options: ["is", "am", "are", "be"], answerIndex: 2, explanation: "'We' es plural (nosotros), así que toma 'are': We are ready. 'be' es la forma base y no se usa sola aquí." },
      { kind: "mcq", prompt: "Elige la forma negativa correcta.", sentence: "He ___ at home right now.", options: ["isn't", "aren't", "am not", "don't"], answerIndex: 0, explanation: "Para negar TO BE se agrega 'not'. Con 'he' (is) la negación es is not = isn't. 'aren't' es para you/we/they." },
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
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "She ___ to school by bus.", options: ["go", "goes", "going", "gone"], answerIndex: 1, explanation: "Con he/she/it el verbo lleva -s (o -es). 'go' termina en -o, así que se vuelve 'goes': She goes to school." },
      { kind: "mcq", prompt: "Elige la forma correcta de la pregunta.", sentence: "___ you like pizza?", options: ["Does", "Is", "Do", "Are"], answerIndex: 2, explanation: "Para preguntar en presente simple usamos do/does + sujeto + verbo. Con 'you' es 'Do': Do you like pizza?" },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "He ___ eat meat.", options: ["don't", "doesn't", "isn't", "not"], answerIndex: 1, explanation: "Para negar usamos don't/doesn't + verbo base. Con he/she/it es 'doesn't', y el verbo queda sin -s: He doesn't eat meat." },
      { kind: "mcq", prompt: "Completa con el presente simple.", sentence: "My parents ___ in another city.", options: ["lives", "live", "living", "to live"], answerIndex: 1, explanation: "'My parents' es plural (they), y con they el verbo NO lleva -s: My parents live. La -s solo va con he/she/it." },
      { kind: "mcq", prompt: "Elige la pregunta correcta.", sentence: "___ she work on weekends?", options: ["Do", "Does", "Is", "Are"], answerIndex: 1, explanation: "Con he/she/it la pregunta usa 'Does', y el verbo va en base (sin -s): Does she work...? No 'Does she works'." },
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
      { kind: "mcq", prompt: "Completa con presente continuo.", sentence: "She ___ a book right now.", options: ["read", "reads", "is reading", "reading"], answerIndex: 2, explanation: "Acción que ocurre ahora = am/is/are + -ing. Con 'she' usamos 'is' + reading: She is reading." },
      { kind: "mcq", prompt: "Elige el auxiliar correcto.", sentence: "We ___ having dinner.", options: ["is", "am", "are", "be"], answerIndex: 2, explanation: "El presente continuo necesita el verbo TO BE como auxiliar. Con 'we' es 'are': We are having dinner." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "Listen! The baby ___ .", options: ["cry", "cries", "is crying", "crying"], answerIndex: 2, explanation: "'Listen!' indica algo en este momento, así que va continuo: is + crying. El bebé está llorando ahora." },
      { kind: "mcq", prompt: "Elige la forma -ing correcta.", sentence: "He is ___ a letter.", options: ["write", "writeing", "writing", "wrote"], answerIndex: 2, explanation: "Verbos que terminan en -e mute pierden la 'e' al agregar -ing: write → writing (no 'writeing')." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "What ___ you doing?", options: ["is", "do", "are", "does"], answerIndex: 2, explanation: "En continuo, la pregunta usa TO BE: con 'you' es 'are': What are you doing?" },
    ],
  },
  {
    title: "Artículos a / an / the",
    tipEs:
      "Usa 'a' antes de sonido consonante (a car) y 'an' antes de sonido vocal (an apple). 'The' se usa para algo específico o ya mencionado. Para hablar en general (plural o incontable) no se usa artículo.",
    examples: [
      { en: "I have a dog and an umbrella.", es: "Tengo un perro y un paraguas." },
      { en: "The car outside is mine.", es: "El carro de afuera es mío." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "She is ___ engineer.", options: ["a", "an", "the", "—"], answerIndex: 1, explanation: "Se usa 'an' antes de SONIDO vocal. 'engineer' empieza con sonido /e/, por eso: an engineer." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "I bought ___ new phone yesterday.", options: ["an", "the", "a", "—"], answerIndex: 2, explanation: "'new' empieza con sonido consonante /n/, así que se usa 'a': a new phone. (Es algo no específico.)" },
      { kind: "mcq", prompt: "Elige el artículo correcto.", sentence: "Can you close ___ door, please?", options: ["a", "an", "the", "—"], answerIndex: 2, explanation: "Hablamos de UNA puerta específica (la que los dos conocemos), por eso 'the': the door." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "We waited for ___ hour.", options: ["a", "an", "the", "—"], answerIndex: 1, explanation: "Importa el SONIDO, no la letra. En 'hour' la 'h' es muda y suena como vocal /au/, por eso: an hour." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "I like ___ music.", options: ["a", "an", "the", "—"], answerIndex: 3, explanation: "Cuando hablamos de algo EN GENERAL (la música como concepto), no se usa artículo: I like music." },
    ],
  },
  {
    title: "There is / There are (hay)",
    tipEs:
      "'There is' = hay (singular). 'There are' = hay (plural). Para negar: there isn't / there aren't. Con incontables se usa there is (there is some water).",
    examples: [
      { en: "There is a book on the table.", es: "Hay un libro en la mesa." },
      { en: "There are three chairs.", es: "Hay tres sillas." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con there is/are.", sentence: "___ a cat in the garden.", options: ["There is", "There are", "It is", "Have"], answerIndex: 0, explanation: "'a cat' es singular (uno), así que 'There is': There is a cat. 'There are' es solo para plural." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "___ many people at the party.", options: ["There is", "There are", "It is", "Has"], answerIndex: 1, explanation: "'many people' es plural, por eso 'There are': There are many people." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "There ___ any milk in the fridge.", options: ["isn't", "aren't", "not", "don't"], answerIndex: 0, explanation: "'milk' es incontable (se trata como singular), así que la negación es 'there isn't any milk'." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ there a bank near here?", options: ["Is", "Are", "Do", "Has"], answerIndex: 0, explanation: "Para preguntar invertimos: Is/Are there...? Con 'a bank' (singular): Is there a bank near here?" },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "There ___ two windows in this room.", options: ["is", "are", "be", "has"], answerIndex: 1, explanation: "'two windows' es plural, por eso 'There are two windows'." },
    ],
  },
  {
    title: "Pasado simple (regular e irregular)",
    tipEs:
      "Para hablar del pasado, los verbos regulares terminan en -ed (work → worked). Los irregulares cambian (go → went, eat → ate). En negativo/pregunta se usa 'did' y el verbo vuelve a su forma base.",
    examples: [
      { en: "I watched a movie last night.", es: "Vi una película anoche." },
      { en: "We went to the beach.", es: "Fuimos a la playa." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "Yesterday I ___ a great book.", options: ["read", "readed", "reads", "reading"], answerIndex: 0, explanation: "'read' es irregular: su pasado se ESCRIBE igual (read) pero se PRONUNCIA 'red'. Nunca se dice 'readed'." },
      { kind: "mcq", prompt: "Elige el pasado correcto.", sentence: "They ___ to Spain in 2019.", options: ["goed", "went", "go", "gone"], answerIndex: 1, explanation: "'go' es irregular: su pasado es 'went' (no 'goed'). 'gone' es el participio, se usa con have." },
      { kind: "mcq", prompt: "Completa la pregunta en pasado.", sentence: "___ you call her yesterday?", options: ["Do", "Did", "Was", "Are"], answerIndex: 1, explanation: "En pasado, las preguntas usan 'Did' + sujeto + verbo base: Did you call...? (no 'called' aquí)." },
      { kind: "mcq", prompt: "Completa con el pasado simple.", sentence: "She ___ dinner an hour ago.", options: ["cook", "cooks", "cooked", "cooking"], answerIndex: 2, explanation: "'cook' es regular: se agrega -ed para el pasado: cooked. 'an hour ago' indica pasado." },
      { kind: "mcq", prompt: "Elige la negación correcta.", sentence: "We ___ see the email.", options: ["didn't", "don't", "wasn't", "weren't"], answerIndex: 0, explanation: "Negación en pasado: didn't + verbo base. 'We didn't see' (no 'didn't saw'): el 'did' ya marca el pasado." },
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
      { kind: "mcq", prompt: "Elige la mejor opción (plan ya decidido).", sentence: "I ___ visit my family this weekend.", options: ["will", "am going to", "go", "would"], answerIndex: 1, explanation: "Es un plan ya decidido de antemano, por eso 'going to': I am going to visit. 'will' sería para una decisión del momento." },
      { kind: "mcq", prompt: "Completa (decisión del momento).", sentence: "The phone is ringing. I ___ answer it.", options: ["am going to", "will", "would", "going"], answerIndex: 1, explanation: "Decides en el momento (no era un plan), por eso 'will': I will answer it." },
      { kind: "mcq", prompt: "Elige la forma correcta.", sentence: "Look at those clouds! It ___ rain.", options: ["will", "is going to", "goes to", "would"], answerIndex: 1, explanation: "Hay evidencia presente (las nubes), así que predecimos con 'going to': It is going to rain." },
      { kind: "mcq", prompt: "Completa la predicción.", sentence: "I think she ___ win the game.", options: ["will", "is going to", "go to", "would"], answerIndex: 0, explanation: "Es una opinión/predicción sin evidencia ('I think'), por eso 'will': I think she will win." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "We ___ to start a business next year.", options: ["will", "are going", "going", "go"], answerIndex: 1, explanation: "'going to' necesita TO BE: are going to. Con 'we': We are going to start a business." },
    ],
  },
  {
    title: "Comparativos y superlativos",
    tipEs:
      "Comparativos cortos: adjetivo + -er + than (taller than). Largos (2+ sílabas): more + adjetivo (more expensive). Superlativos: the + -est / the most. Irregulares: good→better→best, bad→worse→worst.",
    examples: [
      { en: "This car is faster than that one.", es: "Este carro es más rápido que aquel." },
      { en: "She is the best student in class.", es: "Ella es la mejor estudiante de la clase." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa el comparativo.", sentence: "Today is ___ than yesterday.", options: ["hot", "hotter", "hottest", "more hot"], answerIndex: 1, explanation: "'hot' es corto (1 sílaba), así que el comparativo es -er. Se dobla la t: hotter than. No 'more hot'." },
      { kind: "mcq", prompt: "Elige el comparativo correcto.", sentence: "This phone is ___ than mine.", options: ["expensiver", "more expensive", "most expensive", "expensive"], answerIndex: 1, explanation: "'expensive' es largo (3 sílabas), por eso usamos 'more': more expensive than. Nunca 'expensiver'." },
      { kind: "mcq", prompt: "Completa el superlativo.", sentence: "It was the ___ day of my life.", options: ["happier", "more happy", "happiest", "happy"], answerIndex: 2, explanation: "Superlativo de adjetivo corto: the + -est. 'happy' cambia y a i: the happiest day." },
      { kind: "mcq", prompt: "Elige la opción correcta (irregular).", sentence: "Her English is ___ than mine.", options: ["gooder", "more good", "better", "best"], answerIndex: 2, explanation: "'good' es irregular: su comparativo es 'better' (no 'gooder' ni 'more good')." },
      { kind: "mcq", prompt: "Completa el superlativo.", sentence: "This is the ___ restaurant in town.", options: ["better", "best", "good", "more good"], answerIndex: 1, explanation: "Superlativo irregular de good: good → better → the best. 'better' es comparativo, aquí va el superlativo." },
    ],
  },
  {
    title: "Presente perfecto (have / has + participio)",
    tipEs:
      "Se forma con have/has + participio pasado. Describe experiencias o acciones con efecto en el presente, sin decir CUÁNDO exactamente. Suele ir con 'ever', 'never', 'already', 'yet', 'just'.",
    examples: [
      { en: "I have visited London twice.", es: "He visitado Londres dos veces." },
      { en: "She has just finished her work.", es: "Ella acaba de terminar su trabajo." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa con presente perfecto.", sentence: "I ___ never been to Japan.", options: ["have", "has", "had", "am"], answerIndex: 0, explanation: "Con I/you/we/they se usa 'have'; con he/she/it 'has'. Aquí 'I have never been'." },
      { kind: "mcq", prompt: "Elige el participio correcto.", sentence: "He has ___ his keys.", options: ["lose", "lost", "losed", "losing"], answerIndex: 1, explanation: "El presente perfecto usa el PARTICIPIO. 'lose' es irregular: lose → lost → lost. He has lost his keys." },
      { kind: "mcq", prompt: "Completa la pregunta.", sentence: "___ you ever eaten sushi?", options: ["Has", "Have", "Did", "Are"], answerIndex: 1, explanation: "Pregunta de experiencia ('ever') = presente perfecto. Con 'you': Have you ever eaten...?" },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She ___ already finished the report.", options: ["have", "has", "is", "did"], answerIndex: 1, explanation: "Con he/she/it el auxiliar es 'has': She has already finished. 'already' es típico del presente perfecto." },
      { kind: "mcq", prompt: "Completa con el participio.", sentence: "We have ___ this movie before.", options: ["see", "saw", "seen", "seeing"], answerIndex: 2, explanation: "Participio irregular: see → saw → seen. Con have se usa el participio 'seen': We have seen it before." },
    ],
  },
  {
    title: "Verbos modales (can / should / must)",
    tipEs:
      "'Can' = poder/saber. 'Should' = debería (consejo). 'Must' = deber (obligación fuerte/regla). Después del modal SIEMPRE va el verbo en su forma base (sin to, sin -s, sin -ed).",
    examples: [
      { en: "You should rest more.", es: "Deberías descansar más." },
      { en: "I can speak a little English.", es: "Puedo hablar un poco de inglés." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el modal correcto (consejo).", sentence: "You look tired. You ___ go to bed.", options: ["can", "should", "must", "could"], answerIndex: 1, explanation: "Le das un consejo, no una orden, así que 'should' (deberías): You should go to bed." },
      { kind: "mcq", prompt: "Completa (habilidad).", sentence: "She ___ play the guitar very well.", options: ["must", "should", "can", "would"], answerIndex: 2, explanation: "Hablas de una habilidad (saber hacer algo), por eso 'can': She can play the guitar." },
      { kind: "mcq", prompt: "Elige la forma correcta del verbo.", sentence: "We must ___ before the test.", options: ["studying", "studies", "study", "studied"], answerIndex: 2, explanation: "Después de CUALQUIER modal va el verbo en base: must study (no studying, no studies)." },
      { kind: "mcq", prompt: "Completa (obligación fuerte).", sentence: "Drivers ___ stop at a red light.", options: ["can", "should", "must", "would"], answerIndex: 2, explanation: "Es una regla obligatoria, así que 'must': Drivers must stop. 'should' sería solo una recomendación." },
      { kind: "mcq", prompt: "Elige la negación correcta.", sentence: "You ___ smoke here; it's not allowed.", options: ["mustn't", "shouldn't", "can", "don't"], answerIndex: 0, explanation: "'no está permitido' = prohibición fuerte = mustn't (must not): You mustn't smoke here." },
    ],
  },
  {
    title: "Preposiciones de lugar (in / on / at)",
    tipEs:
      "'in' = dentro de un espacio (in a room, in a city). 'on' = sobre una superficie (on the table, on the wall). 'at' = en un punto específico (at the door, at school, at the bus stop).",
    examples: [
      { en: "The keys are on the table.", es: "Las llaves están sobre la mesa." },
      { en: "She is at the bus stop.", es: "Ella está en la parada del autobús." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "The milk is ___ the fridge.", options: ["on", "in", "at", "to"], answerIndex: 1, explanation: "Dentro de un espacio cerrado = 'in': in the fridge (dentro del refrigerador)." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There is a picture ___ the wall.", options: ["in", "at", "on", "to"], answerIndex: 2, explanation: "Sobre una superficie (pegado a la pared) = 'on': on the wall." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "I'll meet you ___ the airport.", options: ["in", "on", "at", "to"], answerIndex: 2, explanation: "Un punto/lugar específico de encuentro = 'at': at the airport." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "My books are ___ my bag.", options: ["on", "at", "in", "to"], answerIndex: 2, explanation: "Dentro de la mochila (espacio) = 'in': in my bag." },
      { kind: "mcq", prompt: "Elige la preposición correcta.", sentence: "She lives ___ Paris.", options: ["at", "on", "in", "to"], answerIndex: 2, explanation: "Con ciudades y países se usa 'in': in Paris, in Mexico." },
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
      { kind: "mcq", prompt: "Elige la posición correcta.", sentence: "I ___ go to the gym on Mondays.", options: ["go usually", "usually go", "go to usually", "usually"], answerIndex: 1, explanation: "El adverbio va ANTES del verbo principal: usually go. Correcto: I usually go to the gym." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "He is ___ happy on Fridays.", options: ["always", "happy always", "is always", "always is"], answerIndex: 0, explanation: "Con TO BE (is), el adverbio va DESPUÉS: He is always happy." },
      { kind: "mcq", prompt: "Elige el adverbio adecuado.", sentence: "I ___ eat meat; I'm vegetarian.", options: ["always", "usually", "never", "often"], answerIndex: 2, explanation: "Por el contexto (es vegetariano) corresponde 'never' (nunca): I never eat meat." },
      { kind: "mcq", prompt: "Completa correctamente.", sentence: "They ___ watch TV at night.", options: ["watch sometimes", "sometimes watch", "watch to sometimes", "to sometimes"], answerIndex: 1, explanation: "El adverbio de frecuencia va antes del verbo: sometimes watch. They sometimes watch TV." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She ___ arrives on time.", options: ["always", "is always", "always is", "be always"], answerIndex: 0, explanation: "'arrives' es verbo principal (no es TO BE), así que el adverbio va antes: She always arrives." },
    ],
  },
  {
    title: "Contables, incontables y cuantificadores",
    tipEs:
      "Contables = se pueden contar (a book, three books). Incontables = no se cuentan (water, money, time). Usa 'many' con contables, 'much' con incontables, y 'a lot of' con ambos. 'some' en afirmaciones, 'any' en negativas y preguntas.",
    examples: [
      { en: "I don't have much money.", es: "No tengo mucho dinero." },
      { en: "There are many cars.", es: "Hay muchos carros." },
    ],
    practice: [
      { kind: "mcq", prompt: "Elige el cuantificador correcto.", sentence: "How ___ water do you drink?", options: ["many", "much", "some", "a lot"], answerIndex: 1, explanation: "'water' es incontable, así que se usa 'much': How much water...? 'many' es solo para contables." },
      { kind: "mcq", prompt: "Completa la oración.", sentence: "There aren't ___ apples left.", options: ["much", "many", "some", "a"], answerIndex: 1, explanation: "'apples' es contable plural, así que 'many': aren't many apples." },
      { kind: "mcq", prompt: "Elige some/any.", sentence: "I need ___ help, please.", options: ["any", "many", "some", "much"], answerIndex: 2, explanation: "En oraciones afirmativas (y peticiones amables) se usa 'some': I need some help." },
      { kind: "mcq", prompt: "Completa la negación.", sentence: "We don't have ___ sugar.", options: ["some", "any", "many", "a"], answerIndex: 1, explanation: "En negaciones se usa 'any': We don't have any sugar." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She has ___ of friends.", options: ["much", "many", "a lot", "a lot of"], answerIndex: 3, explanation: "La expresión es 'a lot of' + sustantivo: a lot of friends. 'a lot' sin 'of' no lleva sustantivo después." },
    ],
  },
  {
    title: "Condicionales (1º y 2º)",
    tipEs:
      "1º condicional (situación real/probable a futuro): If + presente, will + verbo. 2º condicional (situación hipotética/imaginaria): If + pasado, would + verbo. Tras 'if' nunca va 'will'.",
    examples: [
      { en: "If it rains, I will stay home.", es: "Si llueve, me quedaré en casa." },
      { en: "If I had money, I would travel.", es: "Si tuviera dinero, viajaría." },
    ],
    practice: [
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If you study, you ___ pass the exam.", options: ["would", "will", "are", "passed"], answerIndex: 1, explanation: "1º condicional: If + presente (study), y en la otra parte 'will' + verbo: you will pass." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "If I ___ you, I would apologize.", options: ["am", "was", "were", "be"], answerIndex: 2, explanation: "En el 2º condicional se usa 'were' para TODAS las personas (incluido I): If I were you..." },
      { kind: "mcq", prompt: "Elige la opción correcta.", sentence: "She would buy a house if she ___ rich.", options: ["is", "were", "will be", "be"], answerIndex: 1, explanation: "Situación imaginaria (no es rica) = 2º condicional con 'were': if she were rich." },
      { kind: "mcq", prompt: "Completa el 1º condicional.", sentence: "If it ___ tomorrow, we'll cancel the trip.", options: ["rains", "will rain", "rained", "would rain"], answerIndex: 0, explanation: "Regla de oro: tras 'if' NUNCA va 'will'. Va el presente: If it rains, we'll cancel." },
      { kind: "mcq", prompt: "Completa el 2º condicional.", sentence: "If I had more time, I ___ learn the piano.", options: ["will", "would", "can", "am"], answerIndex: 1, explanation: "2º condicional (hipótesis): If + pasado (had), would + verbo base: I would learn." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Pool de vocabulario por tema (15 temas, 8 tarjetas cada uno)
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
// Pool de dictados (escucha y escribe — práctica de listening + escritura)
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
export function getDailySession(dayNumber: number): DailySession {
  const day = Math.max(1, Math.floor(dayNumber));
  const i = day - 1;
  const week = Math.floor(i / DAYS_PER_WEEK) + 1;
  const { stage, emoji, focus } = stageForWeek(week);

  const grammar = grammarLessons[i % grammarLessons.length];
  const vocab = vocabSets[i % vocabSets.length];
  const matching = matchingFromVocab(vocab);

  // Comprensión: dos lecturas y una escucha para acercarse a la hora de estudio.
  const reading1 = readingTasks[i % readingTasks.length];
  const reading2 = readingTasks[(i + 2) % readingTasks.length];
  const listening = listeningTasks[i % listeningTasks.length];
  const dictation = dictationTasks[i % dictationTasks.length];
  const comprehensionSet: Activity[] = [reading1, listening, reading2];

  const order1 = orderTasks[i % orderTasks.length];
  const order2 = orderTasks[(i + 3) % orderTasks.length];
  const productionPrompt = productionPrompts[i % productionPrompts.length];

  // Sesión completa (~1 hora): vocabulario + repaso → gramática + práctica →
  // comprensión (lectura, escucha, dictado) → producción guiada.
  const activities: Activity[] = [
    ...vocab.cards, // ~10 min: vocabulario nuevo
    matching, // ~5 min: consolidación de vocabulario
    ...grammar.practice, // ~12 min: gramática
    order1,
    order2, // ~5 min: construir oraciones
    reading1, // ~10 min: lectura
    dictation, // ~5 min: dictado (escucha + escribe)
    listening, // ~8 min: escucha
    reading2, // ~10 min: segunda lectura
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
    estimatedMinutes: 60,
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
