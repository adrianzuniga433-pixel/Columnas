import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { ensureProgress, getProgressStats } from "@/lib/progress";
import { getDailySession } from "@/content/daily";
import { CertificateView } from "@/components/CertificateView";

export const dynamic = "force-dynamic";

export default async function CertificatePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  const progress = await ensureProgress(session.userId);
  const stats = await getProgressStats(session.userId);
  const daily = getDailySession(progress.studyDay);

  const name = user?.name?.trim() || user?.email?.split("@")[0] || "Estudiante";
  const date = new Date().toLocaleDateString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 py-6 dark:bg-slate-950 print:bg-white">
      <CertificateView
        name={name}
        stage={daily.stage}
        studyDay={progress.studyDay}
        words={stats.wordsLearned}
        daysStudied={stats.studyDates.size}
        date={date}
      />
    </div>
  );
}
