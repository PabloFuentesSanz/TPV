import { Button } from '@nextui-org/react';
import React from 'react';
import {
  HandCoins,
  ArrowLeftCircle,
  ReceiptText,
  HandPlatter,
  ChefHat,
  Eye,
} from 'lucide-react';

function OrderOptions({ onClose }) {
  return (
    <div className="flex gap-2 font-b">
      <Button color="primary" className="w-1/6 h-[80px]">
        <div className="flex flex-col  gap-2 items-center">
          <ReceiptText size="36" />
          Recibo
        </div>
      </Button>
      <Button color="primary" className="w-1/6 h-[80px]">
        <div className="flex flex-col gap-2 items-center">
          <HandCoins size="36" />
          Cobrar
        </div>
      </Button>
      <Button color="primary" className="w-1/6 h-[80px]">
        <div className="flex flex-col gap-2 items-center">
          <HandPlatter size="36" />
          Marchar
        </div>
      </Button>
      <Button color="primary" className="w-1/6 h-[80px]">
        <div className="flex flex-col  gap-2 items-center">
          <ChefHat size="36" />
          Preparar
        </div>
      </Button>
      <Button color="primary" className="w-1/6 h-[80px]">
        <div className=" flex flex-col gap-2 items-center">
          <Eye size="36" />
          Ver Comanda
        </div>
      </Button>
      <Button color="primary" className="w-1/6 h-[80px]" onClick={onClose}>
        <div className="flex flex-col  gap-2 items-center">
          <ArrowLeftCircle size="36" />
          Volver
        </div>
      </Button>
    </div>
  );
}

export default OrderOptions;
