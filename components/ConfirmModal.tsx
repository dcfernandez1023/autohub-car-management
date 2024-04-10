import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface Props {
  show: boolean;
  title: string;
  bodyText: string;
  buttonText: string;
  onSubmit: () => void;
  onClose: () => void;
}

export const ConfirmModal = ({
  show,
  title,
  bodyText,
  buttonText,
  onSubmit,
  onClose,
}: Props) => {
  return (
    <Modal onClose={onClose} size="xl" isOpen={show}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{bodyText}</ModalBody>
        <ModalFooter>
          <Button onClick={onSubmit}>{buttonText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
