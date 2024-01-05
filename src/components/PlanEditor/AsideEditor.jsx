import React from 'react';
import DraggableTable from './DraggableTable';

function AsideEditor({addTable}) {
  return (
    <div className="flex flex-col gap-y-10 toolbar w-2/12 bg-slate-400 items-center">
        <p className='mt-3 mb-3 text-2xl'>Elementos</p>
      <DraggableTable type="round" addTable={addTable} />
      <DraggableTable type="square" addTable={addTable} />
      <DraggableTable type="chair" addTable={addTable} />
      {/* Más tipos según sea necesario */}
    </div>
  );
}

export default AsideEditor;
