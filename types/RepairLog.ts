import z from "zod";

export const RepairLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  vehicleId: z.string(),
  datePerformed: z.number(),
  name: z.string(),
  mileagePerformed: z.number(),
  partsCost: z.number(),
  laborCost: z.number(),
  totalCost: z.number(),
  notes: z.string(),
});

export type RepairLog = z.infer<typeof RepairLogSchema>;
