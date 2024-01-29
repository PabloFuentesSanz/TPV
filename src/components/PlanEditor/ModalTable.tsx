import React, { useState, useEffect, ChangeEvent } from 'react';
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
interface ModalTableProps {
  isOpen: boolean;
  onClose: () => void;
  tableData?: Table;
  onSave: (formData: Table) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}
function ModalTable({
  isOpen,
  onClose,
  tableData,
  onSave,
  onDelete,
  onDuplicate,
}: ModalTableProps) {
  const [formData, setFormData] = useState<Table>({
    id: '',
    nombreMesa: '',
    tipoMesa: '',
    capacidad: 0,
    position: { x: 0, y: 0 },
    dimension: { width: 0, height: 0 },
  });

  useEffect(() => {
    if (tableData) {
      setFormData({
        id: '',
        nombreMesa: tableData.nombreMesa || '',
        tipoMesa: tableData.tipoMesa || '',
        capacidad: tableData.capacidad || 0,
        position: { x: 0, y: 0 },
        dimension: { width: 0, height: 0 },
      });
    } else {
      setFormData({
        id: '',
        nombreMesa: '',
        tipoMesa: '',
        capacidad: 0,
        position: { x: 0, y: 0 },
        dimension: { width: 0, height: 0 },
      });
    }
  }, [tableData, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (
      !formData.nombreMesa ||
      !formData.tipoMesa ||
      (formData.tipoMesa !== 'muro' && !formData.capacidad)
    ) {
      toast.error('Por favor, completa todos los campos necesarios.');
      return;
    }
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (tableData) {
      onDelete(tableData.id);
      onClose();
    }
  };

  const handleDuplicate = () => {
    if (tableData) {
      onDuplicate(tableData.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} hideCloseButton>
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
          {(formData.tipoMesa == 'cuadrada' ||
            formData.tipoMesa == 'redonda') && (
            <Input
              label="Número de Comensales"
              name="capacidad"
              type="number"
              value={formData.capacidad?.toString()}
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
                <Button
                  onPress={handleDuplicate}
                  className="bg-purple text-white"
                >
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
