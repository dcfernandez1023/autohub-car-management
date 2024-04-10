import {
  ScheduledService,
  ScheduledServiceTypeMutableFields,
} from "@/types/ScheduledServiceType";
import axios from "axios";

export const createScheduledServiceType = async (
  payload: ScheduledServiceTypeMutableFields,
): Promise<ScheduledService | undefined> => {
  try {
    const res = await axios.post("/api/scheduledService", payload);
    if (res.status !== 200)
      throw new Error(`Response returned status code ${res.status}`);
    return res.data as ScheduledService;
  } catch (error) {
    // TODO: Handle better
    console.error(error);
    alert("Failed to create scheduled service type");
  }
};

export const updateScheduledServiceType = async (
  sstId: string,
  payload: ScheduledServiceTypeMutableFields,
): Promise<ScheduledService | undefined> => {
  try {
    const res = await axios.post(`/api/scheduledService/${sstId}`, payload);
    if (res.status !== 200)
      throw new Error(`Response returned status code ${res.status}`);
    return res.data as ScheduledService;
  } catch (error) {
    // TODO: Handle better
    console.error(error);
    alert("Failed to update scheduled service type");
  }
};
