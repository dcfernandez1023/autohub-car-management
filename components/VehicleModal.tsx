"use client";

import { readFileInput } from "@/client/util";
import { Vehicle, VehicleMutableFields } from "@/types/Vehicle";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  SimpleGrid,
  Input,
  Text,
  Box,
  Textarea,
} from "@chakra-ui/react";

interface Props {
  show: boolean;
  title: string;
  buttonText: string;
  onSubmit: (data: VehicleMutableFields) => void;
  onClose: () => void;
  vehicle?: Vehicle;
}

export const VehicleModal = ({
  show,
  title,
  buttonText,
  onSubmit,
  onClose,
  vehicle,
}: Props) => {
  const handleSubmit = async () => {
    const data: VehicleMutableFields = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      mileage: parseInt(
        (document.getElementById("mileage") as HTMLInputElement).value,
      ),
      year: parseInt(
        (document.getElementById("year") as HTMLInputElement).value,
      ),
      make: (document.getElementById("make") as HTMLInputElement).value,
      model: (document.getElementById("model") as HTMLInputElement).value,
      licensePlate: (
        document.getElementById("licensePlate") as HTMLInputElement
      ).value,
      vin: (document.getElementById("vin") as HTMLInputElement).value,
      notes: (document.getElementById("notes") as HTMLInputElement).value,
      base64Image: await readFileInput("vehicleImage"),
    };
    onSubmit(data);
  };

  return (
    <Modal onClose={onClose} size="xl" isOpen={show}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="20px">
            <Box>
              <Text mb="8px">Name</Text>
              <Input id="name" defaultValue={vehicle?.name || ""} />
            </Box>
            <Box>
              <Text mb="8px">Mileage</Text>
              <Input
                id="mileage"
                type="number"
                defaultValue={vehicle?.mileage || ""}
              />
            </Box>
            <Box>
              <Text mb="8px">Year</Text>
              <Input
                id="year"
                type="number"
                defaultValue={vehicle?.year || ""}
              />
            </Box>
            <Box>
              <Text mb="8px">Make</Text>
              <Input id="make" defaultValue={vehicle?.make || ""} />
            </Box>
            <Box>
              <Text mb="8px">Model</Text>
              <Input id="model" defaultValue={vehicle?.model || ""} />
            </Box>
            <Box>
              <Text mb="8px">License Plate</Text>
              <Input
                id="licensePlate"
                defaultValue={vehicle?.licensePlate || ""}
              />
            </Box>
            <Box>
              <Text mb="8px">VIN</Text>
              <Input id="vin" defaultValue={vehicle?.vin || ""} />
            </Box>
            <Box>
              <Text mb="8px">Image</Text>
              <Input
                id="vehicleImage"
                type="file"
                border="none"
                accept="image/*"
              />
            </Box>
          </SimpleGrid>
          <br />
          <Box w={{ base: "100%" }}>
            <Text mb="8px">Notes</Text>
            <Textarea id="notes" defaultValue={vehicle?.notes || ""} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => void handleSubmit()}>{buttonText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
