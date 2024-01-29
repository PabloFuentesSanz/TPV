import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';
import { mockedCategories } from '../../mocks/mockedCategories';
import { useState } from 'react';
import OrderDetails from './OrderDetails';
import { mockedIngredients } from '../../mocks/mockedIngredients';
import { mockedMenu } from '../../mocks/mockedMenu';
import OrderOptions from './OrderOptions';
import NumericKeypad from './NumericKeypad';

function OrderModal({ isOpen, onClose, table }) {
  const [categories, setCategories] = useState(mockedCategories);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState(mockedIngredients.concat(mockedMenu));

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleIncrementQuantity = (itemId) => {
    setCurrentOrder(
      currentOrder.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementQuantity = (itemId) => {
    setCurrentOrder(
      currentOrder
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
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

  const applyDiscount = (discountValue, type) => {
    if (!discountValue || isNaN(discountValue) || discountValue < 0) {
      console.error('Valor de descuento inválido');
      return;
    }
    const updatedOrder = currentOrder.map((item) => {
      let discountAmount = 0;
      if (type === 'percentage') {
        discountAmount = (item.price * discountValue) / 100;
      } else if (type === 'euro') {
        discountAmount = discountValue / currentOrder.length;
      }
      const discountedPrice = Math.max(0, item.price - discountAmount);
      return {
        ...item,
        price: discountedPrice,
      };
    });
    setCurrentOrder(updatedOrder);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      hideCloseButton
      size="full"
      className="px-3"
    >
      <ModalContent>
        <ModalBody className="p-0" style={{ maxHeight: '90vh', overflow: 'auto' }}>
          <div className="flex w-full">
            <div className="w-1/3 border-1">
              <div className="w-full p-3">
                <h3 className="text-2xl">Comanda {table?.nombreMesa}</h3>
              </div>
              <OrderDetails
                order={currentOrder}
                onIncrementQuantity={handleIncrementQuantity}
                onDecrementQuantity={handleDecrementQuantity}
              />
              <NumericKeypad onDiscountApplied={applyDiscount} />
            </div>
            <div className="w-2/3 ">
              <div className="w-full flex flex-wrap gap-3 pl-7">
                {Object.keys(categories)
                  .filter((category) => categories[category].salableCategory)
                  .map((category) => {
                    //Hacer Componente
                    return (
                      <div
                        className="w-1/6 text-center cursor-pointer"
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
                  })}
              </div>

              <div className="w-full border-t-1 p-2 pl-7">
                <div className="flex flex-wrap w-full gap-4">
                  {items
                    .filter(
                      (item) =>
                        item.categories.includes(selectedCategory) &&
                        item.salableItem
                    )
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex w-1/6 p-2 bg-primary text-white h-24 rounded-lg  justify-center items-center text-center"
                        onClick={() => handleAddToOrder(item)}
                      >
                        <h4>{item.name}</h4>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="w-full ">
            <OrderOptions onClose={() => handleClose()} />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OrderModal;
