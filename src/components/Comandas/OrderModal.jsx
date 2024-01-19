import {
  Modal,
  Input,
  Button,
  Textarea,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';

function OrderModal({ isOpen, onClose, table }) {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} hideCloseButton size="5xl">
      <ModalContent>
        <ModalHeader>
          <h3>Comanda: {table?.nombreMesa}</h3>
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OrderModal;
