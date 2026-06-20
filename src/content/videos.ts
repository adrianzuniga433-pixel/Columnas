// Recursos de video para practicar, curados de la Guía de Inglés Autodidacta.
// Se usan canales que permiten la reproducción incrustada de forma confiable
// (BBC Learning English y TED). Cada uno trae una tarea de práctica concreta.
// El contenido es de terceros; aquí solo se selecciona y se propone cómo
// practicar con él.

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
      "Activa los subtítulos (ícono ⚙ del video). Empieza con subtítulos en inglés y, cuando entiendas más, quítalos.",
    resources: [
      {
        title: "BBC 6 Minute English — Talking at the table",
        youtubeId: "xy27CfuFtJE",
        teaches: "Vocabulario y expresiones para hablar durante la comida.",
        practice:
          "Mira el video y anota 3 expresiones nuevas. Repítelas en voz alta imitando la pronunciación.",
      },
      {
        title: "BBC 6 Minute English — Food",
        youtubeId: "bKfFvme1b8I",
        teaches: "Vocabulario de comida explicado por presentadores de la BBC.",
        practice:
          "Anota 3 palabras de comida nuevas y escribe una oración con cada una.",
      },
      {
        title: "BBC 6 Minute English — How babies learn to talk",
        youtubeId: "1lNbOH-cvl8",
        teaches: "Escucha clara y pausada sobre un tema cotidiano.",
        practice:
          "Después de ver, intenta resumir en 2 oraciones de qué trató el episodio.",
      },
    ],
  },
  {
    level: "Intermedio",
    emoji: "🔵",
    intro:
      "Intenta seguir el sentido general sin traducir cada palabra. Usa subtítulos en inglés si lo necesitas.",
    resources: [
      {
        title: "BBC 6 Minute English — All About Language",
        youtubeId: "fcN0BXzK8bg",
        teaches: "Una hora de vocabulario sobre el idioma y la comunicación.",
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
        title: "BBC 6 Minute English — Wellbeing",
        youtubeId: "WMokf0EgTcA",
        teaches: "Vocabulario sobre bienestar y salud mental.",
        practice:
          "Anota 5 palabras nuevas y escribe una oración con cada una.",
      },
      {
        title: "BBC 6 Minute English — Food and Drink",
        youtubeId: "gEdPVA-6rVs",
        teaches: "Una hora de vocabulario sobre comida y bebida.",
        practice:
          "Elige 2 minutos y úsalos como dictado: pausa y escribe lo que escuches.",
      },
    ],
  },
  {
    level: "Intermedio-Alto",
    emoji: "🟣",
    intro: "Contenido auténtico. Intenta verlo con subtítulos en inglés o sin subtítulos.",
    resources: [
      {
        title: "The secrets of learning a new language (TED)",
        youtubeId: "o_XVt5rdpFY",
        teaches: "Charla real sobre cómo aprender idiomas, de una políglota.",
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
        teaches: "Consejos prácticos de un políglota, en inglés claro.",
        practice:
          "Anota 5 palabras o expresiones nuevas y búscalas para entenderlas.",
      },
      {
        title: "Speak a language like you're playing a video game (TED)",
        youtubeId: "Ge7c7otG2mk",
        teaches: "Una forma relajada de pensar el hablar en otro idioma.",
        practice:
          "Después de ver, di en voz alta 3 ideas que recuerdes de la charla.",
      },
    ],
  },
];
