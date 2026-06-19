import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { ReviewSession } from "@/components/ReviewSession";

export default async function ReviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <ReviewSession />
    </div>
  );
}
