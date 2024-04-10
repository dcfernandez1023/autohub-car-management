import z from "zod";

export type TimeUnits = "day" | "week" | "month" | "year";

export type VehicleScheduleMutableFields = {
  vehicleId: string;
  mileInterval: number;
  timeInterval: number;
  timeUnits: TimeUnits;
};

export const VehicleScheduleSchema = z.object({
  userId: z.string(),
  vehicleId: z.string(),
  sstId: z.string(),
  mileInterval: z.number(),
  timeInterval: z.number(),
  timeUnits: z.union([
    z.literal("day"),
    z.literal("week"),
    z.literal("month"),
    z.literal("year"),
  ]),
});

export const VehicleScheduleListSchema = z.array(VehicleScheduleSchema);

export const ScheduledServiceTypeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  dateCreated: z.number(),
});

export const ScheduledServiceTypeListSchema = z.array(
  ScheduledServiceTypeSchema,
);

/**
 * This object is generated dynamically when fetching a user's scheduled service types from the server.
 * It will lookup the VehicleSchedule for the ScheduledServiceType and add it to the vehicleScheduleInstances array
 */
export const ScheduledServiceSchema = ScheduledServiceTypeSchema.extend({
  vehicleScheduleInstances: z.array(VehicleScheduleSchema),
});

export type VehicleSchedule = z.infer<typeof VehicleScheduleSchema>;
export type ScheduledServiceType = z.infer<typeof ScheduledServiceTypeSchema>;
export type ScheduledService = z.infer<typeof ScheduledServiceSchema>;
export type ScheduledServiceTypeMutableFields = {
  name: string;
  vehicleScheduleInstances: (VehicleSchedule | VehicleScheduleMutableFields)[];
};
