import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./server/supabase";
import { AUTOHUB_ACCESS_TOKEN, AUTOHUB_REFRESH_TOKEN } from "./constants";

export async function middleware(req: NextRequest) {
  try {
    console.log(`Running middleware on ${req.url}`);
    if (req.url.includes("/api/auth")) return NextResponse.next();
    const refreshToken = req.cookies.get(AUTOHUB_REFRESH_TOKEN)?.value;
    const newAuth = await supabase.auth.refreshSession({
      refresh_token: refreshToken || "",
    });
    if (newAuth.data.session) {
      console.log("Refreshed session successfully");
      const res = NextResponse.next();
      res.cookies.set(AUTOHUB_ACCESS_TOKEN, newAuth.data.session.access_token, {
        path: "/",
        httpOnly: true,
      });
      res.cookies.set(
        AUTOHUB_REFRESH_TOKEN,
        newAuth.data.session.refresh_token,
        {
          path: "/",
          httpOnly: true,
        },
      );
      return res;
    }
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/error", req.url));
  }
}

export const config = {
  matcher: ["/client/:route*", "/api/:route*"],
};
