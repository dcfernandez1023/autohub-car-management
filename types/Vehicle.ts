import z from "zod";

export type VehicleMutableFields = {
  name: string;
  mileage: number;
  year: number;
  make: string;
  model: string;
  licensePlate: string;
  vin: string;
  notes: string;
  imageBytes?: string;
};

export const VehicleSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  mileage: z.number(),
  year: z.number(),
  make: z.string(),
  model: z.string(),
  licensePlate: z.string(),
  vin: z.string(),
  notes: z.string(),
  dateCreated: z.number(),
  sharedWith: z.array(z.string()),
  imageUrl: z.string().optional(),
});
export const VehicleListSchema = z.array(VehicleSchema);

export type Vehicle = z.infer<typeof VehicleSchema>;
