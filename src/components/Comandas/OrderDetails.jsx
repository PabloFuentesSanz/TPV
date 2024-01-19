import React from 'react';
import ensaladas from '../../assets/img/categories/comidas.png';
const OrderDetails = ({ order }) => {
  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div className=" bg-secondary h-[600px] rounded-lg">
      {order.length === 0 ? (
        <div className='flex w-full h-full justify-center items-center'>
            <p>No hay artículos en la comanda.</p>
        </div>
      ) : (
        <ul>

          {order.map((item, index) => (
            <li key={index} className="order-item bg-lightAccent text-primary">
              <div className="flex w-full gap-3 p-2">
                <div className='w-1/6'>
                  <img className=" rounded-full" src={ensaladas} />
                </div>
                <div className='flex-col w-5/6 ml-4'>
                  <div className='flex'>
                    <span className="w-3/4 text-lg">{item.name}</span>
                    <span className="text-xl">x{item.quantity}</span>
                  </div>
                  <div className='flex'>
                    <span className="w-3/4 text-sm ">{item.price}€</span>
                    <span className="">{calculateItemTotal(item)}€</span>
                  </div>
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
