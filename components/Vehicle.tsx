"use client";

import { Vehicle, VehicleMutableFields } from "@/types/Vehicle";
import { VehicleTable } from "./VehicleTable";
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { VehicleModal } from "./VehicleModal";
import { deleteVehicleImage, updateVehicle } from "@/client/vehicle";
import { ConfirmModal } from "./ConfirmModal";

interface Props {
  vehicle: Vehicle;
}

export const VehiclePage = ({ vehicle }: Props) => {
  const [show, setShow] = useState(false);
  const [showDeleteVehicle, setShowDeleteVehicle] = useState(false);
  const [vehicleState, setVehicleState] = useState<Vehicle>();

  const handleRemoveImage = async () => {
    const success = await deleteVehicleImage(vehicle.id);
    if (success) {
      const stateCopy = Object.assign({}, vehicleState);
      stateCopy.imageUrl = "";
      setVehicleState(stateCopy);
    } else {
      alert("Failed to delete image. Please try again");
    }
  };

  useEffect(() => {
    setVehicleState(vehicle);
  }, [vehicle]);

  if (!vehicleState) return <Spinner size="xl" />;

  return (
    <Box minH="80vh" p="5" display={{ md: "flex" }}>
      <Box w={{ base: "100%", md: "50%" }} p="5">
        <SimpleGrid columns={2}>
          <Box>
            <Heading as="h4" size="lg">
              Vehicle Info
            </Heading>
          </Box>
          <Box textAlign="right">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Options
              </MenuButton>
              <MenuList>
                <MenuItem icon={<EditIcon />} onClick={() => setShow(true)}>
                  Edit Vehicle
                </MenuItem>
                {vehicleState.imageUrl && (
                  <MenuItem
                    icon={<CloseIcon />}
                    disabled={!vehicleState.imageUrl}
                    onClick={() => void handleRemoveImage()}
                  >
                    Remove Image
                  </MenuItem>
                )}

                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={() => setShowDeleteVehicle(true)}
                >
                  Delete Vehicle
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </SimpleGrid>
        <br />
        <VehicleTable vehicle={vehicleState} />
      </Box>
      <Box w={{ base: "100%", md: "50%" }} p="5">
        Upcoming maintenance
      </Box>
      <VehicleModal
        show={show}
        title="Edit Vehicle"
        buttonText="Save"
        onSubmit={(data: VehicleMutableFields) => {
          void (async (data: VehicleMutableFields) => {
            const updatedVehicle = await updateVehicle(vehicleState.id, data);
            if (updatedVehicle) {
              setVehicleState(updatedVehicle);
              setShow(false);
            }
          })(data);
        }}
        onClose={() => setShow(false)}
        vehicle={vehicleState}
      />
      <ConfirmModal
        show={showDeleteVehicle}
        title="Delete vehicle"
        bodyText="Are you sure you want to delete this vehicle?"
        buttonText="Yes"
        onSubmit={() => {}}
        onClose={() => setShowDeleteVehicle(false)}
      />
    </Box>
  );
};
