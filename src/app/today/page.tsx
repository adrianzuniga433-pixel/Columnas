import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureProgress, isToday } from "@/lib/progress";
import { getDailySession } from "@/content/daily";
import { DailyPlayer, type DailySection } from "@/components/DailyPlayer";

export const dynamic = "force-dynamic";

const VALID_SECTIONS: DailySection[] = [
  "full",
  "grammar",
  "vocab",
  "comprension",
  "conversation",
  "pronunciation",
  "produccion",
  "recursos",
];

export default async function TodayPage({
  searchParams,
}: {
  searchParams: { section?: string; mode?: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const daily = getDailySession(progress.studyDay);
  const alreadyDoneToday = isToday(progress.lastStudyAt);

  const section = VALID_SECTIONS.includes(searchParams.section as DailySection)
    ? (searchParams.section as DailySection)
    : "full";

  return (
    <DailyPlayer
      session={daily}
      alreadyDoneToday={alreadyDoneToday}
      section={section}
      quick={searchParams.mode === "short"}
    />
  );
}
