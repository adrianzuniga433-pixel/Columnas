import type { LevelExamDef } from "./types";
import { PASS_THRESHOLD } from "@/lib/itp";

// Exámenes de fin de nivel. Mezclan las tres secciones del ITP
// (Structure & Written Expression, Reading, Listening). Cada examen tiene más
// preguntas para una medición rigurosa. Contenido original que imita formato y
// nivel; NO reproduce material de ETS.

// Atajos para escribir ítems más corto.
const mcq = (
  prompt: string,
  sentence: string,
  options: string[],
  answerIndex: number,
  explanation: string
) => ({ area: "structure" as const, question: { kind: "mcq" as const, prompt, sentence, options, answerIndex, explanation } });

const err = (
  segments: { text: string; label?: string }[],
  answerLabel: string,
  explanation: string
) => ({ area: "structure" as const, question: { kind: "error-id" as const, prompt: "Identifica el error.", segments, answerLabel, explanation } });

export const levelExams: LevelExamDef[] = [
  {
    level: 1,
    title: "Examen de nivel 1 — Fundamentos",
    passThreshold: PASS_THRESHOLD,
    items: [
      mcq("Elige la opción correcta.", "We ___ engineers.", ["am", "is", "are", "be"], 2, "Con 'we' se usa 'are'."),
      mcq("Elige la opción correcta.", "She ___ a teacher.", ["am", "is", "are", "be"], 1, "Con 'she' se usa 'is'."),
      mcq("Elige el artículo correcto.", "I bought ___ orange.", ["a", "an", "the", "—"], 1, "'orange' empieza con sonido vocal: 'an'."),
      mcq("Elige el artículo correcto.", "She is ___ doctor.", ["a", "an", "the", "—"], 0, "'doctor' empieza con sonido consonante: 'a'."),
      mcq("Presente simple: elige la opción.", "He ___ coffee every morning.", ["drink", "drinks", "drinking", "drank"], 1, "Con 'he' el verbo lleva -s: 'drinks'."),
      mcq("Negación en presente simple.", "They ___ like fish.", ["doesn't", "don't", "isn't", "aren't"], 1, "Con 'they' la negación es 'don't'."),
      mcq("Pregunta en presente simple.", "___ you speak English?", ["Does", "Is", "Do", "Are"], 2, "Con 'you' la pregunta usa 'Do'."),
      mcq("Plural correcto.", "I have three ___ .", ["child", "childs", "children", "childrens"], 2, "Plural irregular: child → children."),
      mcq("Pronombre de objeto.", "Can you help ___ ?", ["I", "me", "my", "mine"], 1, "Objeto del verbo: 'me'."),
      mcq("Demostrativo.", "___ books over there are mine.", ["This", "These", "Those", "It"], 2, "Plural y lejano ('over there'): 'Those'."),
      err([{ text: "He", label: "A" }, { text: "are", label: "B" }, { text: "a good", label: "C" }, { text: "teacher.", label: "D" }], "B", "Con 'he' se usa 'is', no 'are'."),
      err([{ text: "She", label: "A" }, { text: "have", label: "B" }, { text: "two", label: "C" }, { text: "cats.", label: "D" }], "B", "Con 'she' se usa 'has', no 'have'."),
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Maria",
          passage:
            "Maria is from Italy. She is a nurse at a small hospital. She has one brother and two sisters. In her free time she likes coffee, books, and long walks in the park.",
          questions: [
            { prompt: "What is Maria's job?", options: ["Teacher", "Nurse", "Doctor", "Engineer"], answerIndex: 1, explanation: "'She is a nurse.'" },
            { prompt: "How many sisters does she have?", options: ["One", "Two", "Three", "None"], answerIndex: 1, explanation: "'two sisters.'" },
            { prompt: "What does she like?", options: ["Sports and TV", "Coffee, books and walks", "Cooking", "Music"], answerIndex: 1, explanation: "'coffee, books, and long walks.'" },
          ],
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "My morning",
          passage:
            "Every day I wake up at seven. I have breakfast with my family, and then I take the bus to work. I start work at nine and finish at five.",
          questions: [
            { prompt: "What time does the writer wake up?", options: ["At six", "At seven", "At nine", "At five"], answerIndex: 1, explanation: "'I wake up at seven.'" },
            { prompt: "How does the writer go to work?", options: ["By car", "By bus", "On foot", "By train"], answerIndex: 1, explanation: "'I take the bus.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "En una tienda.",
          script: "Hello, how much is this book? It is five dollars. OK, I will take it. Thank you.",
          questions: [
            { prompt: "How much is the book?", options: ["Two dollars", "Five dollars", "Ten dollars", "Fifteen dollars"], answerIndex: 1, explanation: "'It is five dollars.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Presentación.",
          script: "Hi, my name is Tom. I am from Canada. I am a student and I live with two friends.",
          questions: [
            { prompt: "Where is Tom from?", options: ["The USA", "Canada", "England", "Mexico"], answerIndex: 1, explanation: "'I am from Canada.'" },
            { prompt: "Who does Tom live with?", options: ["His parents", "Alone", "Two friends", "His brother"], answerIndex: 2, explanation: "'I live with two friends.'" },
          ],
        },
      },
    ],
  },
  {
    level: 2,
    title: "Examen de nivel 2 — Básico",
    passThreshold: PASS_THRESHOLD,
    items: [
      mcq("Pasado simple: elige la opción.", "She ___ a great movie last night.", ["watch", "watched", "watches", "watching"], 1, "Regular: 'watched'."),
      mcq("Pasado irregular: elige la opción.", "We ___ to the beach yesterday.", ["goed", "go", "went", "gone"], 2, "go → went."),
      mcq("Presente continuo: elige la opción.", "They ___ studying right now.", ["is", "am", "are", "be"], 2, "'they' + are + studying."),
      mcq("Futuro: elige la opción.", "Look at the clouds! It ___ rain.", ["will", "is going to", "goes", "rains"], 1, "Evidencia presente: going to."),
      mcq("Comparativo: elige la opción.", "This car is ___ than mine.", ["fast", "faster", "fastest", "more fast"], 1, "Corto: faster than."),
      mcq("Superlativo: elige la opción.", "It is the ___ day of the year.", ["hot", "hotter", "hottest", "most hot"], 2, "Superlativo: the hottest."),
      mcq("There is/are: elige la opción.", "___ three chairs in the room.", ["There is", "There are", "It is", "Have"], 1, "Plural: There are."),
      mcq("Posesivo: elige la opción.", "That is ___ car, not yours.", ["my", "mine", "me", "I"], 0, "Antes del sustantivo: 'my'."),
      mcq("Preposición de tiempo.", "The class starts ___ 9 a.m.", ["in", "on", "at", "to"], 2, "Horas: 'at'."),
      err([{ text: "I was born", label: "A" }, { text: "on", label: "B" }, { text: "1990", label: "C" }, { text: "in Madrid.", label: "D" }], "B", "Con años se usa 'in', no 'on'."),
      err([{ text: "She", label: "A" }, { text: "don't", label: "B" }, { text: "like", label: "C" }, { text: "vegetables.", label: "D" }], "B", "Con 'she' la negación es 'doesn't'."),
      err([{ text: "He is", label: "A" }, { text: "more taller", label: "B" }, { text: "than", label: "C" }, { text: "his brother.", label: "D" }], "B", "No se usa 'more' con comparativo -er: 'taller'."),
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "The new gym",
          passage:
            "A new gym opened near my house. It is open from 6 a.m. to 10 p.m. The first month is free for students. I usually go in the morning before work because it is quieter then.",
          questions: [
            { prompt: "When does the gym open?", options: ["At 6 a.m.", "At 10 a.m.", "At noon", "At 6 p.m."], answerIndex: 0, explanation: "'open from 6 a.m.'" },
            { prompt: "Who gets the first month free?", options: ["Everyone", "Students", "Workers", "Children"], answerIndex: 1, explanation: "'free for students.'" },
            { prompt: "Why does the writer go in the morning?", options: ["It is cheaper", "It is quieter", "It is warmer", "It is closer"], answerIndex: 1, explanation: "'it is quieter then.'" },
          ],
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "A short trip",
          passage:
            "Last weekend we visited my grandparents in the countryside. We left on Saturday morning and came back on Sunday evening. The weather was sunny, so we had a picnic by the river.",
          questions: [
            { prompt: "When did they come back?", options: ["Saturday morning", "Sunday evening", "Monday", "Friday"], answerIndex: 1, explanation: "'came back on Sunday evening.'" },
            { prompt: "What did they do by the river?", options: ["Swam", "Had a picnic", "Fished", "Slept"], answerIndex: 1, explanation: "'we had a picnic by the river.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Pidiendo direcciones.",
          script: "Excuse me, where is the station? Go straight and turn left at the bank. It is about five minutes away.",
          questions: [
            { prompt: "Where should you turn left?", options: ["At the park", "At the bank", "At the station", "At the school"], answerIndex: 1, explanation: "'turn left at the bank.'" },
            { prompt: "How far is it?", options: ["Two minutes", "Five minutes", "Ten minutes", "An hour"], answerIndex: 1, explanation: "'about five minutes away.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Una llamada.",
          script: "Hi, it's Anna. I can't come to the meeting at three because I have a doctor's appointment. Can we move it to five?",
          questions: [
            { prompt: "Why can't Anna come at three?", options: ["She is busy at work", "She has a doctor's appointment", "She is tired", "She forgot"], answerIndex: 1, explanation: "'I have a doctor's appointment.'" },
          ],
        },
      },
    ],
  },
  {
    level: 3,
    title: "Examen de nivel 3 — Pre-intermedio (META 400)",
    passThreshold: PASS_THRESHOLD,
    items: [
      mcq("Futuro: elige la opción.", "I think it ___ be a good year.", ["will", "is going", "going to", "wills"], 0, "Predicción/opinión: 'will be'."),
      mcq("Presente perfecto: elige la opción.", "We have ___ in this city for five years.", ["live", "lived", "living", "lives"], 1, "have + participio 'lived'."),
      mcq("Presente perfecto: participio.", "She has ___ her keys.", ["lose", "lost", "losed", "losing"], 1, "lose → lost."),
      mcq("Modal: elige la opción.", "You look tired. You ___ rest.", ["should", "must", "can", "would"], 0, "Consejo: should."),
      mcq("Condicional 1: elige la opción.", "If you study, you ___ pass.", ["would", "will", "are", "passed"], 1, "If + presente, will + verbo."),
      mcq("Cuantificador: elige la opción.", "How ___ water do you drink?", ["many", "much", "some", "few"], 1, "Incontable: much."),
      mcq("Adverbio de frecuencia: posición.", "She ___ late.", ["is never", "never is", "is be never", "never be"], 0, "Con TO BE el adverbio va después: is never."),
      mcq("WH-: elige la opción.", "___ does this jacket cost?", ["How many", "How much", "What time", "Where"], 1, "Precio: How much."),
      mcq("Modal de obligación.", "Drivers ___ stop at a red light.", ["should", "must", "can", "would"], 1, "Regla: must."),
      err([{ text: "This problem is", label: "A" }, { text: "more difficult", label: "B" }, { text: "that", label: "C" }, { text: "the last one.", label: "D" }], "C", "El comparativo usa 'than', no 'that'."),
      err([{ text: "I have", label: "A" }, { text: "seen", label: "B" }, { text: "him", label: "C" }, { text: "yesterday.", label: "D" }], "B", "Con 'yesterday' se usa pasado simple: 'saw', no presente perfecto."),
      err([{ text: "He can", label: "A" }, { text: "to speak", label: "B" }, { text: "three", label: "C" }, { text: "languages.", label: "D" }], "B", "Después de un modal va el verbo base sin 'to': 'speak'."),
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Recycling",
          passage:
            "Recycling helps reduce waste and saves energy. When we recycle paper, fewer trees are cut down. However, recycling only works if people separate their waste correctly. Therefore, many cities provide different bins for paper, plastic, and glass.",
          questions: [
            { prompt: "What is the main idea?", options: ["Recycling is useless", "Recycling helps but needs correct sorting", "Trees are not important", "Cities have no bins"], answerIndex: 1, explanation: "Beneficios y la condición de separar bien." },
            { prompt: "Which word introduces a contrast?", options: ["Therefore", "However", "And", "Because"], answerIndex: 1, explanation: "'However' marca contraste." },
            { prompt: "Why do cities provide different bins?", options: ["To save money", "To help people separate waste", "To plant trees", "For decoration"], answerIndex: 1, explanation: "Para separar correctamente." },
          ],
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Working from home",
          passage:
            "More people work from home today than ten years ago. Working from home can save time and reduce stress. On the other hand, some workers feel lonely and miss talking with colleagues. Companies are looking for a balance between office and home.",
          questions: [
            { prompt: "What is one advantage mentioned?", options: ["More money", "It saves time and reduces stress", "More meetings", "Free lunch"], answerIndex: 1, explanation: "'save time and reduce stress.'" },
            { prompt: "What is a disadvantage?", options: ["It is expensive", "Workers feel lonely", "It is slower", "No internet"], answerIndex: 1, explanation: "'some workers feel lonely.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Conversación sobre un reporte.",
          script:
            "Have you finished the report? Almost. I have written the introduction, but I haven't done the conclusion yet. I will finish it tonight.",
          questions: [
            { prompt: "What part is not finished?", options: ["The introduction", "The conclusion", "The title", "Everything"], answerIndex: 1, explanation: "'I haven't done the conclusion yet.'" },
            { prompt: "When will it be finished?", options: ["Now", "Tomorrow", "Tonight", "Next week"], answerIndex: 2, explanation: "'I will finish it tonight.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Aviso en el aeropuerto.",
          script: "Attention passengers. Flight 204 to London is delayed by two hours due to bad weather. The new departure time is four o'clock.",
          questions: [
            { prompt: "Why is the flight delayed?", options: ["Technical problem", "Bad weather", "A strike", "Too many passengers"], answerIndex: 1, explanation: "'due to bad weather.'" },
            { prompt: "What is the new departure time?", options: ["Two o'clock", "Three o'clock", "Four o'clock", "Five o'clock"], answerIndex: 2, explanation: "'four o'clock.'" },
          ],
        },
      },
    ],
  },
  {
    level: 4,
    title: "Examen de nivel 4 — Intermedio bajo",
    passThreshold: PASS_THRESHOLD,
    items: [
      mcq("Condicional 0/1: elige la opción.", "If you mix blue and yellow, you ___ green.", ["will get", "get", "got", "would get"], 1, "Verdad general: presente 'get'."),
      mcq("Condicional 2: elige la opción.", "If I had time, I ___ travel more.", ["will", "would", "am", "did"], 1, "If + pasado, would + verbo."),
      mcq("Voz pasiva: elige la opción.", "These phones ___ made in China.", ["is", "are", "was", "be"], 1, "Pasiva presente plural: are made."),
      mcq("Pasado continuo: elige la opción.", "I ___ cooking when he called.", ["was", "were", "am", "did"], 0, "Con 'I' en pasado continuo: was."),
      mcq("Used to: elige la opción.", "I ___ play the piano as a child.", ["use to", "used to", "used", "am used to"], 1, "Afirmativo: used to."),
      mcq("Relativo: elige la opción.", "The book ___ I read was great.", ["who", "which", "where", "whose"], 1, "Cosa: which/that."),
      mcq("Presente perfecto continuo.", "She has ___ working all day.", ["been", "be", "being", "was"], 0, "have been + -ing."),
      mcq("Modal de deducción.", "He isn't answering; he ___ be busy.", ["must", "should", "can", "would"], 0, "Deducción lógica: must."),
      err([{ text: "The results", label: "A" }, { text: "was", label: "B" }, { text: "published", label: "C" }, { text: "last month.", label: "D" }], "B", "'results' es plural: 'were published'."),
      err([{ text: "If I", label: "A" }, { text: "will have", label: "B" }, { text: "money, I would", label: "C" }, { text: "buy a car.", label: "D" }], "B", "Tras 'if' no va 'will'; condicional 2: 'had'."),
      err([{ text: "She", label: "A" }, { text: "didn't", label: "B" }, { text: "used to", label: "C" }, { text: "smoke.", label: "D" }], "C", "En negativo: 'use to' (sin -d)."),
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Electric cars",
          passage:
            "Electric cars are becoming more popular because they produce no exhaust emissions. Although they are still more expensive than gasoline cars, their running costs are lower. As charging stations become more common, more people are willing to switch.",
          questions: [
            { prompt: "Why are electric cars becoming popular?", options: ["They are cheaper to buy", "They produce no exhaust emissions", "They are slower", "They need no charging"], answerIndex: 1, explanation: "'they produce no exhaust emissions.'" },
            { prompt: "What is still a disadvantage?", options: ["High running costs", "They are more expensive to buy", "No models available", "They are dangerous"], answerIndex: 1, explanation: "'more expensive than gasoline cars.'" },
            { prompt: "What encourages people to switch?", options: ["Higher speed", "More charging stations", "Free cars", "Lower taxes"], answerIndex: 1, explanation: "'As charging stations become more common.'" },
          ],
        },
      },
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "Sleep and memory",
          passage:
            "Scientists have found that sleep plays an important role in memory. While we sleep, the brain organizes the information we learned during the day. People who sleep well usually remember new things better than those who sleep poorly.",
          questions: [
            { prompt: "What does the brain do during sleep?", options: ["Nothing", "Organizes information", "Forgets everything", "Rests only"], answerIndex: 1, explanation: "'the brain organizes the information.'" },
            { prompt: "Who remembers better?", options: ["People who sleep poorly", "People who sleep well", "People who don't sleep", "Everyone equally"], answerIndex: 1, explanation: "'People who sleep well ... remember ... better.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Mini-charla.",
          script:
            "Researchers found that people who take short breaks while studying remember more than those who study for hours without stopping.",
          questions: [
            { prompt: "What helps people remember more?", options: ["Studying for hours without stopping", "Taking short breaks while studying", "Never studying", "Studying only at night"], answerIndex: 1, explanation: "'people who take short breaks ... remember more.'" },
          ],
        },
      },
    ],
  },
  {
    level: 5,
    title: "Examen de nivel 5 — Intermedio",
    passThreshold: PASS_THRESHOLD,
    items: [
      mcq("Condicional 2: elige la opción.", "If I were you, I ___ accept the offer.", ["will", "would", "am going to", "did"], 1, "Condicional 2: would + verbo."),
      mcq("Condicional 3: elige la opción.", "If she had studied, she ___ passed.", ["would have", "will have", "would", "had"], 0, "Condicional 3: would have + participio."),
      mcq("Estilo indirecto: elige la opción.", "He said he ___ tired.", ["is", "was", "be", "will be"], 1, "Reported speech: presente → pasado."),
      mcq("Voz pasiva (pasado): elige la opción.", "The bridge ___ built in 1890.", ["is", "was", "were", "has"], 1, "Pasiva pasada singular: was built."),
      mcq("Relativo: elige la opción.", "The woman ___ car was stolen called the police.", ["who", "which", "whose", "where"], 2, "Posesión: whose."),
      mcq("Presente perfecto continuo.", "They ___ been waiting for an hour.", ["has", "have", "are", "was"], 1, "Con 'they': have been."),
      mcq("Conector: elige la opción.", "It was raining; ___, we went out.", ["therefore", "however", "because", "so"], 1, "Contraste: however."),
      mcq("Gerundio/infinitivo.", "I enjoy ___ to music.", ["listen", "to listen", "listening", "listened"], 2, "Después de 'enjoy' va gerundio: listening."),
      err([{ text: "The scientist", label: "A" }, { text: "which", label: "B" }, { text: "discovered it", label: "C" }, { text: "won a prize.", label: "D" }], "B", "Para personas se usa 'who', no 'which'."),
      err([{ text: "If he", label: "A" }, { text: "would have", label: "B" }, { text: "known, he would", label: "C" }, { text: "have helped.", label: "D" }], "B", "Tras 'if' en condicional 3 va 'had known', no 'would have'."),
      err([{ text: "She told", label: "A" }, { text: "that", label: "B" }, { text: "she was", label: "C" }, { text: "leaving.", label: "D" }], "B", "Se dice 'told me', o 'said that' (no 'told that')."),
      {
        area: "reading",
        question: {
          kind: "reading",
          title: "The value of failure",
          passage:
            "Many successful people say that failure taught them more than success ever did. When a plan fails, we are forced to examine what went wrong and to try a different approach. In this sense, failure is not the opposite of success but a necessary part of it.",
          questions: [
            { prompt: "According to the text, what does failure force us to do?", options: ["Give up", "Examine what went wrong", "Blame others", "Repeat the same plan"], answerIndex: 1, explanation: "'forced to examine what went wrong.'" },
            { prompt: "What is the author's main point?", options: ["Failure should be avoided", "Failure is part of success", "Success is luck", "Plans never fail"], answerIndex: 1, explanation: "'a necessary part of it.'" },
            { prompt: "The phrase 'a different approach' means...", options: ["the same method", "another way of doing it", "giving up", "a new person"], answerIndex: 1, explanation: "approach = manera de hacer algo." },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Mini-charla académica.",
          script:
            "One interesting finding is that learning a second language can improve concentration and even delay some effects of aging on the brain. This is one more reason to keep studying.",
          questions: [
            { prompt: "What can learning a language improve?", options: ["Eyesight", "Concentration", "Height", "Sleep only"], answerIndex: 1, explanation: "'improve concentration.'" },
            { prompt: "What else can it do?", options: ["Delay some effects of aging on the brain", "Make you richer", "Cure diseases", "Nothing else"], answerIndex: 0, explanation: "'delay some effects of aging on the brain.'" },
          ],
        },
      },
      {
        area: "listening",
        question: {
          kind: "listening",
          scriptLabel: "Conversación de trabajo.",
          script:
            "The client liked the proposal but asked us to reduce the budget by ten percent. If we can't, they might choose another company.",
          questions: [
            { prompt: "What did the client ask for?", options: ["A higher budget", "To reduce the budget by ten percent", "A new team", "More time"], answerIndex: 1, explanation: "'reduce the budget by ten percent.'" },
            { prompt: "What might happen if they can't?", options: ["The client will pay more", "The client might choose another company", "Nothing", "They get a bonus"], answerIndex: 1, explanation: "'they might choose another company.'" },
          ],
        },
      },
    ],
  },
];
