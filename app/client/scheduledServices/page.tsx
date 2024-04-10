import { getUser } from "@/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { ScheduledServices } from "@/components/ScheduledServices";
import { getVehicles } from "@/server/vehicle";
import { getScheduledServices } from "@/server/scheduledServiceType";

export default async function Home() {
  const user = await getUser(cookies().get(AUTOHUB_ACCESS_TOKEN)?.value);
  if (!user) redirect("/login");
  const vehicles = await getVehicles(user.id);
  const scheduledServices = await getScheduledServices(user.id);
  return (
    <ScheduledServices
      vehicles={vehicles}
      scheduledServices={scheduledServices}
    />
  );
}
