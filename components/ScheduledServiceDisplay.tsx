import { formatTimeInterval } from "@/client/util";
import { VehicleSchedule } from "@/types/ScheduledServiceType";
import { Vehicle } from "@/types/Vehicle";
import { Box, Link, SimpleGrid, Text } from "@chakra-ui/react";

interface Props {
  isEditable: boolean;
  vehicle: Vehicle;
  schedule: VehicleSchedule;
}

interface ChildProps {
  vehicle: Vehicle;
  schedule: VehicleSchedule;
}

const Display = ({ vehicle, schedule }: ChildProps) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 1, lg: 3 }} mb="30px">
      <Box>
        <Link href={`/client/vehicle/${vehicle.id}`} target="_blank">
          {vehicle.name}
        </Link>
      </Box>
      <Box>
        <Text fontSize="large" as="b">
          Mile Interval
        </Text>
        <Text>
          Every {schedule.mileInterval.toLocaleString()}{" "}
          {schedule.mileInterval === 1 ? "mile" : "miles"}
        </Text>
      </Box>
      <Box>
        <Text fontSize="large" as="b">
          Time Interval
        </Text>
        <Text>
          {formatTimeInterval(schedule.timeInterval, schedule.timeUnits)}
        </Text>
      </Box>
    </SimpleGrid>
  );
};

const EditableDisplay = ({ vehicle, schedule }: ChildProps) => {
  return <SimpleGrid columns={{ sm: 1, md: 1, lg: 3 }}></SimpleGrid>;
};

export const ScheduledServiceDisplay = ({
  isEditable,
  vehicle,
  schedule,
}: Props) => {
  return isEditable ? (
    <EditableDisplay vehicle={vehicle} schedule={schedule} />
  ) : (
    <Display vehicle={vehicle} schedule={schedule} />
  );
};
