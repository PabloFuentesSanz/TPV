import React, { useState } from 'react';
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

interface AddCategoryModalProps {
  onClose: () => void;
  onSave: (category: Category) => void;
  isOpen: boolean;
}
export default function AddCategoryModal({
  onClose,
  onSave,
  isOpen,
}: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleSubmit = () => {
    const newCategory: Category = {
      id: categoryName,
      name: categoryName,
      description: categoryDescription,
      items: [],
      img: ""
    };
    onSave(newCategory);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} hideCloseButton size="xl">
      <ModalContent>
        <ModalHeader>
          <h3>Nueva Categoría</h3>
        </ModalHeader>
        <ModalBody>
          <Input
            label="Nombre de la Categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Textarea
            label="Descripción"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            minRows={6}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Cerrar
          </Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
