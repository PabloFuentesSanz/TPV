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

interface AddSectionModalProps {
  isOpen: boolean;
  newSectionName: string;
  onOpenChange: (isOpen: boolean) => void;
  setNewSectionName: (name: string) => void;
  addSection: (name: string) => void;
  updateSection: (name: string) => void;
  deleteSection: () => void;
  duplicateSection: () => void;
  isEditing: boolean;
}

function AddSectionModal({
  isOpen,
  newSectionName,
  onOpenChange,
  setNewSectionName,
  addSection,
  updateSection,
  deleteSection,
  duplicateSection,
  isEditing,
}: AddSectionModalProps) {
  // Maneja el guardado de una sección nueva o actualizada
  const handleSave = () => {
    if (!newSectionName.trim()) {
      toast.error('Por favor, ingrese un nombre para la sección.');
      return;
    }

    if (isEditing) {
      updateSection(newSectionName); // Actualiza la sección existente
    } else {
      addSection(newSectionName); // Añade una nueva sección
    }
  };

  // Maneja la eliminación de una sección
  const handleDelete = () => {
    if (deleteSection) {
      deleteSection(); // Elimina la sección seleccionada
    }
  };

  const handleDuplicate = () => {
    if (duplicateSection) {
      duplicateSection();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} hideCloseButton>
      <ModalContent>
        <ModalHeader>
          {isEditing ? 'Editar Sección' : 'Añadir Nueva Sección'}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Nombre de la Sección"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button
            color="danger"
            variant="light"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          {isEditing && (
            <>
              <Button color="danger" onClick={handleDelete}>
                Borrar Sección
              </Button>
              <Button
                className="bg-purple text-white"
                onClick={handleDuplicate}
              >
                Duplicar
              </Button>
            </>
          )}
          <Button color="primary" onClick={handleSave}>
            {isEditing ? 'Guardar' : 'Añadir'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddSectionModal;
