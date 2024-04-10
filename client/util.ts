import { ScheduledService } from "@/types/ScheduledServiceType";
import { Vehicle } from "@/types/Vehicle";

export const readFileInput = async (inputId: string): Promise<string> => {
  const fileInput = document.getElementById(inputId) as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const fileArrayBuffer = await fileInput.files[0].arrayBuffer();
    return arrayBufferToBase64String(fileArrayBuffer);
  }
  return "";
};

export const arrayBufferToBase64String = (arrayBuffer: ArrayBuffer) => {
  return btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );
};

export const formatTimeInterval = (timeInterval: number, timeUnits: string) => {
  return `Every ${
    timeInterval === 1
      ? `${timeInterval} ${timeUnits}`
      : `${timeInterval.toLocaleString()} ${timeUnits}s`
  }`;
};

export const getVehicleName = (id: string, vehicles: Vehicle[]) => {
  const vehicle = vehicles.find((vehicle) => vehicle.id === id);
  return vehicle ? vehicle.name : "Not found"; // TODO: Handle this better
};

export const findVehicle = (id: string, vehicles: Vehicle[]) => {
  const vehicle = vehicles.find((vehicle) => vehicle.id === id);
  return vehicle;
};

export const getVehicleScheduledServiceInstance = (
  vehicleId: string,
  scheduledService: ScheduledService,
) => {
  const scheduledServiceInstance =
    scheduledService.vehicleScheduleInstances.find(
      (scheduledService) => scheduledService.vehicleId === vehicleId,
    );
  return scheduledServiceInstance;
};

export const newScheduledServiceType = () => {
  return {
    id: "",
    userId: "",
    name: "",
    vehicleScheduleInstances: [],
    dateCreated: 0,
  };
};
