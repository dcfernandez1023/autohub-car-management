"use client";

import { Vehicle, VehicleMutableFields } from "@/types/Vehicle";
import { useState } from "react";
import { Box, Button, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { VehicleModal } from "./VehicleModal";
import { createVehicle } from "@/client/vehicle";
import { VehicleCard } from "./VehicleCard";

interface Props {
  vehicles: Vehicle[];
}

export const VehicleList = ({ vehicles }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Box>
      <VehicleModal
        show={show}
        title="Create Vehicle"
        buttonText="Create"
        onSubmit={(data: VehicleMutableFields) => void createVehicle(data)}
        onClose={() => setShow(false)}
      />
      <SimpleGrid columns={{ base: 2 }}>
        <Box>
          <Heading as="h4">Vehicles</Heading>
        </Box>
        <Box>
          <Button float="right" onClick={() => setShow(true)}>
            +
          </Button>
        </Box>
      </SimpleGrid>
      {vehicles.length === 0 && (
        <Center minH="40vh">Click + to add a vehicle</Center>
      )}
      <br />
      <br />
      {vehicles.map((vehicle: Vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </Box>
  );
};
