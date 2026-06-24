import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserId } from "@/lib/auth";
import { markSectionComplete } from "@/lib/progress";

// La sección se valida en markSectionComplete (ignora valores desconocidos).
const schema = z.object({
  section: z.string().min(1).max(40),
});

export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
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

  const result = await markSectionComplete(userId, parsed.data.section);
  return NextResponse.json({ ok: true, ...result });
}
