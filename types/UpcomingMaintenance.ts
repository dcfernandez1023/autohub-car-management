import z from "zod";

export const UpcomingMaintenanceSchema = z.object({
  userId: z.string(),
  vehicleId: z.string(),
  sstId: z.string(),
  name: z.string(),
  dateDue: z.number(),
  mileageDue: z.number(),
  isOverdue: z.boolean(),
});

export type UpcomingMaintenance = z.infer<typeof UpcomingMaintenanceSchema>;
