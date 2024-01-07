// DraggableTable.js
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import RestaurantIcon from '@mui/icons-material/Restaurant';
const DraggableTable = ({ table, onDragStop, onResizeStop, onClick }) => {
  const { id, nombreMesa, tipoMesa, capacidad, position, dimension } = table;

  const [hasMoved, setHasMoved] = useState(false);

  const handleDragStart = () => {
    setHasMoved(false);
  };

  const handleDrag = () => {
    setHasMoved(true);
  };

  const handleDragStop = (e, d) => {
    if (!hasMoved) {
      onClick(table);
    }
    onDragStop(id, d);
  };
  const handleResize = () => {
    setHasMoved(true);
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    onResizeStop(
      id,
      { width: ref.offsetWidth, height: ref.offsetHeight },
      position
    );
  };

  const mesaStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: tipoMesa === 'muro' ? 'black' : '#C4A484',
    border: '2px solid black',
    color: tipoMesa === 'muro' ? 'white' : 'black',
    borderRadius: tipoMesa === 'redonda' ? '50%' : '10px',
    display: 'flex',
    alignItems: 'center', // Centrado vertical
    justifyContent: 'center', // Centrado horizontal
    textAlign: 'center', // Asegura que el texto esté centrado si ocupa más de una línea
  };

  return (
    <Rnd
      size={{ width: dimension.width, height: dimension.height }}
      position={{ x: position.x, y: position.y }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
      bounds=".workspace"
      minWidth={50}
      minHeight={50}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <div className='flex flex-col gap-1' style={mesaStyle}>
        {nombreMesa} <br />
        {tipoMesa !== 'muro' && (
          <div className='flex'>
            <RestaurantIcon fontSize='small'/>
            {capacidad}
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default DraggableTable;
