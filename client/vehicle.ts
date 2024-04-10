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

export const updateVehicle = async (
  vehicleId: string,
  data: VehicleMutableFields,
) => {
  try {
    const res = await axios.post(`/api/vehicle/${vehicleId}`, data);
    if (res.status !== 200) {
      throw new Error(`Request failed with response code ${res.status}`);
    }
    return VehicleSchema.parse(res.data);
  } catch (e) {
    console.error(e);
    alert("Failed to update vehicle. Please try again");
    return null;
  }
};

export const deleteVehicleImage = async (vehicleId: string) => {
  try {
    const res = await axios.delete(`/api/vehicle/image/${vehicleId}`);
    if (res.status !== 200) {
      throw new Error(`Request failed with response code ${res.status}`);
    }
    return true;
  } catch (e) {
    console.error(e);
    alert("Failed to delete image. Please try again.");
    return false;
  }
};

export const deleteVehicle = async (vehicleId: string) => {
  try {
    const res = await axios.delete(`/api/vehicle/${vehicleId}`);
    if (res.status !== 200) {
      throw new Error(`Request failed with response code ${res.status}`);
    }
    return true;
  } catch (e) {
    console.error(e);
    alert("Failed to delete image. Please try again.");
    return false;
  }
};
