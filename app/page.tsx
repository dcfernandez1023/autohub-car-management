import { Landing } from "@/components/Landing";
import { getUser } from "@/server/auth";

export default async function Home() {
  const user = await getUser();

  if (!user) return <Landing />;
  return <div style={{ height: "80vh" }}>AutoHub Home</div>;
}
