import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";
import { MockExam } from "@/components/MockExam";
import { flatMockItems, sanitizeMockItem, totalMockQuestions } from "@/lib/mock";

export const dynamic = "force-dynamic";

export default async function MockPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");

  const items = flatMockItems().map(sanitizeMockItem);
  const totalQuestions = totalMockQuestions();
  // ~45 segundos por pregunta, con un mínimo razonable.
  const durationSeconds = Math.max(600, totalQuestions * 45);

  return (
    <MockExam
      items={items}
      totalQuestions={totalQuestions}
      durationSeconds={durationSeconds}
    />
  );
}
