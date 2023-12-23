import z from "zod";

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

export type Vehicle = z.infer<typeof VehicleSchema>;
