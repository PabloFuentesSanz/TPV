import React, { useEffect, useState } from 'react';
import ensaladas from '../../assets/img/categories/ensaladas.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@nextui-org/react';
interface OrderDetailsProps {
  order: OrderItem[];
  onIncrementQuantity: (id: string) => void;
  onDecrementQuantity: (id: string) => void;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onIncrementQuantity,
  onDecrementQuantity,
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateItemTotal = (item: OrderItem) => {
    return (item.price * item.quantity).toFixed(2);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      return order.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };
    setTotalPrice(calculateTotalPrice());
  }, [order]);

  return (
    <>
      <div className="h-[45vh]  overflow-y-auto">
        {order.length === 0 ? (
          <div className="flex w-full h-full justify-center items-center">
            <p>No hay artículos en la comanda.</p>
          </div>
        ) : (
          <ul>
            {order.map((item, index) => (
              <li
                key={index}
                className="order-item bg-secondary text-primary mb-1"
              >
                <div className="flex w-full gap-3 ">
                  <div className="flex">
                    <Button
                      isIconOnly
                      onClick={() => onDecrementQuantity(item.id)}
                      size="sm"
                      className="h-full rounded-none"
                      color="primary"
                    >
                      <RemoveIcon />
                    </Button>
                  </div>
                  <div className="w-1/6 p-2">
                    <img className=" rounded-full" src={ensaladas} />
                  </div>
                  <div className="flex-col w-4/6 p-2">
                    <div className="flex">
                      <span className="w-3/4 text-lg">{item.name}</span>
                      <span className="text-xl">x{item.quantity}</span>
                    </div>
                    <div className="flex">
                      <span className="w-3/4 text-sm ">{item.price}€</span>
                      <span className="">{calculateItemTotal(item)}€</span>
                    </div>
                  </div>
                  <div className="flex  justify-end ">
                    <Button
                      isIconOnly
                      onClick={() => onIncrementQuantity(item.id)}
                      size="sm"
                      color="primary"
                      className="h-full rounded-none"
                    >
                      <AddIcon />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h1 className='text-3xl font-bebas text-center'>Total: {totalPrice}€</h1>
    </>
  );
};

export default OrderDetails;
