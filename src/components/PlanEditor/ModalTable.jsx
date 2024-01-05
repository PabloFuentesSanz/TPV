import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
function ModalTable({ isOpen, onOpenChange, table, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    numeroMesa: table?.numeroMesa || '', 
    capacidad: table?.capacidad || '',
    // Agrega aquí otras propiedades necesarias
  });

  useEffect(() => {
    if (table) {
      setFormData({
        numeroMesa: table.numeroMesa || '',
        capacidad: table.capacidad || '',
        // Agrega aquí otras propiedades
      });
    }
  }, [table]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        numeroMesa: table?.numeroMesa || '',
        capacidad: table?.capacidad || '',
        // Agrega aquí otras propiedades necesarias
      });
    }
  }, [isOpen, table]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = () => {
    onDelete(table.id);
    onOpenChange(false);
  };

  // Guardar los cambios
  const handleSave = () => {
    const updatedTable = {
      ...table,
      ...formData,
    };

    onSave(updatedTable);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Administar Espacio
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Número de Mesa"
                  name="numeroMesa"
                  type="number"
                  min={0}
                  value={formData.numeroMesa}
                  onChange={handleChange}
                />
                <Input
                  label="Capacidad"
                  name="capacidad"
                  type="number"
                  min={1}
                  value={formData.capacidad}
                  onChange={handleChange}
                />
                {/* Agrega aquí más campos según sea necesario */}
              </ModalBody>
              <ModalFooter className="flex w-full justify-between">
                <div>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </div>
                <div className="flex space-x-1">
                  <Button color="danger" onPress={handleDelete}>
                    Borrar
                  </Button>
                  <Button color="primary" onPress={handleSave}>
                    Guardar
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalTable;
