import { getUser } from "@/server/auth";
import { getVehicle } from "@/server/vehicle";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { VehiclePage } from "@/components/Vehicle";

interface Props {
  params: { id: string | string[] | undefined | null };
}

export default async function Page({ params }: Props) {
  console.log(params);
  const { id } = params;
  const user = await getUser(cookies().get(AUTOHUB_ACCESS_TOKEN)?.value);
  if (!user) redirect("/login");

  const onError = () => {
    console.error("Failed to get vehicle");
    redirect("/client/home");
  };

  if (typeof id === "string") {
    const vehicle = await getVehicle(user.id, id);
    if (vehicle) return <VehiclePage vehicle={vehicle} />;
  }
  // TODO: Better error handling
  onError();
}
