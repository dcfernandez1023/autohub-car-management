import { getUser } from "@/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTOHUB_ACCESS_TOKEN } from "@/constants";

export default async function Home() {
  const user = await getUser(cookies().get(AUTOHUB_ACCESS_TOKEN)?.value);
  if (user) redirect("/client/home");
  else redirect("/login");
  return <div></div>;
}
