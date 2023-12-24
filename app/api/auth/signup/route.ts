import { signup } from "@/server/auth";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as { email: string; password: string };
    if (!body.email || !body.password)
      throw new Error("Missing email or password");
    const data = await signup(
      body.email,
      body.password,
      req.headers.get("origin") || "http://localhost:3000",
    );
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
