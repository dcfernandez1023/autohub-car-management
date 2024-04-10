"use client";

import {
  formatTimeInterval,
  getVehicleName,
  newScheduledServiceType,
} from "@/client/util";
import { ScheduledService, TimeUnits } from "@/types/ScheduledServiceType";
import { Vehicle } from "@/types/Vehicle";
import { AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ScheduledServiceModal } from "./ScheduledServiceModal";
import { useEffect, useState } from "react";
import {
  createScheduledServiceType,
  updateScheduledServiceType,
} from "@/client/scheduledService";
// import { ScheduledServiceDisplay } from "./ScheduledServiceDisplay";

interface Props {
  vehicles: Vehicle[];
  scheduledServices: ScheduledService[];
}

export const ScheduledServices = ({ vehicles, scheduledServices }: Props) => {
  const [vehiclesState, setVehiclesState] = useState<Vehicle[]>(vehicles);
  const [scheduledServiceState, setScheduledServiceState] =
    useState<ScheduledService[]>(scheduledServices);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduledService>();

  useEffect(() => {
    setVehiclesState(vehicles);
    setScheduledServiceState(scheduledServices);
  }, [vehicles, scheduledServices]);

  const handleModalClose = () => {
    setIsCreating(false);
    setSelectedSchedule(undefined);
  };

  const readScheduleInstances = () => {
    const vehicleScheduleInstances = vehiclesState.map((vehicle) => {
      const mileInterval = parseInt(
        (document.getElementById(`miles-${vehicle.id}`) as HTMLInputElement)
          .value,
      );
      const timeInterval = parseInt(
        (document.getElementById(`time-${vehicle.id}`) as HTMLInputElement)
          .value,
      );
      const timeUnits = (
        document.getElementById(`time-units-${vehicle.id}`) as HTMLSelectElement
      ).value as TimeUnits;

      return {
        vehicleId: vehicle.id,
        mileInterval,
        timeInterval,
        timeUnits,
      };
    });
    return vehicleScheduleInstances;
  };

  const handleCreate = async (name: string) => {
    const vehicleScheduleInstances = readScheduleInstances();
    const payload = { name, vehicleScheduleInstances };
    const scheduledService = await createScheduledServiceType(payload);
    if (scheduledService) {
      const copy = scheduledServiceState.slice();
      copy.push(scheduledService);
      setScheduledServiceState(copy);
    }
  };

  const handleEdit = async (name: string) => {
    if (!selectedSchedule) return;
    const vehicleScheduleInstances = readScheduleInstances();
    const payload = { name, vehicleScheduleInstances };
    const scheduledService = await updateScheduledServiceType(
      selectedSchedule.id,
      payload,
    );
    if (scheduledService) {
      const copy = scheduledServiceState.slice();
      const i = copy.findIndex((obj) => obj.id === selectedSchedule.id);
      // TODO: Handle better
      if (i < 0) return;
      copy[i] = scheduledService;
      setScheduledServiceState(copy);
    }
  };

  return (
    <Container maxW="800px" minH="80vh" mt="50px">
      <SimpleGrid columns={2}>
        <Box>
          <Heading as="h4" size="lg">
            Scheduled Service Types
          </Heading>
        </Box>
        <Box textAlign="right">
          <IconButton
            icon={<AddIcon />}
            onClick={() => setIsCreating(true)}
            aria-label="Add scheduled service type"
          />
        </Box>
      </SimpleGrid>
      <br />
      {scheduledServiceState.length === 0 ? (
        <Text>You have not entered any scheduled service types.</Text>
      ) : (
        <Box>
          {scheduledServiceState.map((scheduledService) => {
            return (
              <Accordion key={scheduledService.id} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {scheduledService.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {scheduledService.vehicleScheduleInstances.length === 0 ? (
                      <SimpleGrid columns={{ sm: 2 }} mt="15px">
                        <Box>
                          <Text>
                            This has not been applied to any vehicles.
                          </Text>
                        </Box>
                        <Box textAlign="right">
                          <Button
                            onClick={() =>
                              setSelectedSchedule(scheduledService)
                            }
                          >
                            Edit
                          </Button>
                        </Box>
                      </SimpleGrid>
                    ) : (
                      <Box>
                        <SimpleGrid columns={{ sm: 2 }} mt="15px">
                          <Box>
                            <strong>Applied to:</strong>
                          </Box>
                          <Box textAlign="right">
                            <Button
                              onClick={() =>
                                setSelectedSchedule(scheduledService)
                              }
                            >
                              Edit
                            </Button>
                          </Box>
                        </SimpleGrid>
                        {/* {scheduledService.vehicleScheduleInstances.map(
                          (schedule) => {
                            const vehicle = findVehicle(
                              schedule.vehicleId,
                              vehicles,
                            );
                            return (
                              vehicle && (
                                <ScheduledServiceDisplay
                                  isEditable={false}
                                  vehicle={vehicle}
                                  schedule={schedule}
                                />
                              )
                            );
                          },
                        )} */}
                        <TableContainer>
                          <Table variant="simple">
                            <Thead>
                              <Tr>
                                <Th>Vehicle</Th>
                                <Th>Mile Interval</Th>
                                <Th>Time Interval</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {scheduledService.vehicleScheduleInstances.map(
                                (schedule) => {
                                  return (
                                    <Tr
                                      key={`${schedule.sstId}-${schedule.vehicleId}`}
                                    >
                                      <Td>
                                        <Link
                                          href={`/client/vehicle/${schedule.vehicleId}`}
                                          target="_blank"
                                        >
                                          {getVehicleName(
                                            schedule.vehicleId,
                                            vehiclesState,
                                          )}
                                        </Link>
                                      </Td>
                                      <Td>
                                        Every{" "}
                                        {schedule.mileInterval.toLocaleString()}
                                      </Td>
                                      <Td>
                                        {formatTimeInterval(
                                          schedule.timeInterval,
                                          schedule.timeUnits,
                                        )}
                                      </Td>
                                    </Tr>
                                  );
                                },
                              )}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Box>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })}
        </Box>
      )}
      <ScheduledServiceModal
        show={isCreating}
        isNew={true}
        title="Create Scheduled Service Type"
        buttonText="Create"
        scheduledService={newScheduledServiceType()}
        vehicles={vehiclesState}
        onSubmit={async (name: string) => await handleCreate(name)}
        onClose={handleModalClose}
      />
      <ScheduledServiceModal
        show={Boolean(selectedSchedule)}
        isNew={false}
        title="Edit Scheduled Service Type"
        buttonText="Done"
        scheduledService={selectedSchedule!}
        vehicles={vehiclesState}
        onSubmit={async (name: string) => await handleEdit(name)}
        onClose={handleModalClose}
      />
    </Container>
  );
};
