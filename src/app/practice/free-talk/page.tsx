import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { FreeTalk } from "@/components/FreeTalk";

export const dynamic = "force-dynamic";

export default async function FreeTalkPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <FreeTalk />
    </div>
  );
}
