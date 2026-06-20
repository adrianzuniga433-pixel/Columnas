import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/AppHeader";
import { Dictionary, type DictWord } from "@/components/Dictionary";

export const dynamic = "force-dynamic";

export default async function DictionaryPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  const rows = await prisma.srsItem.findMany({
    where: { userId: session.userId, type: "vocab" },
    orderBy: { front: "asc" },
    select: { front: true, back: true, example: true },
  });

  const words: DictWord[] = rows.map((r) => ({
    front: r.front,
    back: r.back,
    example: r.example,
  }));

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <Dictionary words={words} />
    </div>
  );
}
