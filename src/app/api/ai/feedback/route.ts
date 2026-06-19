import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserId } from "@/lib/auth";
import { aiEnabled, getWritingFeedback } from "@/lib/ai";

const schema = z.object({
  prompt: z.string().min(1),
  text: z.string().min(1).max(3000),
  level: z.number().int().min(1).max(5),
});

export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (!aiEnabled()) {
    return NextResponse.json(
      {
        error:
          "La retroalimentación con IA no está disponible. Configura ANTHROPIC_API_KEY para activarla.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const feedback = await getWritingFeedback(
    parsed.data.prompt,
    parsed.data.text,
    parsed.data.level
  );

  if (!feedback) {
    return NextResponse.json(
      { error: "No se pudo generar la retroalimentación. Inténtalo más tarde." },
      { status: 502 }
    );
  }

  return NextResponse.json({ feedback });
}
