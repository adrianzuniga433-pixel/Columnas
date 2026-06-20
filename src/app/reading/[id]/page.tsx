import { redirect, notFound } from "next/navigation";
import { getSession, getCurrentUser } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";
import { StoryReader } from "@/components/StoryReader";
import { getStory } from "@/content/stories";

export const dynamic = "force-dynamic";

export default async function StoryPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getCurrentUser();

  const story = getStory(params.id);
  if (!story) notFound();

  return (
    <div className="min-h-screen">
      <AppHeader name={user?.name ?? user?.email} />
      <StoryReader story={story} />
    </div>
  );
}
