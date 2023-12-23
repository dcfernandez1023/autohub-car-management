import z from "zod";

export const VehicleScheduleSchema = z.object({
  vehicleId: z.string(),
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
  vehicleSchedules: z.array(VehicleScheduleSchema),
  dateCreated: z.number(),
});

export type ScheduledServiceTypeSchema = z.infer<
  typeof ScheduledServiceTypeSchema
>;
