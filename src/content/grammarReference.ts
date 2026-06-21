// Contenido de referencia para la biblioteca de gramática: tiempos verbales
// (formas afirmativa, negativa e interrogativa), verbos irregulares y adjetivos
// calificativos. Contenido original.

export interface TenseForm {
  tense: string;
  affirmative: string;
  negative: string;
  interrogative: string;
  use: string;
}

export const tenseForms: TenseForm[] = [
  {
    tense: "Presente simple",
    affirmative: "She works every day.",
    negative: "She doesn't work every day.",
    interrogative: "Does she work every day?",
    use: "Hábitos y rutinas.",
  },
  {
    tense: "Presente continuo",
    affirmative: "She is working now.",
    negative: "She isn't working now.",
    interrogative: "Is she working now?",
    use: "Algo que ocurre ahora.",
  },
  {
    tense: "Pasado simple",
    affirmative: "She worked yesterday.",
    negative: "She didn't work yesterday.",
    interrogative: "Did she work yesterday?",
    use: "Acciones terminadas en el pasado.",
  },
  {
    tense: "Pasado continuo",
    affirmative: "She was working at 8.",
    negative: "She wasn't working at 8.",
    interrogative: "Was she working at 8?",
    use: "Acción en progreso en el pasado.",
  },
  {
    tense: "Futuro (will)",
    affirmative: "She will work tomorrow.",
    negative: "She won't work tomorrow.",
    interrogative: "Will she work tomorrow?",
    use: "Predicciones y decisiones del momento.",
  },
  {
    tense: "Futuro (going to)",
    affirmative: "She is going to work.",
    negative: "She isn't going to work.",
    interrogative: "Is she going to work?",
    use: "Planes ya decididos.",
  },
  {
    tense: "Presente perfecto",
    affirmative: "She has worked here.",
    negative: "She hasn't worked here.",
    interrogative: "Has she worked here?",
    use: "Experiencias y acciones con efecto en el presente.",
  },
  {
    tense: "Presente perfecto continuo",
    affirmative: "She has been working.",
    negative: "She hasn't been working.",
    interrogative: "Has she been working?",
    use: "Acción que empezó antes y sigue.",
  },
];

export interface IrregularVerb {
  base: string;
  past: string;
  participle: string;
  es: string;
}

