import React from 'react';
import { useDrag } from 'react-dnd';
import { renderTable } from './Tables/tableUtils';

function DraggableTable({ type, addTable }) {
  const render = renderTable(type);
  const [, drag] = useDrag(() => ({
    type: 'table',
    item: { type, isNew: true },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          addTable(type, monitor.getClientOffset());
        }
      }
    },
  }));

  return <div ref={drag}>{render}</div>;
}

export default DraggableTable;
