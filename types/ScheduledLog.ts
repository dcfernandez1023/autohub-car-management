import z from "zod";

export const ScheduledLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  vehicleId: z.string(),
  sstId: z.string(),
  datePerformed: z.number(),
  name: z.string(),
  mileagePerformed: z.number(),
  nextServiceDate: z.number().optional(),
  nextServiceMileage: z.number().optional(),
  partsCost: z.number(),
  laborCost: z.number(),
  totalCost: z.number(),
  notes: z.string(),
});

export type ScheduledLog = z.infer<typeof ScheduledLogSchema>;
