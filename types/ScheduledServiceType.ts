import z from "zod";

export const VehicleScheduleSchema = z.object({
  vehicleId: z.string(),
  sstId: z.string(),
  mileInterval: z.number(),
  timeInterval: z.string(),
  timeUnits: z.union([
    z.literal("day"),
    z.literal("week"),
    z.literal("month"),
    z.literal("year"),
  ]),
});

export const ScheduledServiceTypeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  vehicleScheduleIds: z.array(z.string()),
  dateCreated: z.number(),
});

export type VehicleSchedule = z.infer<typeof VehicleScheduleSchema>;
export type ScheduledServiceTypeSchema = z.infer<
  typeof ScheduledServiceTypeSchema
>;
