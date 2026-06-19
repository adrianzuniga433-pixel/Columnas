import "server-only";

export function aiEnabled(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

/**
 * Da retroalimentación cualitativa a un texto libre en inglés del estudiante.
 * Devuelve null si la API no está configurada o falla (degradación elegante).
 */
export async function getWritingFeedback(
  prompt: string,
  studentText: string,
  level: number
): Promise<string | null> {
  if (!aiEnabled()) return null;

  try {
    // Importación dinámica para que la app funcione aunque el paquete no esté.
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const system =
      "Eres un tutor de inglés paciente para hispanohablantes que estudian para el TOEFL ITP. " +
      "Corriges textos cortos y das retroalimentación clara, breve y motivadora EN ESPAÑOL. " +
      "Estructura tu respuesta con: 1) un comentario general positivo, 2) una lista de 2-4 correcciones " +
      "concretas (error → corrección → por qué), y 3) una versión mejorada del texto en inglés. " +
      "Adapta la exigencia al nivel indicado (1=A1 ... 5=B1). No inventes errores que no existen.";

    const message = await client.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: 1024,
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
    return block && block.type === "text" ? block.text : null;
  } catch (err) {
    console.error("Error al obtener feedback de IA:", err);
    return null;
  }
}
