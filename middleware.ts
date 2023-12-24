import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "./server/supabase";

export async function middleware(req: NextRequest) {
  try {
    console.log(req.url);
    if (req.url.includes("/api/auth")) return NextResponse.next();
    const newAuth = await createSupabaseClient().auth.refreshSession();
    if (newAuth.data.session) {
      console.log("Refreshed session successfully");
      return NextResponse.next();
    } else {
      console.log("Failed to refresh session");
      return NextResponse.redirect("/");
    }
  } catch (e) {
    console.error(e);
    return NextResponse.redirect("/");
  }
}

export const config = {
  matcher: ["/api/:route*"],
};