export const irregularVerbs: IrregularVerb[] = [
  { base: "be", past: "was/were", participle: "been", es: "ser/estar" },
  { base: "become", past: "became", participle: "become", es: "convertirse en" },
  { base: "begin", past: "began", participle: "begun", es: "empezar" },
  { base: "break", past: "broke", participle: "broken", es: "romper" },
  { base: "bring", past: "brought", participle: "brought", es: "traer" },
  { base: "build", past: "built", participle: "built", es: "construir" },
  { base: "buy", past: "bought", participle: "bought", es: "comprar" },
  { base: "catch", past: "caught", participle: "caught", es: "atrapar" },
  { base: "choose", past: "chose", participle: "chosen", es: "elegir" },
  { base: "come", past: "came", participle: "come", es: "venir" },
  { base: "do", past: "did", participle: "done", es: "hacer" },
  { base: "drink", past: "drank", participle: "drunk", es: "beber" },
  { base: "drive", past: "drove", participle: "driven", es: "conducir" },
  { base: "eat", past: "ate", participle: "eaten", es: "comer" },
  { base: "fall", past: "fell", participle: "fallen", es: "caer" },
  { base: "feel", past: "felt", participle: "felt", es: "sentir" },
  { base: "find", past: "found", participle: "found", es: "encontrar" },
  { base: "fly", past: "flew", participle: "flown", es: "volar" },
  { base: "forget", past: "forgot", participle: "forgotten", es: "olvidar" },
  { base: "get", past: "got", participle: "gotten", es: "obtener" },
  { base: "give", past: "gave", participle: "given", es: "dar" },
  { base: "go", past: "went", participle: "gone", es: "ir" },
  { base: "grow", past: "grew", participle: "grown", es: "crecer" },
  { base: "have", past: "had", participle: "had", es: "tener" },
  { base: "hear", past: "heard", participle: "heard", es: "oír" },
  { base: "keep", past: "kept", participle: "kept", es: "guardar/mantener" },
  { base: "know", past: "knew", participle: "known", es: "saber/conocer" },
  { base: "leave", past: "left", participle: "left", es: "dejar/salir" },
  { base: "lose", past: "lost", participle: "lost", es: "perder" },
  { base: "make", past: "made", participle: "made", es: "hacer/fabricar" },
  { base: "meet", past: "met", participle: "met", es: "conocer/reunirse" },
  { base: "pay", past: "paid", participle: "paid", es: "pagar" },
  { base: "put", past: "put", participle: "put", es: "poner" },
  { base: "read", past: "read", participle: "read", es: "leer" },
  { base: "run", past: "ran", participle: "run", es: "correr" },
  { base: "say", past: "said", participle: "said", es: "decir" },
  { base: "see", past: "saw", participle: "seen", es: "ver" },
  { base: "sell", past: "sold", participle: "sold", es: "vender" },
  { base: "send", past: "sent", participle: "sent", es: "enviar" },
  { base: "sit", past: "sat", participle: "sat", es: "sentarse" },
  { base: "sleep", past: "slept", participle: "slept", es: "dormir" },
  { base: "speak", past: "spoke", participle: "spoken", es: "hablar" },
  { base: "spend", past: "spent", participle: "spent", es: "gastar/pasar tiempo" },
  { base: "stand", past: "stood", participle: "stood", es: "estar de pie" },
  { base: "swim", past: "swam", participle: "swum", es: "nadar" },
  { base: "take", past: "took", participle: "taken", es: "tomar/llevar" },
  { base: "teach", past: "taught", participle: "taught", es: "enseñar" },
  { base: "tell", past: "told", participle: "told", es: "decir/contar" },
  { base: "think", past: "thought", participle: "thought", es: "pensar" },
  { base: "understand", past: "understood", participle: "understood", es: "entender" },
  { base: "wear", past: "wore", participle: "worn", es: "vestir/usar" },
  { base: "win", past: "won", participle: "won", es: "ganar" },
  { base: "write", past: "wrote", participle: "written", es: "escribir" },
];

export interface Adjective {
  en: string;
  es: string;
}

export const adjectives: Adjective[] = [
  { en: "big", es: "grande" },
  { en: "small", es: "pequeño" },
  { en: "tall", es: "alto" },
  { en: "short", es: "bajo / corto" },
  { en: "long", es: "largo" },
  { en: "old", es: "viejo" },
  { en: "new", es: "nuevo" },
  { en: "young", es: "joven" },
  { en: "good", es: "bueno" },
  { en: "bad", es: "malo" },
  { en: "happy", es: "feliz" },
  { en: "sad", es: "triste" },
  { en: "beautiful", es: "hermoso" },
  { en: "ugly", es: "feo" },
  { en: "fast", es: "rápido" },
  { en: "slow", es: "lento" },
  { en: "hot", es: "caliente" },
  { en: "cold", es: "frío" },
  { en: "easy", es: "fácil" },
  { en: "difficult", es: "difícil" },
  { en: "expensive", es: "caro" },
  { en: "cheap", es: "barato" },
  { en: "strong", es: "fuerte" },
  { en: "weak", es: "débil" },
  { en: "clean", es: "limpio" },
  { en: "dirty", es: "sucio" },
  { en: "full", es: "lleno" },
  { en: "empty", es: "vacío" },
  { en: "interesting", es: "interesante" },
  { en: "boring", es: "aburrido" },
  { en: "friendly", es: "amable / amistoso" },
  { en: "funny", es: "gracioso" },
  { en: "busy", es: "ocupado" },
  { en: "tired", es: "cansado" },
  { en: "hungry", es: "hambriento" },
  { en: "thirsty", es: "sediento" },
  { en: "dangerous", es: "peligroso" },
  { en: "safe", es: "seguro" },
  { en: "important", es: "importante" },
  { en: "quiet", es: "callado / tranquilo" },
];
