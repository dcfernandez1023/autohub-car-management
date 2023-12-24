import { completeSignup } from "@/server/auth";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as { code: string };
    await completeSignup(body.code);
    return new Response(JSON.stringify(body), {
      status: 200,
    });
  } catch (e: unknown) {
    console.error(e);
    if (
      (e as Error).message.includes(
        "invalid flow state, no valid flow state found",
      )
    )
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
