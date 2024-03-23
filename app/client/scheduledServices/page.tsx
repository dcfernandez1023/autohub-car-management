import { getUser } from "@/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { getScheduledServices } from "@/client/scheduledService";
import { ScheduledServices } from "@/components/ScheduledServices";
import { getVehicles } from "@/server/vehicle";

export default async function Home() {
  const user = await getUser(cookies().get(AUTOHUB_ACCESS_TOKEN)?.value);
  if (!user) redirect("/login");
  const vehicles = await getVehicles(user.id);
  const scheduledServiceTypes = getScheduledServices(user.id);
  return (
    <ScheduledServices
      vehicles={vehicles}
      scheduledServiceTypes={scheduledServiceTypes}
    />
  );
}
