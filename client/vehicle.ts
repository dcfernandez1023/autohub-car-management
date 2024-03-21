import { VehicleMutableFields, VehicleSchema } from "@/types/Vehicle";
import axios from "axios";

export const createVehicle = async (data: VehicleMutableFields) => {
  try {
    const res = await axios.post("/api/vehicle", data);
    const vehicle = VehicleSchema.parse(res.data);
    if (res.status === 200) {
      window.location.href = `/client/vehicle/${vehicle.id}`;
    } else {
      alert("Failed to create vehicle. Please try again");
    }
  } catch (e) {
    console.error(e);
    alert("Failed to create vehicle. Please try again");
  }
};
