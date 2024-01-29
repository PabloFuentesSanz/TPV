import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';

function NumericKeypad({ onDiscountApplied }) {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    if (value === '.') {
      if (input === '') {
        setInput('0.');
      } else if (!input.includes('.')) {
        setInput(input + value);
      }
    } else {
      if (input === '0' && value !== '.') {
        setInput(value);
      } else {
        const parts = input.split('.');
        if (parts.length === 2 && parts[1].length >= 2) {
          return;
        }
        setInput(input + value);
      }
    }
  };

  const clearInput = () => {
    setInput('');
  };

  const deleteLastDigit = () => {
    setInput(input.slice(0, -1));
  };

  const applyDiscount = (type) => {
    if (input) {
      const discountValue = parseFloat(input);
      if (!isNaN(discountValue)) {
        onDiscountApplied(discountValue, type);
        clearInput();
      }
    }
  };

  // Función para renderizar los botones numéricos
  const renderNumberButtons = () => {
    const buttons = [];
    for (let number = 1; number <= 9; number++) {
      buttons.push(
        <Button
          key={number}
          className="h-16 rounded-md text-xl"
          onClick={() => handleButtonClick(number.toString())}
        >
          {number}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex justify-center">
      <div>
        <Input
          type="text"
          value={input}
          readOnly
          style={{ marginBottom: '10px', textAlign: 'center' }}
        />
        <div className="flex gap-2">
          <div className="grid grid-cols-3 gap-2 text-xl">
            {renderNumberButtons()}
            <Button
              className="flex-grow h-16 rounded-md text-xl"
              onClick={() => handleButtonClick('0')}
            >
              0
            </Button>
            <Button
              className="flex-grow h-16 rounded-md text-xl"
              onClick={() => handleButtonClick('.')}
            >
              .
            </Button>
            <Button className="flex-grow h-16 rounded-md text-xl" onClick={deleteLastDigit}>
              Borrar 1
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 ">
            <Button
              className="flex-grow h-full rounded-md text-xl"
              onClick={() => applyDiscount('percentage')}
            >
              %
            </Button>
            <Button
              className="flex-grow h-full rounded-md text-xl"
              onClick={() => applyDiscount('euro')}
            >
              €
            </Button>
            <Button className=" h-full rounded-md text-xl" onClick={clearInput}>
              Borrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumericKeypad;
