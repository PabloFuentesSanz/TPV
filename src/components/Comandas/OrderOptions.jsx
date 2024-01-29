import { Button } from '@nextui-org/react';
import React from 'react';

function OrderOptions({ onClose }) {
  return (
    <div className="flex gap-2">
      <Button className='w-1/6 h-[80px]'>Imprimir</Button>
      <Button className='w-1/6 h-[80px]'>Cobrar</Button>
      <Button className='w-1/6 h-[80px]'>Marchar</Button>
      <Button className='w-1/6 h-[80px]'>Preparar</Button>
      <Button className='w-1/6 h-[80px]'>Ver Comanda</Button>
      <Button className='w-1/6 h-[80px]' onClick={onClose}>Volver</Button>
    </div>
  );
}

export default OrderOptions;
