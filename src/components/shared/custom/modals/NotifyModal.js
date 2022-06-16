import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";

export default function NotifyModal(props) {
  const {
    isOpen,
    onClose,
    data,
    title,
    modalContent,
    overlay,
    ...rest
  } = props;
  return (
    <Modal onClose={onClose} size="sm" isOpen={isOpen}>
      {overlay}
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalContent}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="whatsapp" mr={'10px'}>Yes</Button>
          <Button onClick={onClose} colorScheme="red">No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}