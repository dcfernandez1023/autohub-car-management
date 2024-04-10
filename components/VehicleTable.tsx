import { Vehicle } from "@/types/Vehicle";
import { TableContainer, Table, Tr, Tbody, Td, Image } from "@chakra-ui/react";

interface Props {
  vehicle: Vehicle;
}

export const VehicleTable = ({ vehicle }: Props) => {
  const displayText = (val: string | number, formatNumber?: boolean) => {
    return val ? (
      typeof val === "number" && formatNumber ? (
        val.toLocaleString()
      ) : (
        val
      )
    ) : (
      <i>Not entered</i>
    );
  };

  const displayVehicleImage = (imageUrl: string | undefined | null) => {
    if (imageUrl) {
      return (
        <Image
          src={imageUrl}
          objectFit="cover"
          maxW="200px"
          maxH="200px"
          alt="Vehicle Image"
        />
      );
    }
    return <i>Not entered</i>;
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>
              <strong>Name</strong>
            </Td>
            <Td>{displayText(vehicle.name)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Make</strong>
            </Td>
            <Td>{displayText(vehicle.make)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Model</strong>
            </Td>
            <Td>{displayText(vehicle.model)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Year</strong>
            </Td>
            <Td>{displayText(vehicle.year)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Mileage</strong>
            </Td>
            <Td>{displayText(vehicle.mileage, true)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>License Plate</strong>
            </Td>
            <Td>{displayText(vehicle.licensePlate)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>VIN</strong>
            </Td>
            <Td>{displayText(vehicle.vin)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Notes</strong>
            </Td>
            <Td>{displayText(vehicle.notes)}</Td>
          </Tr>
          <Tr>
            <Td>
              <strong>Image</strong>
            </Td>
            <Td>{displayVehicleImage(vehicle.imageUrl)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
