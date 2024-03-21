/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Vehicle,
  VehicleListSchema,
  VehicleSchema,
  VehicleMutableFields,
} from "@/types/Vehicle";
import { supabase } from "./supabase";
import { VEHICLE_TABLE } from "@/constants";
import { v4 as uuidv4 } from "uuid";

export const getVehicles = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from(VEHICLE_TABLE)
      .select()
      .eq("userId", userId);
    if (error) throw error;
    return VehicleListSchema.parse(data);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getVehicle = (userId: string, vehicleId: string) => {
  // TODO: Return vehicle associated with this userId and vehicleId
  return;
};

export const createVehicle = async (
  userId: string,
  data: VehicleMutableFields,
) => {
  // TODO: If imageBytes provided, call uploadVehicleImage
  const newVehicle = VehicleSchema.parse({
    id: uuidv4(),
    userId,
    name: data.name,
    mileage: data.mileage,
    year: data.year,
    make: data.make,
    model: data.model,
    licensePlate: data.licensePlate,
    vin: data.vin,
    notes: data.notes,
    dateCreated: new Date().getTime(),
    sharedWith: [],
  });
  const dbRes = await supabase.from(VEHICLE_TABLE).insert(newVehicle);
  if (dbRes.error) throw dbRes.error;
  return newVehicle;
};

export const updateVehicle = (
  userId: string,
  vehicleId: string,
  vehicle: Vehicle,
) => {
  // TODO: Update and return vehicle associated with this userId and vehicleId
  // TODO: Don't allow user to update protected fields
  return;
};

export const deleteVehicle = (userId: string, vehicleId: string) => {
  // TODO: Delete vehicle associated with this userId and vehicleId
  // TODO: Delete vehicle from scheduled service types table
  // TODO: Delete image associated with vehicle
  // TODO: Delete scheduled service log associated with vehicle
  // TODO: Delete repair log associated with vehicle
  return;
};

export const deleteVehicleImage = (userId: string, vehicleId: string) => {
  // TODO: Delete imageUrl from vehicle
  // TODO: Delete image associated with vehicle
  return;
};

export const uploadVehicleImage = (
  userId: string,
  vehicleId: string,
  imageBytes: string,
) => {
  // TODO: Upload imageBytes to storage bucket
  // TODO: Generate URL to image and update imageUrl of vehicle
  // TODO: Return URL
  return;
};
