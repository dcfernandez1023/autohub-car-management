"use client";

import { ScheduledService } from "@/types/ScheduledServiceType";
import { Vehicle } from "@/types/Vehicle";
import { AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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

interface Props {
  vehicles: Vehicle[];
  scheduledServiceTypes: ScheduledService[];
}

export const ScheduledServices = ({
  vehicles,
  scheduledServiceTypes,
}: Props) => {
  const getVehicleName = (id: string) => {
    const vehicle = vehicles.find((vehicle) => vehicle.id === id);
    return vehicle ? vehicle.name : "Not found"; // TODO: Handle this better
  };

  const formatTimeInterval = (timeInterval: number, timeUnits: string) => {
    return `Every ${
      timeInterval === 1
        ? `${timeInterval} ${timeUnits}`
        : `${timeInterval.toLocaleString()} ${timeUnits}s`
    }`;
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
            aria-label="Add scheduled service type"
          />
        </Box>
      </SimpleGrid>
      <br />
      {scheduledServiceTypes.length === 0 ? (
        <Text>You have not entered any scheduled service types.</Text>
      ) : (
        <Box>
          {scheduledServiceTypes.map((scheduledService) => {
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
                      <Text>
                        This scheduled service type has not been applied to any
                        vehicles.
                      </Text>
                    ) : (
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
                                      >
                                        {getVehicleName(schedule.vehicleId)}
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
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })}
        </Box>
      )}
    </Container>
  );
};
