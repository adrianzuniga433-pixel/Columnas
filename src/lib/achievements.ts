export interface AchievementInput {
  streak: number;
  wordsLearned: number;
  daysStudied: number;
  mistakesMastered: number;
  examsPassed: number;
  studyDay: number;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  desc: string;
  earned: boolean;
  current: number;
  goal: number;
}

export function computeAchievements(i: AchievementInput): Achievement[] {
  const make = (
    id: string,
    icon: string,
    title: string,
    desc: string,
    current: number,
    goal: number
  ): Achievement => ({
    id,
    icon,
    title,
    desc,
    current: Math.min(current, goal),
    goal,
    earned: current >= goal,
  });

  return [
    make("first-day", "🌱", "Primer paso", "Estudia tu primer día", i.daysStudied, 1),
    make("streak-3", "🔥", "Racha de 3", "Estudia 3 días seguidos", i.streak, 3),
    make("streak-7", "🔥", "Una semana", "Racha de 7 días", i.streak, 7),
    make("streak-30", "🏅", "Un mes", "Racha de 30 días", i.streak, 30),
    make("days-10", "📅", "Constante", "Estudia 10 días en total", i.daysStudied, 10),
    make("days-30", "📅", "Disciplinado", "Estudia 30 días en total", i.daysStudied, 30),
    make("words-25", "📚", "Vocabulario inicial", "Aprende 25 palabras", i.wordsLearned, 25),
    make("words-100", "📚", "Vocabulario sólido", "Aprende 100 palabras", i.wordsLearned, 100),
    make("words-250", "🧠", "Gran vocabulario", "Aprende 250 palabras", i.wordsLearned, 250),
    make("day-10", "🚀", "En marcha", "Llega al Día 10 del plan", i.studyDay, 10),
    make("day-30", "🚀", "Medio camino", "Llega al Día 30 del plan", i.studyDay, 30),
    make("mistakes-5", "💪", "Aprendo de mis errores", "Domina 5 errores", i.mistakesMastered, 5),
    make("mistakes-20", "💪", "A prueba de errores", "Domina 20 errores", i.mistakesMastered, 20),
    make("exam-1", "🏆", "Examen aprobado", "Aprueba un examen de nivel", i.examsPassed, 1),
  ];
}
