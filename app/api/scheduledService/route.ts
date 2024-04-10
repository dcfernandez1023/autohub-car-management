import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { getUser } from "@/server/auth";
import { createScheduledServiceType } from "@/server/scheduledServiceType";
import { ScheduledServiceTypeMutableFields } from "@/types/ScheduledServiceType";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUser(req.cookies.get(AUTOHUB_ACCESS_TOKEN)?.value);
    if (!user) throw new Error("Not authenticated");
    const payload = (await req.json()) as ScheduledServiceTypeMutableFields;
    const result = await createScheduledServiceType(user.id, payload);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
