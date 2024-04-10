"use client";

import { Vehicle } from "@/types/Vehicle";
import {
  Badge,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

interface Props {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: Props) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      _hover={{ backgroundColor: "gray.100" }}
      onClick={() => (window.location.href = `/client/vehicle/${vehicle.id}`)}
    >
      <Image
        objectFit="cover"
        w="200px"
        maxH="125px"
        src={vehicle.imageUrl || "../car-holder.png"}
        alt="Vehicle Image"
      />
      <Stack>
        <CardBody>
          <Heading size="md">{vehicle.name}</Heading>
          <Text py="2">
            {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          </Text>
          <Badge>{`${vehicle.mileage} miles`}</Badge>
        </CardBody>
      </Stack>
    </Card>
  );
};
