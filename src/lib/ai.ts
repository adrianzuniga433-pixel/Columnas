import "server-only";

export function aiEnabled(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export interface WritingCorrection {
  error: string; // fragmento incorrecto (en inglés)
  correction: string; // versión corregida (en inglés)
  why: string; // explicación en español
}

export interface WritingReview {
  band: string; // p. ej. "A2"
  score: number; // 0-100
  summary: string; // comentario general en español
  corrections: WritingCorrection[];
  improved: string; // texto reescrito y corregido en inglés
}

function extractJson(text: string): unknown | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

/**
 * Reseña ESTRUCTURADA de un texto del estudiante: puntaje, comentario,
 * correcciones (error → corrección → por qué) y una versión mejorada.
 * Devuelve null si la IA no está configurada o si la respuesta no es válida.
 */
export async function getWritingReview(
  prompt: string,
  studentText: string,
  level: number
): Promise<WritingReview | null> {
  if (!aiEnabled()) return null;

  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const system =
      "Eres un tutor de inglés para hispanohablantes que estudian para el TOEFL ITP. " +
      "Evalúas textos cortos y respondes ÚNICAMENTE con un objeto JSON válido, sin markdown " +
      "ni texto adicional, con esta forma EXACTA: " +
      '{"band": string (nivel MCER estimado, p.ej. "A2"), "score": number (0-100), ' +
      '"summary": string (comentario general breve y motivador EN ESPAÑOL), ' +
      '"corrections": [{"error": string (fragmento incorrecto en inglés), "correction": string (corrección en inglés), "why": string (por qué, EN ESPAÑOL)}], ' +
      '"improved": string (el texto reescrito y corregido en inglés, manteniendo las ideas del estudiante)}. ' +
      "Incluye entre 2 y 5 correcciones reales (no inventes errores). Ajusta la exigencia al nivel (1=A1 ... 5=B1).";

    const message = await client.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: 1200,
      system,
      messages: [
        {
          role: "user",
          content:
            `Nivel del estudiante: ${level}/5.\n` +
            `Consigna (en español): ${prompt}\n\n` +
            `Texto del estudiante (en inglés):\n"""${studentText}"""`,
        },
      ],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") return null;
    const parsed = extractJson(block.text) as Partial<WritingReview> | null;
    if (!parsed || typeof parsed.summary !== "string") return null;

    return {
      band: typeof parsed.band === "string" ? parsed.band : "—",
      score:
        typeof parsed.score === "number"
          ? Math.max(0, Math.min(100, Math.round(parsed.score)))
          : 0,
      summary: parsed.summary,
      corrections: Array.isArray(parsed.corrections)
        ? parsed.corrections
            .filter(
              (c): c is WritingCorrection =>
                !!c &&
                typeof c.error === "string" &&
                typeof c.correction === "string"
            )
            .slice(0, 6)
        : [],
      improved: typeof parsed.improved === "string" ? parsed.improved : "",
    };
  } catch (err) {
    console.error("Error al obtener reseña de IA:", err);
    return null;
  }
}
