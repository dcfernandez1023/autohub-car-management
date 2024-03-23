import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { getUser } from "@/server/auth";
import { deleteVehicleImageByVehicleId } from "@/server/vehicle";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const user = await getUser(req.cookies.get(AUTOHUB_ACCESS_TOKEN)?.value);
    if (!user) throw new Error("Not authenticated");
    await deleteVehicleImageByVehicleId(user.id, params.id);
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
