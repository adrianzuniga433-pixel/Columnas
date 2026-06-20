import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { ConversationPractice } from "@/components/ConversationPractice";
import { dialogues } from "@/content/dialogues";

export const dynamic = "force-dynamic";

export default async function ConversationPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <ConversationPractice dialogues={dialogues} />
    </div>
  );
}
