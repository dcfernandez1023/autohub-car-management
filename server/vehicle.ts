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

export const getVehicle = async (userId: string, vehicleId: string) => {
  try {
    const { data, error } = await supabase
      .from(VEHICLE_TABLE)
      .select()
      .eq("userId", userId)
      .eq("id", vehicleId);
    if (error) throw error;
    if (data.length !== 1)
      throw new Error(`Failed to get vehicle ${vehicleId}`);
    return VehicleSchema.parse(data[0]);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createVehicle = async (
  userId: string,
  data: VehicleMutableFields,
) => {
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
    imageUrl: data.base64Image
      ? await uploadVehicleImage(data.base64Image)
      : "",
  });
  const dbRes = await supabase.from(VEHICLE_TABLE).insert(newVehicle);
  if (dbRes.error) throw dbRes.error;
  return newVehicle;
};

export const updateVehicle = async (
  userId: string,
  vehicleId: string,
  data: VehicleMutableFields,
) => {
  const vehicle = await getVehicle(userId, vehicleId);
  if (!vehicle || vehicle.userId !== userId)
    throw new Error("Not authorized to update this vehicle");

  vehicle.name = data.name;
  vehicle.mileage = data.mileage;
  vehicle.year = data.year;
  vehicle.make = data.make;
  vehicle.model = data.model;
  vehicle.licensePlate = data.licensePlate;
  vehicle.vin = data.vin;
  vehicle.notes = data.notes;

  if (data.base64Image) {
    if (vehicle.imageUrl) {
      const imageId = getImageIdFromUrl(vehicle.imageUrl);
      console.log(imageId);
      await deleteVehicleImage(imageId);
    }
    vehicle.imageUrl = await uploadVehicleImage(data.base64Image);
  }

  const updatedVehicle = VehicleSchema.parse(vehicle);
  const { error } = await supabase
    .from(VEHICLE_TABLE)
    .update(updatedVehicle)
    .match({ id: vehicleId });

  if (error) throw error;

  return updatedVehicle;
};

export const deleteVehicle = (userId: string, vehicleId: string) => {
  // TODO: Delete vehicle associated with this userId and vehicleId
  // TODO: Delete vehicle from scheduled service types table
  // TODO: Delete image associated with vehicle
  // TODO: Delete scheduled service log associated with vehicle
  // TODO: Delete repair log associated with vehicle
  return;
};

export const deleteVehicleImage = async (imageId: string) => {
  const { data, error } = await supabase.storage
    .from("vehicle-images")
    .remove([imageId]);
  if (error) throw error;
};

export const deleteVehicleImageByVehicleId = async (
  userId: string,
  vehicleId: string,
) => {
  const vehicle = await getVehicle(userId, vehicleId);
  if (!vehicle || vehicle.userId !== userId)
    throw new Error("Not authorized to update this vehicle");
  if (vehicle.imageUrl) {
    const imageId = getImageIdFromUrl(vehicle.imageUrl);
    await deleteVehicleImage(imageId);
    vehicle.imageUrl = "";
    const { error } = await supabase
      .from(VEHICLE_TABLE)
      .update(vehicle)
      .match({ id: vehicleId });
    if (error) throw error;
  }
};

export const uploadVehicleImage = async (base64: string) => {
  const binaryData = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const filename = uuidv4();
  const { data, error } = await supabase.storage
    .from("vehicle-images")
    .upload(filename, binaryData);
  if (error) {
    // TODO: Better error handling
    return "";
  }
  const storageFile = supabase.storage
    .from("vehicle-images")
    .getPublicUrl(data.path);
  return storageFile.data.publicUrl || "";
};

const getImageIdFromUrl = (imageUrl: string) => {
  const parts = imageUrl.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart;
};
