import {
  Modal,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';
import { mockedCategories } from '../../mocks/mockedCategories';
import { useState } from 'react';

function OrderModal({ isOpen, onClose, table }) {
  const [categories, setCategories] = useState(mockedCategories);
  return (
    <Modal isOpen={isOpen} onClose={() => {}} hideCloseButton size="5xl">
      <ModalContent>
        <ModalHeader>
          <h3>Comanda: {table?.nombreMesa}</h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex w-full">
            <div className="w-1/3">hola</div>
            <div className="w-2/3 flex gap-5 flex-wrap">
              {Object.keys(categories).map((category) => {
                //Hacer Componente
                return (
                
                  <div className="w-1/6 text-center cursor-pointer" key={category}>
                    <img src={categories[category].img} alt="" className='rounded'/>
                    <h3 className='text-xl'>{category}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </ModalBody>
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
