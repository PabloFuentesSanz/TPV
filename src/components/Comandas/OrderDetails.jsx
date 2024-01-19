import React from 'react';
import ensaladas from '../../assets/img/categories/comidas.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@nextui-org/react';

const OrderDetails = ({ order, onIncrementQuantity, onDecrementQuantity }) => {
  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div className=" bg-secondary h-[600px] rounded-lg">
      {order.length === 0 ? (
        <div className="flex w-full h-full justify-center items-center">
          <p>No hay artículos en la comanda.</p>
        </div>
      ) : (
        <ul>
          {order.map((item, index) => (
            <li key={index} className="order-item bg-lightAccent text-primary">
              <div className="flex w-full gap-3 ">
                <div className='flex'>
                  <Button
                    isIconOnly
                    onClick={() => onDecrementQuantity(item.id)}
                    size="sm"
                    className='h-full rounded-none'
                    color='primary'

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
                    color='primary'
                    className='h-full rounded-none'
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
  );
};

export default OrderDetails;
