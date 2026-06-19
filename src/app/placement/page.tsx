import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PlacementTest } from "@/components/PlacementTest";

export default async function PlacementPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  // Se permite repetir la diagnóstica manualmente, así que no bloqueamos
  // aunque ya esté hecha.
  return <PlacementTest />;
}
