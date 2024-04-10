import {
  getVehicleName,
  getVehicleScheduledServiceInstance,
} from "@/client/util";
import { ScheduledService } from "@/types/ScheduledServiceType";
import { Vehicle } from "@/types/Vehicle";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Link,
  Td,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Stepper,
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  show: boolean;
  isNew: boolean;
  title: string;
  buttonText: string;
  scheduledService: ScheduledService;
  vehicles: Vehicle[];
  onSubmit: (name: string) => Promise<void>;
  onClose: () => void;
}

export const ScheduledServiceModal = ({
  show,
  isNew,
  title,
  buttonText,
  scheduledService,
  vehicles,
  onSubmit,
  onClose,
}: Props) => {
  const [name, setName] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const steps = [
    { title: "Name", description: "Enter a name" },
    { title: "Intervals", description: "Specify the schedule intervals" },
  ];

  useEffect(() => {
    setName(scheduledService?.name);
  }, [scheduledService]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isNew && activeStep < steps.length) setActiveStep(activeStep + 1);
      await onSubmit(name);
      handleClose();
    } catch (error) {
      // TODO: Handle this better
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setName("");
    setLoading(false);
    onClose();
  };

  const renderNameInput = () => {
    return (
      <Input
        id="scheduled-service-type-name"
        placeholder="Name"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
    );
  };

  const renderIntervalTable = () => {
    if (!scheduledService || !vehicles) return <div></div>;
    return (
      <TableContainer>
        <Table variant="simple">
          <colgroup>
            <col span={1} style={{ width: "30%" }} />
            <col span={1} style={{ width: "20%" }} />
            <col span={1} style={{ width: "50%" }} />
          </colgroup>
          <Thead>
            <Tr>
              <Th>Vehicle</Th>
              <Th>Mile Interval</Th>
              <Th>Time Interval</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vehicles.map((vehicle) => {
              const scheduledServiceInstance =
                getVehicleScheduledServiceInstance(
                  vehicle.id,
                  scheduledService,
                );
              return (
                <Tr key={`${vehicle.id}`}>
                  <Td>
                    <Link
                      href={`/client/vehicle/${vehicle.id}`}
                      target="_blank"
                    >
                      {getVehicleName(vehicle.id, vehicles)}
                    </Link>
                  </Td>
                  <Td>
                    <NumberInput
                      id={`miles-${vehicle.id}`}
                      size="sm"
                      defaultValue={
                        scheduledServiceInstance
                          ? scheduledServiceInstance.mileInterval
                          : 0
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                  <Td>
                    <SimpleGrid columns={{ sm: 2 }} spacing="5px">
                      <NumberInput
                        id={`time-${vehicle.id}`}
                        size="sm"
                        defaultValue={
                          scheduledServiceInstance
                            ? scheduledServiceInstance.timeInterval
                            : 0
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Select id={`time-units-${vehicle.id}`} size="sm">
                        {["day", "week", "month", "year"].map((val) => {
                          return (
                            <option
                              key={`${val}-${vehicle.id}`}
                              value={val}
                              selected={
                                scheduledServiceInstance?.timeUnits === val
                              }
                            >
                              {val.charAt(0).toUpperCase() + val.slice(1)}
                            </option>
                          );
                        })}
                      </Select>
                    </SimpleGrid>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const renderStep = () => {
    if (activeStep === 0) return renderNameInput();
    else return renderIntervalTable();
  };

  if (isNew) {
    return (
      <Modal onClose={handleClose} size="xl" isOpen={show}>
        <ModalOverlay />
        <ModalContent minW="fit-content">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stepper index={activeStep}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <br />
            {renderStep()}
          </ModalBody>
          <ModalFooter>
            {activeStep >= steps.length - 1 ? (
              <Button isLoading={loading} onClick={() => void handleSubmit()}>
                {buttonText}
              </Button>
            ) : (
              <Button onClick={() => setActiveStep(activeStep + 1)}>
                Next
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (!scheduledService || !vehicles) return <div></div>;

  return (
    <Modal onClose={onClose} size="xl" isOpen={show}>
      <ModalOverlay />
      <ModalContent minW="fit-content">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderNameInput()}
          <br />
          <br />
          {renderIntervalTable()}
        </ModalBody>
        <ModalFooter>
          <Button isLoading={loading} onClick={() => void handleSubmit()}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
