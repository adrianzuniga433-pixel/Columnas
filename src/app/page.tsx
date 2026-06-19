import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureProgress } from "@/lib/progress";

export default async function Home() {
  const session = await getSession();
  if (!session) redirect("/login");

  const progress = await ensureProgress(session.userId);
  if (!progress.placementDone) redirect("/placement");
  redirect("/dashboard");
}
