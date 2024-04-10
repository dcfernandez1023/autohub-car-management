/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ScheduledService,
  ScheduledServiceSchema,
  ScheduledServiceTypeListSchema,
  ScheduledServiceTypeMutableFields,
  ScheduledServiceTypeSchema,
  VehicleSchedule,
  VehicleScheduleListSchema,
  VehicleScheduleMutableFields,
} from "@/types/ScheduledServiceType";
import { v4 as uuidv4 } from "uuid";
import {
  SCHEDULED_SERVICE_TYPE_TABLE,
  VEHICLE_SCHEDULE_TABLE,
} from "@/constants";
import { supabase } from "./supabase";

export const getScheduledServices = async (userId: string) => {
  const { data, error } = await supabase
    .from(SCHEDULED_SERVICE_TYPE_TABLE)
    .select()
    .eq("userId", userId);
  if (error) throw error;
  const scheduledServiceTypes = ScheduledServiceTypeListSchema.parse(data);
  const vehicleSchedules = await getUserVehicleSchedules(userId);
  const scheduledServiceTypeLookup: { [id: string]: ScheduledService } = {};
  for (const scheduledServiceType of scheduledServiceTypes) {
    scheduledServiceTypeLookup[scheduledServiceType.id] = {
      ...scheduledServiceType,
      vehicleScheduleInstances: [],
    };
  }
  for (const vehicleSchedule of vehicleSchedules) {
    const scheduledService = scheduledServiceTypeLookup[vehicleSchedule.sstId];
    if (scheduledService)
      scheduledService.vehicleScheduleInstances.push(vehicleSchedule);
  }
  const scheduledServiceTypesWithInstances = [];
  for (const key of Object.keys(scheduledServiceTypeLookup)) {
    const scheduledService = scheduledServiceTypeLookup[key];
    scheduledServiceTypesWithInstances.push(
      ScheduledServiceSchema.parse(scheduledService),
    );
  }
  scheduledServiceTypesWithInstances.sort((a, b) => {
    return a.dateCreated - b.dateCreated;
  });
  return scheduledServiceTypesWithInstances;
};

export const getScheduledServiceType = async (
  userId: string,
  sstId: string,
) => {
  const { data, error } = await supabase
    .from(SCHEDULED_SERVICE_TYPE_TABLE)
    .select()
    .eq("userId", userId)
    .eq("id", sstId);
  if (error) throw error;
  if (data.length !== 1)
    throw new Error(`Failed to get scheduled service type ${sstId}`);
  return ScheduledServiceTypeSchema.parse(data[0]);
};

export const getUserVehicleSchedules = async (userId: string) => {
  const { data, error } = await supabase
    .from(VEHICLE_SCHEDULE_TABLE)
    .select()
    .eq("userId", userId);
  if (error) throw error;
  return VehicleScheduleListSchema.parse(data);
};

export const getVehicleScheduledServiceTypes = (
  userId: string,
  verhicleId: string,
) => {
  // TODO: Read the scheduled service types associated with the userId and vehicleId and return it
  return;
};

export const updateScheduledServiceType = async (
  userId: string,
  sstId: string,
  payload: ScheduledServiceTypeMutableFields,
) => {
  if (!payload.name) throw new Error("Name is required");
  if (!validateScheduleInstances(payload.vehicleScheduleInstances))
    throw new Error("Detected duplicate vehicles scheduled");
  const scheduledServiceTypeRes = await supabase
    .from(SCHEDULED_SERVICE_TYPE_TABLE)
    .update({ name: payload.name })
    .eq("id", sstId)
    .select();
  if (scheduledServiceTypeRes.error) throw scheduledServiceTypeRes.error;

  const vehicleScheduleInstances = payload.vehicleScheduleInstances;
  const acceptedVehicleScheduleInstances = filterScheduledInstances(
    userId,
    sstId,
    vehicleScheduleInstances,
  );

  const vehicleScheduleRes = await supabase
    .from(VEHICLE_SCHEDULE_TABLE)
    .upsert(VehicleScheduleListSchema.parse(acceptedVehicleScheduleInstances), {
      onConflict: "userId, sstId, vehicleId",
    });
  if (vehicleScheduleRes.error) throw vehicleScheduleRes.error;

  const result = {
    ...ScheduledServiceTypeSchema.parse(scheduledServiceTypeRes.data[0]),
    vehicleScheduleInstances: acceptedVehicleScheduleInstances,
  };
  return result;
};

export const createScheduledServiceType = async (
  userId: string,
  payload: ScheduledServiceTypeMutableFields,
) => {
  if (!payload.name) throw new Error("Name is required");
  if (!validateScheduleInstances(payload.vehicleScheduleInstances))
    throw new Error("Detected duplicate vehicles scheduled");
  const scheduledServiceType = {
    id: uuidv4(),
    userId: userId,
    name: payload.name,
    dateCreated: new Date().getTime(),
  };
  const scheduledServiceRes = await supabase
    .from(SCHEDULED_SERVICE_TYPE_TABLE)
    .insert(scheduledServiceType);
  if (scheduledServiceRes.error) throw scheduledServiceRes.error;

  const vehicleScheduleInstances = payload.vehicleScheduleInstances;
  const acceptedVehicleScheduleInstances = filterScheduledInstances(
    userId,
    scheduledServiceType.id,
    vehicleScheduleInstances,
  );

  const vehicleScheduleRes = await supabase
    .from(VEHICLE_SCHEDULE_TABLE)
    .insert(VehicleScheduleListSchema.parse(acceptedVehicleScheduleInstances));
  if (vehicleScheduleRes.error) throw vehicleScheduleRes.error;

  const result = {
    ...scheduledServiceType,
    vehicleScheduleInstances: acceptedVehicleScheduleInstances,
  };
  return result;
};

const validateScheduleInstances = (
  vehicleScheduleInstances: (VehicleSchedule | VehicleScheduleMutableFields)[],
) => {
  const vehicleIdSet = new Set();
  for (const instance of vehicleScheduleInstances) {
    if (vehicleIdSet.has(instance.vehicleId)) return false;
    vehicleIdSet.add(instance.vehicleId);
  }
  return true;
};

const filterScheduledInstances = (
  userId: string,
  sstId: string,
  vehicleScheduleInstances: (VehicleSchedule | VehicleScheduleMutableFields)[],
) => {
  const acceptedVehicleScheduleInstances = [];
  for (const schedule of vehicleScheduleInstances) {
    if (
      schedule.mileInterval === 0 &&
      (schedule.timeInterval === 0 || schedule.timeUnits.trim().length === 0)
    ) {
      continue;
    } else {
      const vehicleSchedule = {
        userId: userId,
        vehicleId: schedule.vehicleId,
        sstId: sstId,
        mileInterval: schedule.mileInterval,
        timeInterval: schedule.timeInterval,
        timeUnits: schedule.timeUnits,
      };
      acceptedVehicleScheduleInstances.push(vehicleSchedule);
    }
  }
  return acceptedVehicleScheduleInstances;
};
