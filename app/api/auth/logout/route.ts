import { AUTOHUB_ACCESS_TOKEN, AUTOHUB_REFRESH_TOKEN } from "@/constants";
import { supabase } from "@/server/supabase";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const authError = await supabase.auth.signOut();
    if (authError.error) throw authError.error;
    const res = NextResponse.json({}, { status: 200 });
    res.cookies.set(AUTOHUB_ACCESS_TOKEN, "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    res.cookies.set(AUTOHUB_REFRESH_TOKEN, "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    return res;
  } catch (e: unknown) {
    console.error(e);
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
