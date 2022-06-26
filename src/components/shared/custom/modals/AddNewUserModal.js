import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import AddNewUserForm from "views/admin/userManage/components/AddNewUserForm";

export default function AddNewUserModal(props) {
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
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      {overlay}
      <ModalContent>
        <ModalHeader>Thêm mới người dùng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddNewUserForm />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="whatsapp" mr={'10px'}>Yes</Button>
          <Button onClick={onClose} colorScheme="red">No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}