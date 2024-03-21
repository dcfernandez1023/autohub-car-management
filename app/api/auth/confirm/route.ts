import { AUTOHUB_ACCESS_TOKEN, AUTOHUB_REFRESH_TOKEN } from "@/constants";
import { completeSignup } from "@/server/auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    await completeSignup(body.accessToken);
    const res = NextResponse.json({}, { status: 200 });
    res.cookies.set(AUTOHUB_ACCESS_TOKEN, body.accessToken, {
      path: "/",
      httpOnly: true,
    });
    res.cookies.set(AUTOHUB_REFRESH_TOKEN, body.refreshToken, {
      path: "/",
      httpOnly: true,
    });
    return res;
  } catch (e: unknown) {
    console.error(e);
    // TODO: Find a way to prevent this error. This doesn't affect signup, but it gets thrown...
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
