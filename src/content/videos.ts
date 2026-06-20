// Recursos de video y escucha para practicar, curados de la Guía de Inglés
// Autodidacta. Cada recurso incluye un enlace real y una tarea de práctica
// concreta. El contenido enlazado es de terceros (YouTube, etc.); aquí solo se
// recomienda y se propone cómo practicar con él.

export interface VideoResource {
  title: string;
  url: string;
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
      "Empieza con subtítulos en español; cuando entiendas más, cámbialos a inglés y luego quítalos.",
    resources: [
      {
        title: "EnglishClass101",
        url: "https://www.youtube.com/@EnglishClass101",
        teaches: "Lecciones estructuradas desde cero: vocabulario y gramática.",
        practice:
          "Mira una lección de 10 minutos. Anota 5 frases nuevas y repítelas en voz alta 3 veces cada una.",
      },
      {
        title: "Speak English With Vanessa",
        url: "https://www.youtube.com/@SpeakEnglishWithVanessa",
        teaches: "Pronunciación y fluidez para la vida real.",
        practice:
          "Elige un video. Haz 'shadowing': repite cada frase justo después de ella, imitando la entonación, durante 5 minutos.",
      },
      {
        title: "BBC Learning English — 6 Minute English",
        url: "https://www.youtube.com/@bbclearningenglish",
        teaches: "Un tema distinto cada semana en 6 minutos, con vocabulario actual.",
        practice:
          "Escucha un episodio con subtítulos. Anota 3 palabras nuevas con su significado y escribe una oración con cada una.",
      },
      {
        title: "Learn English with TV Series",
        url: "https://www.youtube.com/@LearnEnglishWithTVSeries",
        teaches: "Aprende inglés real con clips de series famosas.",
        practice:
          "Mira un clip. Ponlo en pausa después de cada línea y repite lo que dijo el personaje, copiando el ritmo.",
      },
      {
        title: "Serie: FRIENDS (Netflix / streaming)",
        url: "https://www.youtube.com/results?search_query=friends+english+lesson+clip",
        teaches: "Diálogos naturales de vida cotidiana con pronunciación clara.",
        practice:
          "Mira 1 escena con subtítulos en inglés. Anota 3 expresiones coloquiales y búscalas para entenderlas.",
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
        title: "English with Lucy",
        url: "https://www.youtube.com/@EnglishwithLucy",
        teaches: "Gramática explicada con ejemplos claros y divertidos.",
        practice:
          "Mira una lección de gramática y escribe 3 oraciones propias usando lo que aprendiste.",
      },
      {
        title: "TED-Ed",
        url: "https://www.youtube.com/@TEDEd",
        teaches: "Temas culturales y científicos con inglés académico accesible.",
        practice:
          "Mira un video de ~5 minutos sin subtítulos en español. Resume en 2 oraciones la idea principal.",
      },
      {
        title: "Serie: The Office (USA) o Brooklyn Nine-Nine",
        url: "https://www.youtube.com/results?search_query=the+office+best+moments+english",
        teaches: "Inglés informal, humor y vocabulario de trabajo y vida diaria.",
        practice:
          "Mira un episodio con subtítulos en inglés. Elige 5 frases útiles y escríbelas en tu cuaderno.",
      },
      {
        title: "BBC Learning English — News Review",
        url: "https://www.youtube.com/@bbclearningenglish",
        teaches: "Vocabulario de noticias actuales explicado paso a paso.",
        practice:
          "Mira un 'News Review'. Anota 3 expresiones nuevas y úsalas para escribir un párrafo corto.",
      },
    ],
  },
  {
    level: "Intermedio-Alto",
    emoji: "🟣",
    intro: "Intenta ver contenido nativo sin subtítulos o con subtítulos en inglés.",
    resources: [
      {
        title: "Kurzgesagt – In a Nutshell",
        url: "https://www.youtube.com/@kurzgesagt",
        teaches: "Inglés académico y vocabulario científico con animaciones.",
        practice:
          "Mira un video sin subtítulos. Anota 5 términos nuevos, búscalos y explica el tema en voz alta.",
      },
      {
        title: "Serie: Mindhunter o Brooklyn Nine-Nine",
        url: "https://www.youtube.com/results?search_query=mindhunter+scene+english",
        teaches: "Vocabulario avanzado e inglés formal e informal.",
        practice:
          "Mira una escena sin subtítulos en español. Escribe un resumen de 3–4 oraciones de lo que pasó.",
      },
      {
        title: "TED Talks (canal oficial)",
        url: "https://www.youtube.com/@TED",
        teaches: "Charlas reales sobre ideas, ciencia y cultura.",
        practice:
          "Elige una charla de un tema que te interese. Tómala como dictado: pausa y escribe 5 frases tal cual.",
      },
    ],
  },
];
