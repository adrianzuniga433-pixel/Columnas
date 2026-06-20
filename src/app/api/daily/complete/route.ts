import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { completeDailySession } from "@/lib/progress";

export async function POST() {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const result = await completeDailySession(userId);
  return NextResponse.json({ ok: true, ...result });
}
