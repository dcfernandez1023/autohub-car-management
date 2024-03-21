"use client";

import { VehicleMutableFields } from "@/types/Vehicle";
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
  onSubmit: (data: VehicleMutableFields) => void;
  onClose: () => void;
}

export const VehicleModal = ({ show, onSubmit, onClose }: Props) => {
  const handleSubmit = () => {
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
    };
    onSubmit(data);
  };

  return (
    <Modal onClose={onClose} size="xl" isOpen={show}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Vehicle</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="20px">
            <Box>
              <Text mb="8px">Name</Text>
              <Input id="name" />
            </Box>
            <Box>
              <Text mb="8px">Mileage</Text>
              <Input id="mileage" type="number" />
            </Box>
            <Box>
              <Text mb="8px">Year</Text>
              <Input id="year" type="number" />
            </Box>
            <Box>
              <Text mb="8px">Make</Text>
              <Input id="make" />
            </Box>
            <Box>
              <Text mb="8px">Model</Text>
              <Input id="model" />
            </Box>
            <Box>
              <Text mb="8px">License Plate</Text>
              <Input id="licensePlate" />
            </Box>
            <Box>
              <Text mb="8px">VIN</Text>
              <Input id="vin" />
            </Box>
            <Box>
              <Text mb="8px">Notes</Text>
              <Textarea id="notes" />
            </Box>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
