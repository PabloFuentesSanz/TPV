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
// AddSectionModal.js
function AddSectionModal({
  isOpen,
  onOpenChange,
  newSectionName,
  setNewSectionName,
  addSection,
  updateSection,
  deleteSection,
  duplicateSection,
  isEditing,
}) {
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
            auto
            flat
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
              <Button color="secondary"  onClick={handleDuplicate}>
                Duplicar
              </Button>
            </>
          )}
          <Button auto color="primary" onClick={handleSave}>
            {isEditing ? 'Guardar' : 'Añadir'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddSectionModal;
