import { ScheduledService } from "@/types/ScheduledServiceType";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getScheduledServices = (userId: string): ScheduledService[] => {
  // TODO: Fetch from server
  return [
    {
      id: "0",
      userId: "userId",
      name: "Oil Change",
      vehicleScheduleIds: [
        "20bf1743-4145-4d4a-9b72-7565723b793d, fe5234ce-cc1a-4d12-9aa1-56a86d78592f",
      ],
      dateCreated: new Date().getTime(),
      vehicleScheduleInstances: [
        {
          vehicleId: "20bf1743-4145-4d4a-9b72-7565723b793d",
          sstId: "0",
          mileInterval: 5000,
          timeInterval: 1,
          timeUnits: "year",
        },
        {
          vehicleId: "fe5234ce-cc1a-4d12-9aa1-56a86d78592f",
          sstId: "0",
          mileInterval: 7000,
          timeInterval: 1,
          timeUnits: "year",
        },
      ],
    },
    {
      id: "1",
      userId: "userId",
      name: "Brake Pads Change",
      vehicleScheduleIds: [
        "fe5234ce-cc1a-4d12-9aa1-56a86d78592f, 4c28b3a1-642a-4026-a086-603b9792e3f8",
      ],
      dateCreated: new Date().getTime(),
      vehicleScheduleInstances: [
        {
          vehicleId: "fe5234ce-cc1a-4d12-9aa1-56a86d78592f",
          sstId: "1",
          mileInterval: 10000,
          timeInterval: 2,
          timeUnits: "year",
        },
        {
          vehicleId: "4c28b3a1-642a-4026-a086-603b9792e3f8",
          sstId: "1",
          mileInterval: 11000,
          timeInterval: 2,
          timeUnits: "year",
        },
      ],
    },
  ];
};
