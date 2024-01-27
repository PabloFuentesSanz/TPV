import { Button } from '@nextui-org/react';
import React, { useState } from 'react';

function NumericKeypad({ onDiscountApplied }) {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput(input + value);
  };

  const applyDiscount = (type) => {
    if (input) {
      const discountValue = parseFloat(input);
      if (!isNaN(discountValue)) {
        onDiscountApplied(discountValue, type);
        setInput('');
      }
    }
  };

  return (
    <div>
      {/* Campo de texto para mostrar la entrada */}
      <input
        type="text"
        value={input}
        readOnly
        style={{ marginBottom: '10px', textAlign: 'right' }}
      />
<br />
      {/* Botones del teclado numérico */}
      <div className='flex flex-wrap gap-2'>

      {[...Array(10).keys()].map((number) => (
          <Button
          key={number}
          onClick={() => handleButtonClick(number.toString())}
          >
          {number}
        </Button>
      ))}
      <Button onClick={() => handleButtonClick('.')}>.</Button>
      <Button onClick={() => setInput('')}>Borrar</Button>

      {/* Botones para aplicar descuento */}
      <Button onClick={() => applyDiscount('percentage')}>% Descuento</Button>
      <Button onClick={() => applyDiscount('euro')}>€ Descuento</Button>
      </div>
    </div>
  );
}

export default NumericKeypad;
