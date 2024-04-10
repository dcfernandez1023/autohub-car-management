import { getUser } from "@/server/auth";
import { getVehicles } from "@/server/vehicle";
import { HomePage } from "@/components/Home";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTOHUB_ACCESS_TOKEN } from "@/constants";

export default async function Home() {
  const user = await getUser(cookies().get(AUTOHUB_ACCESS_TOKEN)?.value);
  if (!user) redirect("/login");
  const vehicles = await getVehicles(user.id);
  return <HomePage vehicles={vehicles} />;
}
