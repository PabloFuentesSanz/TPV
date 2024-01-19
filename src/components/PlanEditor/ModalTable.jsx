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
import { toast } from 'react-hot-toast';

function ModalTable({ isOpen, onClose, tableData, onSave, onDelete, onDuplicate }) {
  const [formData, setFormData] = useState({
    nombreMesa: '',
    tipoMesa: '',
    capacidad: '',
  });

  useEffect(() => {
    if (tableData) {
      setFormData({
        nombreMesa: tableData.nombreMesa || '',
        tipoMesa: tableData.tipoMesa || '',
        capacidad: tableData.capacidad || '',
      });
    } else {
      setFormData({ nombreMesa: '', tipoMesa: '', capacidad: '' });
    }
  }, [tableData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.nombreMesa || !formData.tipoMesa || (formData.tipoMesa !== 'muro' && !formData.capacidad)) {
      toast.error('Por favor, completa todos los campos necesarios.');
      return;
    }
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    onDelete(tableData.id);
    onClose();
  };

  const handleDuplicate = () => {
    onDuplicate(tableData.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={()=>{}} hideCloseButton>
      <ModalContent>
        <ModalHeader>{tableData ? 'Editar Mesa' : 'Añadir Mesa'}</ModalHeader>
        <ModalBody>
          <Input
            label="Nombre de Mesa"
            name="nombreMesa"
            value={formData.nombreMesa}
            onChange={handleChange}
          />
          <select
            name="tipoMesa"
            value={formData.tipoMesa}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px' }}
          >
            <option value="">Selecciona Tipo de Mesa</option>
            <option value="cuadrada">Mesa Cuadrada</option>
            <option value="redonda">Mesa Redonda</option>
            <option value="muro">Muro</option>
          </select>
          {(formData.tipoMesa == 'cuadrada' || formData.tipoMesa == 'redonda'  ) && (
            <Input
              label="Número de Comensales"
              name="capacidad"
              type="number"
              value={formData.capacidad}
              onChange={handleChange}
            />
          )}
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
          <div className="flex space-x-1">
            {tableData && (
              <>
                <Button color="danger" onPress={handleDelete}>
                  Borrar Mesa
                </Button>
                <Button onPress={handleDuplicate} className='bg-purple text-white'>
                  Duplicar
                </Button>
              </>
            )}
            <Button color="primary" onPress={handleSave}>
              {tableData ? 'Guardar' : 'Crear'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalTable;
