import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { aiEnabled } from "@/lib/ai";
import { AppHeader } from "@/components/AppHeader";
import { WritingPractice } from "@/components/WritingPractice";

export const dynamic = "force-dynamic";

export default async function WritingPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();
  const progress = await ensureProgress(session.userId);

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <WritingPractice enabled={aiEnabled()} level={progress.currentLevel} />
    </div>
  );
}
