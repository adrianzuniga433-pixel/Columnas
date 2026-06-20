import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { getDailySession } from "@/content/daily";
import { DailyPlayer, type DailySection } from "@/components/DailyPlayer";

export const dynamic = "force-dynamic";

const VALID_SECTIONS: DailySection[] = [
  "full",
  "grammar",
  "vocab",
  "comprension",
  "produccion",
  "recursos",
];

function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default async function TodayPage({
  searchParams,
}: {
  searchParams: { section?: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const daily = getDailySession(progress.studyDay);
  const alreadyDoneToday = isSameDay(progress.lastStudyAt, new Date());

  const section = VALID_SECTIONS.includes(searchParams.section as DailySection)
    ? (searchParams.section as DailySection)
    : "full";

  return (
    <DailyPlayer
      session={daily}
      alreadyDoneToday={alreadyDoneToday}
      section={section}
    />
  );
}
