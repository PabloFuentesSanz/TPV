import React, { forwardRef } from 'react';
import { useDrop } from 'react-dnd';

const DropZone = forwardRef(({ onDrop, children },ref) => {
  const [, drop] = useDrop(() => ({
    accept: 'table',
    drop: (item, monitor) => {
      if (item.isNew) {
        // Añadir nueva mesa
        const clientOffset = monitor.getClientOffset();
        const dropzoneRect = ref.current.getBoundingClientRect();
        const relativePosition = {
          x: clientOffset.x - dropzoneRect?.left - 10,
          y: clientOffset.y - dropzoneRect?.top - 20,
        };

        onDrop(item.type,item.isNew, relativePosition);
      } else {
        // Mover mesa existente
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          onDrop(item.id, item.isNew, delta);
        }
      }
    },
  }));

  return (
    <div
      ref={(node) => drop((ref.current = node))}
      className="floor-plan w-9/12 bg-slate-800"
    >
      {children}
    </div>
  );
});

DropZone.displayName = 'DropZone';

export default DropZone;
