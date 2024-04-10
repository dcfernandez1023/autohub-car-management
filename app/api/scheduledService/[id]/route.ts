import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { getUser } from "@/server/auth";
import { updateScheduledServiceType } from "@/server/scheduledServiceType";
import { ScheduledServiceTypeMutableFields } from "@/types/ScheduledServiceType";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const user = await getUser(req.cookies.get(AUTOHUB_ACCESS_TOKEN)?.value);
    if (!user) throw new Error("Not authenticated");
    const sstId = params.id;
    const data = (await req.json()) as ScheduledServiceTypeMutableFields;
    const result = await updateScheduledServiceType(user.id, sstId, data);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
