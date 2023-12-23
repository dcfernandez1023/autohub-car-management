/* eslint-disable @typescript-eslint/no-unused-vars */

import { Vehicle } from "@/types/Vehicle";

export const getVehicles = (userId: string) => {
  // TODO: Return vehicles that are associated with this userId
  return;
};

export const getVehicle = (userId: string, vehicleId: string) => {
  // TODO: Return vehicle associated with this userId and vehicleId
  return;
};

export const createVehicle = (
  userId: string,
  name: string,
  mileage: number,
  year: number,
  make: string,
  model: string,
  licensePlate: string,
  vin: string,
  notes: string,
  imageBytes?: string,
) => {
  // TODO: If imageBytes provided, call uploadVehicleImage
  // TODO: Create vehicle from args and insert into DB
  return;
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
