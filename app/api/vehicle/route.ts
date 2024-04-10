import { AUTOHUB_ACCESS_TOKEN } from "@/constants";
import { getUser } from "@/server/auth";
import { createVehicle } from "@/server/vehicle";
import { VehicleMutableFields } from "@/types/Vehicle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUser(req.cookies.get(AUTOHUB_ACCESS_TOKEN)?.value);
    if (!user) throw new Error("Not authenticated");
    const data = (await req.json()) as VehicleMutableFields;
    const newVehicle = await createVehicle(user.id, data);
    return NextResponse.json(newVehicle, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: (e as Error).message }), {
      status: 500,
    });
  }
};
