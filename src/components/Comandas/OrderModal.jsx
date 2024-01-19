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
import OrderDetails from './OrderDetails';
import { mockedIngredients } from '../../mocks/mockedIngredients';
import { mockedMenu } from '../../mocks/mockedMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function OrderModal({ isOpen, onClose, table }) {
  const [categories, setCategories] = useState(mockedCategories);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState(mockedIngredients.concat(mockedMenu));

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToOrder = (item) => {
    const existingItem = currentOrder.find(
      (orderItem) => orderItem.id === item.id
    );
    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setCurrentOrder([...currentOrder, { ...item, quantity: 1 }]);
    }
  };
  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {}} hideCloseButton size="full">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-2xl">Comanda: {table?.nombreMesa}</h3>
        </ModalHeader>
        <ModalBody className='p-0'>
          <div className="flex w-full">
            <div className="w-1/3">
              <OrderDetails order={currentOrder} />
            </div>
            <div className="w-2/3 flex gap-5 flex-wrap">
              {!selectedCategory ? (
                Object.keys(categories).map((category) => {
                  //Hacer Componente
                  return (
                    <div
                      className="w-1/6 text-center cursor-pointer  ml-8"
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <img
                        src={categories[category].img}
                        alt=""
                        className="rounded"
                      />
                      <h3 className="text-xl">{category}</h3>
                    </div>
                  );
                })
              ) : (
                <div className='ml-4'>
                  <Button onClick={handleBackToCategories} color="primary">
                    <ArrowBackIcon />
                    Categorías
                  </Button>
                  <div className="flex flex-wrap">
                    {items
                      .filter(
                        (item) =>
                          item.categories.includes(selectedCategory) &&
                          item.salableItem
                      )
                      .map((item, index) => (
                        <div
                          key={index}
                          className="w-1/4 p-2"
                          onClick={() => handleAddToOrder(item)}
                        >
                          <h4>{item.name}</h4>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
