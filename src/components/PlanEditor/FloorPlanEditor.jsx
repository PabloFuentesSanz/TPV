import React, { useState, useRef, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from './DropZone';
import MovableTable from './MovableTable';
import AsideEditor from './AsideEditor';
import ModalTable from './ModalTable';
import { Button, Tab, Tabs, useDisclosure } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import AddSectionModal from './AddSectionModal';

function FloorPlanEditor() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [newSectionName, setNewSectionName] = useState('');
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

  const [sections, setSections] = useState({});

  const [selectedSection, setSelectedSection] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const selectedSectionRef = useRef(selectedSection);

  useEffect(() => {
    selectedSectionRef.current = selectedSection;
  }, [selectedSection]);

  const dropzoneRef = useRef(null);

  const addSection = (sectionName) => {
    setSections((prev) => ({ ...prev, [sectionName]: [] }));
    setSelectedSection(sectionName);
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    onOpen();
  };

  let idCounter = 0;
  const generateId = () => {
    return `table-${Date.now()}-${idCounter++}`;
  };

  const addTable = (type, position) => {
    const newTable = {
      id: generateId(),
      type,
      position,
    };

    setSections((prevSections) => ({
      ...prevSections,
      [selectedSectionRef.current]: [
        ...prevSections[selectedSectionRef.current],
        newTable,
      ],
    }));
  };

  const deleteTable = (tableId) => {
    setSections((prevSections) => {
      // Obtén todas las mesas de la sección actual, excepto la que se va a eliminar
      const updatedTables = prevSections[selectedSectionRef.current].filter(
        (table) => table.id !== tableId
      );

      // Actualiza la sección actual con las mesas restantes
      return {
        ...prevSections,
        [selectedSectionRef.current]: updatedTables,
      };
    });
  };

  const updateTable = (updatedTable) => {
    const isDuplicate = sections[selectedSectionRef.current].some(
      (table) =>
        table.id !== updatedTable.id &&
        table.numeroMesa === updatedTable.numeroMesa
    );

    if (isDuplicate) {
      toast.error('Ya existe una mesa con ese número en esta sección.');
      return;
    }

    setSections((prevSections) => ({
      ...prevSections,
      [selectedSectionRef.current]: prevSections[
        selectedSectionRef.current
      ].map((table) => (table.id === updatedTable.id ? updatedTable : table)),
    }));
    onOpenChange(false);
  };

  function isWithinBounds(dropzoneRect, newPosition) {
    return (
      newPosition.x >= 0 &&
      newPosition.y >= 0 &&
      newPosition.x <= dropzoneRect.width - 100 &&
      newPosition.y <= dropzoneRect.height - 100
    );
  }

  const moveTable = (id, delta) => {
    setSections((prevSections) => {
      const updatedTables = prevSections[selectedSectionRef.current].map(
        (table) => {
          if (table.id === id) {
            const dropzoneRect = dropzoneRef.current.getBoundingClientRect();
            const newPosition = {
              x: table.position.x + delta.x,
              y: table.position.y + delta.y,
            };

            if (isWithinBounds(dropzoneRect, newPosition)) {
              return { ...table, position: newPosition };
            }
          }
          return table;
        }
      );

      return { ...prevSections, [selectedSectionRef.current]: updatedTables };
    });
  };

  const onDrop = (typeOrId, isNew, positionOrDelta) => {
    if (isNew) {
      // Añadir nueva mesa
      addTable(typeOrId, positionOrDelta);
    } else {
      // Mover mesa existente
      moveTable(typeOrId, positionOrDelta);
    }
  };

  const handleTabChange = (key) => {
    if (selectedSection && key === 'add') {
      setIsAddSectionModalOpen(true);
    } else if (key) {
      setSelectedSection(key);
    }
  };

  return (
    <>
      {Object.keys(sections).length === 0 ? (
        <div className='flex w-full justify-center full-height items-center'>
        <Button onClick={() => setIsAddSectionModalOpen(true)}>
          Añadir Sección
        </Button>
        </div>
      ) : (
        <DndProvider
          backend={HTML5Backend}
          options={{ enableMouseEvents: true }}
        >
          <div className="flex w-full full-height">
            <Tabs
              value={selectedSection}
              aria-label="Options"
              onSelectionChange={handleTabChange}
            >
              {Object.keys(sections).map((sectionName) => (
                <Tab key={sectionName} title={sectionName} />
              ))}

              <Tab title="+" key="add" />
            </Tabs>

            {/* Renderiza el DropZone y la barra lateral */}
            <div className="flex w-full full-height">
              {selectedSection && sections[selectedSection] && (
                <DropZone ref={dropzoneRef} onDrop={onDrop}>
                  {sections[selectedSection].map((table) => (
                    <MovableTable
                      key={table.id}
                      id={table.id}
                      type={table.type}
                      position={table.position}
                      moveTable={moveTable}
                      onClick={handleTableClick}
                    />
                  ))}
                </DropZone>
              )}
              <AsideEditor addTable={addTable} />
            </div>
          </div>
        </DndProvider>
      )}
      <AddSectionModal
        isOpen={isAddSectionModalOpen}
        onOpenChange={setIsAddSectionModalOpen}
        newSectionName={newSectionName}
        setNewSectionName={setNewSectionName}
        addSection={addSection}
      />
      {selectedTable && (
        <ModalTable
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          table={sections[selectedSection].find(
            (t) => t.id === selectedTable.id
          )}
          onSave={updateTable}
          onDelete={deleteTable}
        />
      )}
    </>
  );
}

export default FloorPlanEditor;
