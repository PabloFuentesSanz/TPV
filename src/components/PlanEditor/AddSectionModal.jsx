import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
import toast from 'react-hot-toast';

function AddSectionModal({
  isOpen,
  onOpenChange,
  newSectionName,
  setNewSectionName,
  addSection,
}) {
  const handleAddSection = () => {
    if (!newSectionName.trim()) {
      toast.error('Por favor, ingrese un nombre para la sección.');
      return;
    }

    addSection(newSectionName);
    setNewSectionName('');
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Añadir Nueva Sección</ModalHeader>
        <ModalBody>
          <Input
            label="Nombre de la Sección"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button auto onClick={handleAddSection}>
            Añadir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddSectionModal;
