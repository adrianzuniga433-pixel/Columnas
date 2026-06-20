import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/AppHeader";
import { getCurrentUser } from "@/lib/auth";
import { MistakesReview, type MistakeMcq } from "@/components/MistakesReview";
import type { Mcq } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function MistakesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  const rows = await prisma.mistakeItem.findMany({
    where: { userId: session.userId, mastered: false },
    orderBy: { lastWrongAt: "desc" },
    take: 20,
  });

  const items: MistakeMcq[] = rows.map((r) => {
    let options: string[] = [];
    try {
      options = JSON.parse(r.options);
    } catch {
      options = [];
    }
    const mcq: Mcq = {
      kind: "mcq",
      prompt: r.prompt,
      sentence: r.sentence ?? undefined,
      options,
      answerIndex: r.answerIndex,
      explanation: r.explanation,
      translationEs: r.translationEs ?? undefined,
      topicTitle: r.topicTitle ?? undefined,
      topicWhy: r.topicWhy ?? undefined,
    };
    return { conceptKey: r.conceptKey, mcq };
  });

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <MistakesReview items={items} />
    </div>
  );
}
