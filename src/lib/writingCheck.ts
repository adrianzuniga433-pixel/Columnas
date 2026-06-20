// Revisión de escritura SIN IA: heurísticas y reglas para errores comunes de
// hispanohablantes aprendiendo inglés. Da retroalimentación inmediata y útil.

export interface WritingFeedback {
  words: number;
  sentences: number;
  avgWords: number;
  issues: { text: string; tip: string }[];
  good: string[];
}

interface Rule {
  re: RegExp;
  tip: string;
}

// Reglas de errores frecuentes (regex, sin distinción de may/min salvo nota).
const RULES: Rule[] = [
  { re: /\bi\b/g, tip: "El pronombre «I» (yo) SIEMPRE va en mayúscula." },
  { re: /\bi'm\b/g, tip: "Escribe «I'm» con I mayúscula." },
  { re: /\bi've\b/g, tip: "Escribe «I've» con I mayúscula." },
  { re: /\bpeople is\b/gi, tip: "«people» es plural: usa «people are», no «people is»." },
  { re: /\bI have \d+ years?\b/gi, tip: "Para la edad se usa «I am X years old», no «I have X years»." },
  { re: /\bmore (better|worse|easier|bigger|faster)\b/gi, tip: "No se combina «more» con un comparativo en -er. Usa solo «better/easier…»." },
  { re: /\bdidn't \w+ed\b/gi, tip: "Después de «didn't» el verbo va en base: «didn't go», no «didn't went/played-ed»." },
  { re: /\bdoesn't \w+s\b/gi, tip: "Después de «doesn't» el verbo va en base, sin -s: «doesn't work»." },
  { re: /\bin the morning\b/gi, tip: "" }, // marcador positivo, no error (se filtra abajo)
  { re: /\bvery much\b/gi, tip: "Cuida no abusar de «very much»; a veces basta «a lot» o un adjetivo más fuerte." },
  { re: /\bfor to\b/gi, tip: "No se dice «for to + verbo». Usa solo «to + verbo» para indicar propósito." },
  { re: /\bhow is called\b/gi, tip: "Se dice «what is it called?», no «how is it called?»." },
  { re: /  +/g, tip: "Hay espacios dobles; deja solo un espacio entre palabras." },
];

function countWords(t: string): number {
  const m = t.trim().match(/\b[\w']+\b/g);
  return m ? m.length : 0;
}

export function checkWriting(textRaw: string): WritingFeedback {
  const text = textRaw.replace(/\s+\n/g, "\n").trim();
  const words = countWords(text);
  const sentenceParts = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentences = sentenceParts.length;
  const avgWords = sentences > 0 ? Math.round(words / sentences) : words;

  const issues: { text: string; tip: string }[] = [];
  const seen = new Set<string>();
  const add = (snippet: string, tip: string) => {
    if (!tip) return;
    const key = tip + "|" + snippet.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    issues.push({ text: snippet, tip });
  };

  // Regla especial: «i» minúscula solo cuenta si está aislada como pronombre.
  // Usamos el texto ORIGINAL para detectar minúsculas reales.
  for (const rule of RULES) {
    if (!rule.tip) continue;
    // Para reglas sensibles a mayúsculas (la del pronombre I), revisamos sin la flag i.
    const re = new RegExp(rule.re.source, rule.re.flags);
    let match: RegExpExecArray | null;
    let count = 0;
    while ((match = re.exec(text)) !== null && count < 3) {
      // Para «\bi\b» solo marcar si está en minúscula en el original.
      if (rule.re.source === "\\bi\\b" && match[0] !== "i") continue;
      add(match[0], rule.tip);
      count++;
      if (!re.global) break;
    }
  }

  // Mayúscula al inicio de cada oración.
  for (const s of sentenceParts) {
    const first = s[0];
    if (first && first >= "a" && first <= "z") {
      add(s.slice(0, 12) + "…", "Empieza cada oración con mayúscula.");
      break;
    }
  }

  // Puntuación final.
  if (text.length > 0 && !/[.!?]"?$/.test(text)) {
    add("", "Termina tu texto con un punto (.) o signo de cierre.");
  }

  // Palabras repetidas tres veces seguidas.
  const rep = text.match(/\b(\w+)\s+\1\s+\1\b/i);
  if (rep) add(rep[0], "Hay una palabra repetida varias veces seguidas; revisa la oración.");

  // Mensajes positivos.
  const good: string[] = [];
  if (words >= 40) good.push(`Buen desarrollo: escribiste ${words} palabras.`);
  else if (words >= 15) good.push(`Bien, escribiste ${words} palabras. Intenta extenderte un poco más.`);
  if (sentences >= 4) good.push("Usaste varias oraciones; buena estructura.");
  if (avgWords >= 6 && avgWords <= 18) good.push("La longitud de tus oraciones es adecuada.");
  if (/\b(however|although|because|so that|in addition|therefore|but|and|when|if)\b/i.test(text))
    good.push("Usaste conectores para unir ideas. ¡Muy bien!");
  if (issues.length === 0) good.push("No detecté errores comunes. ¡Excelente!");

  return { words, sentences, avgWords, issues, good };
}
