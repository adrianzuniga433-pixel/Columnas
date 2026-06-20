// Recursos de video para practicar, curados de la Guía de Inglés Autodidacta.
// Los videos se reproducen incrustados dentro del sitio (YouTube embed). Cada
// uno trae una tarea de práctica concreta. El contenido es de terceros; aquí
// solo se selecciona y se propone cómo practicar con él.

export interface VideoResource {
  title: string;
  youtubeId: string;
  teaches: string;
  practice: string;
}

export interface VideoLevel {
  level: string;
  emoji: string;
  intro: string;
  resources: VideoResource[];
}

export const videoLevels: VideoLevel[] = [
  {
    level: "Básico",
    emoji: "🟢",
    intro:
      "Empieza con subtítulos (actívalos en el ícono ⚙ del video). Cuando entiendas más, cámbialos a inglés y luego quítalos.",
    resources: [
      {
        title: "Conversación básica en inglés (vida real)",
        youtubeId: "QnlSt8IbKHY",
        teaches: "Diálogos cotidianos lentos y claros para principiantes.",
        practice:
          "Haz 'shadowing': repite cada frase justo después de escucharla, imitando el ritmo, durante 5 minutos.",
      },
      {
        title: "Conversaciones básicas: familia, saludos y escuela",
        youtubeId: "KftDkWCh2ec",
        teaches: "Frases para presentarte y hablar de tu día a día.",
        practice:
          "Anota 5 frases útiles y luego úsalas para presentarte en voz alta.",
      },
      {
        title: "Inglés fácil para nivel A1–A2 (30 min)",
        youtubeId: "zUOSv7tS8gI",
        teaches: "Conversación simple, ideal para empezar a entender oído.",
        practice:
          "Escucha 10 minutos con subtítulos. Anota 3 palabras nuevas con su significado.",
      },
      {
        title: "BBC 6 Minute English — Food",
        youtubeId: "bKfFvme1b8I",
        teaches: "Vocabulario de comida explicado por presentadores de la BBC.",
        practice:
          "Anota 3 palabras de comida nuevas y escribe una oración con cada una.",
      },
    ],
  },
  {
    level: "Intermedio",
    emoji: "🔵",
    intro:
      "Reduce los subtítulos en español. Intenta seguir el sentido general sin traducir cada palabra.",
    resources: [
      {
        title: "BBC 6 Minute English — All About Language",
        youtubeId: "fcN0BXzK8bg",
        teaches: "Una hora de vocabulario nuevo sobre el idioma y la comunicación.",
        practice:
          "Mira 15 minutos. Anota 5 expresiones nuevas y subráyalas en tu cuaderno.",
      },
      {
        title: "BBC 6 Minute English — Human Emotions",
        youtubeId: "_LlyKiROzhU",
        teaches: "Vocabulario para hablar de sentimientos y estados de ánimo.",
        practice:
          "Después de ver, escribe un párrafo corto describiendo cómo te sientes hoy.",
      },
      {
        title: "Present Perfect Tense — explicación de gramática",
        youtubeId: "WDGc3CEBOUU",
        teaches: "Cómo y cuándo usar el presente perfecto, con ejemplos.",
        practice:
          "Escribe 3 oraciones propias usando el presente perfecto (I have...).",
      },
      {
        title: "Present Perfect vs Present Perfect Continuous",
        youtubeId: "7NGLHYVmr00",
        teaches: "La diferencia entre dos tiempos que suelen confundirse.",
        practice:
          "Escribe 2 oraciones: una con cada tiempo, sobre tu propia vida.",
      },
    ],
  },
  {
    level: "Intermedio-Alto",
    emoji: "🟣",
    intro: "Intenta ver con subtítulos en inglés o sin subtítulos.",
    resources: [
      {
        title: "The secrets of learning a new language (TED)",
        youtubeId: "o_XVt5rdpFY",
        teaches: "Charla real (auténtica) sobre cómo aprender idiomas.",
        practice:
          "Mira la charla y resume en 3–4 oraciones la idea principal, en inglés.",
      },
      {
        title: "How to learn any language in six months (TED)",
        youtubeId: "d0yGdNEWdn0",
        teaches: "Inglés natural a velocidad nativa, con ideas motivadoras.",
        practice:
          "Elige 1 minuto y úsalo como dictado: pausa y escribe 5 frases tal cual.",
      },
      {
        title: "How to learn any language easily (TED)",
        youtubeId: "Yr_poW-KK1Q",
        teaches: "Consejos prácticos en inglés claro pero auténtico.",
        practice:
          "Anota 5 palabras o expresiones nuevas y búscalas para entenderlas.",
      },
      {
        title: "Learn ALL English tenses — repaso completo",
        youtubeId: "du34F6p9rQ8",
        teaches: "Repaso de todos los tiempos verbales en un solo video.",
        practice:
          "Mira un bloque y escribe una oración de ejemplo por cada tiempo que repases.",
      },
    ],
  },
];
