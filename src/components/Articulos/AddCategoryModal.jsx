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
import { useState } from 'react';
export default function AddCategoryModal({ onClose, onSave, isOpen }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');


  const handleSubmit = () => {
    const newCategory = {
      id: categoryName,
      name: categoryName,
      description: categoryDescription
    }
    onSave(newCategory)
  }

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
            minRows="6"
          />
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={onClose}>
            Cerrar
          </Button>
          <Button auto onClick={handleSubmit}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
