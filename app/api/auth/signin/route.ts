import { AUTOHUB_ACCESS_TOKEN, AUTOHUB_REFRESH_TOKEN } from "@/constants";
import { signIn } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as { email: string; password: string };
    if (!body.email || !body.password)
      throw new Error("Missing email or password");
    const data = await signIn(body.email, body.password);
    if (!data.session?.access_token || !data.session.refresh_token)
      throw new Error("No access or refresh token");
    const res = NextResponse.json({}, { status: 200 });
    res.cookies.set(AUTOHUB_ACCESS_TOKEN, data.session?.access_token, {
      path: "/",
      httpOnly: true,
    });
    res.cookies.set(AUTOHUB_REFRESH_TOKEN, data.session?.refresh_token, {
      path: "/",
      httpOnly: true,
    });
    return res;
  } catch (e: unknown) {
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
