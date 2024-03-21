import { Vehicle } from "@/types/Vehicle";
import { VehicleList } from "./VehicleList";
import { Box } from "@chakra-ui/react";

interface Props {
  vehicles: Vehicle[];
}

export const HomePage = ({ vehicles }: Props) => {
  return (
    <Box minH="80vh" p="5" display={{ md: "flex" }}>
      <Box w={{ base: "100%", md: "60%" }} p="5">
        <VehicleList vehicles={vehicles} />
      </Box>
      <Box w={{ base: "100%", md: "40%" }} p="5">
        Upcoming maintenance
      </Box>
    </Box>
  );
};
