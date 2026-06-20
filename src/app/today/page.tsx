import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { getDailySession } from "@/content/daily";
import { DailyPlayer } from "@/components/DailyPlayer";

export const dynamic = "force-dynamic";

function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default async function TodayPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const daily = getDailySession(progress.studyDay);
  const alreadyDoneToday = isSameDay(progress.lastStudyAt, new Date());

  return <DailyPlayer session={daily} alreadyDoneToday={alreadyDoneToday} />;
}
