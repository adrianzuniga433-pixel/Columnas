import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/AppHeader";
import { CheckpointExam } from "@/components/CheckpointExam";
import { buildCheckpointExam, checkpointDue } from "@/content/daily";

export const dynamic = "force-dynamic";

const CHECKPOINT_LEVEL_BASE = 1000;

export default async function CheckpointPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  const progress = await ensureProgress(session.userId);
  const milestone = checkpointDue(progress.studyDay);
  if (!milestone) redirect("/dashboard");

  const passed = await prisma.examAttempt.findFirst({
    where: {
      userId: session.userId,
      level: CHECKPOINT_LEVEL_BASE + milestone,
      passed: true,
    },
  });

  const questions = buildCheckpointExam(milestone);

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <CheckpointExam
        milestone={milestone}
        questions={questions}
        alreadyPassed={!!passed}
      />
    </div>
  );
}
