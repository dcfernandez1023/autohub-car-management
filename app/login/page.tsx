import { Landing } from "@/components/Landing";
import { cookies } from "next/headers";
import { getUser } from "@/server/auth";
import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { redirect } from "next/navigation";

export default async function Home() {
  if (await getUser(cookies().get(AUTOHUB_ACCESS_TOKEN)?.value))
    redirect("/client/home");
  return <Landing />;
}
