import React from 'react';
import { useDrag } from 'react-dnd';
import { renderTable } from './Tables/tableUtils';

function MovableTable({ id, type, position, moveTable, onClick }) {
  const render = renderTable(type);

  const [, drag] = useDrag(() => ({
    type: 'table',
    item: { id, type, isNew: false },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        moveTable(id, delta);
      }
    },
  }));

  return (
    <div
      ref={drag}
      style={{ position: 'absolute', left: position.x, top: position.y }}
      onClick={() => onClick({ id, type, position })}
    >
      {render}
    </div>
  );
}

export default MovableTable;
