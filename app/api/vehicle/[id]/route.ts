import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { getUser } from "@/server/auth";
import { updateVehicle } from "@/server/vehicle";
import { VehicleMutableFields } from "@/types/Vehicle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const user = await getUser(req.cookies.get(AUTOHUB_ACCESS_TOKEN)?.value);
    if (!user) throw new Error("Not authenticated");
    const data = (await req.json()) as VehicleMutableFields;
    const newVehicle = await updateVehicle(user.id, params.id, data);
    return NextResponse.json(newVehicle, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
