import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";

const schema = z.object({
  conceptKey: z.string().min(1),
  correct: z.boolean(),
});

// Marca el resultado de un repaso de error: si acierta, queda dominado.
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

  const { conceptKey, correct } = parsed.data;
  await prisma.mistakeItem
    .update({
      where: { userId_conceptKey: { userId, conceptKey } },
      data: correct
        ? { mastered: true }
        : { timesWrong: { increment: 1 }, lastWrongAt: new Date() },
    })
    .catch(() => null);

  return NextResponse.json({ ok: true });
}
