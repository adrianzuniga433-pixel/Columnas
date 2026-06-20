import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { SettingsForm } from "@/components/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <SettingsForm />
    </div>
  );
}
