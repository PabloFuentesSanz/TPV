// FloorPlanEditor.js
import React, { useState } from 'react';
import DraggableTable from './DraggableTable';
import { Button, Tabs, Tab, table } from '@nextui-org/react';
import ModalTable from './ModalTable';
import AddSectionModal from './AddSectionModal';
import { toast } from 'react-hot-toast';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const FloorPlanEditor = () => {
  const [sections, setSections] = useState({});
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Funciones para manipulación de mesas
  const onDragStop = (tableId, d) => {
    const updatedTables = sections[selectedSection].map((table) => {
      if (table.id === tableId) {
        return { ...table, position: { x: d.x, y: d.y } };
      }
      return table;
    });
    setSections({ ...sections, [selectedSection]: updatedTables });
  };

  const onResizeStop = (tableId, size, position) => {
    const updatedTables = sections[selectedSection].map((table) => {
      if (table.id === tableId) {
        return { ...table, dimension: size, position };
      }
      return table;
    });
    setSections({ ...sections, [selectedSection]: updatedTables });
  };

  const addNewTable = () => {
    console.log('hola');
    // Comprueba si hay una sección seleccionada
    if (!selectedSection) {
      toast.error('Por favor, selecciona una sección primero.');
      return;
    }
    // Abre el modal
    setIsModalOpen(true);
  };

  const saveTableData = (formData) => {
    // Validación de los datos del formulario
    if (
      !formData.nombreMesa.trim() ||
      (formData.tipoMesa !== 'muro' && !formData.capacidad)
    ) {
      toast.error('Por favor, completa todos los campos necesarios.');
      return;
    }

    // Verificar si el nombre de la mesa ya existe en la sección actual
    const nombreExiste = sections[selectedSection]?.some(
      (t) => t.nombreMesa === formData.nombreMesa && t.id !== selectedTable?.id
    );
    if (nombreExiste) {
      toast.error('Ya existe una mesa con ese nombre en esta sección.');
      return;
    }

    // Determinar si estamos añadiendo una nueva mesa o actualizando una existente
    if (selectedTable) {
      console.log(selectedTable);
      // Actualizar una mesa existente
      const updatedTables = sections[selectedSection].map((table) => {
        if (table.id === selectedTable.id) {
          return { ...table, ...formData };
        }
        return table;
      });
      setSections({ ...sections, [selectedSection]: updatedTables });
    } else {
      console.log('hola222');
      // Añadir una nueva mesa
      const newTable = {
        id: `table-${Date.now()}`, // Genera un ID único basado en el tiempo actual
        nombreMesa: formData.nombreMesa,
        tipoMesa: formData.tipoMesa,
        capacidad: formData.tipoMesa !== 'muro' ? formData.capacidad : null,
        position: { x: 10, y: 10 }, // Posición inicial arbitraria
        dimension: { width: 100, height: 100 }, // Tamaño inicial
      };
      setSections({
        ...sections,
        [selectedSection]: [...sections[selectedSection], newTable],
      });
    }

    setIsModalOpen(false); // Cerrar el modal después de guardar
    setSelectedTable(null); // Resetea la mesa seleccionada
  };

  const deleteTable = (tableId) => {
    const updatedTables = sections[selectedSection].filter(
      (table) => table.id !== tableId
    );
    setSections({ ...sections, [selectedSection]: updatedTables });
    setIsModalOpen(false);
  };

  const duplicateTable = (tableId) => {
    const sectionTables = sections[selectedSection];
    const tableToDuplicate = sectionTables.find(
      (table) => table.id === tableId
    );
    if (!tableToDuplicate) return;

    const duplicatedTable = {
      ...tableToDuplicate,
      id: `table-${Date.now()}`,
      nombreMesa: `${tableToDuplicate.nombreMesa}-copia`,
      position: {
        x: tableToDuplicate.position.x + 20, // Mover ligeramente en el eje X
        y: tableToDuplicate.position.y + 20, // Mover ligeramente en el eje Y
      },
    };

    setSections({
      ...sections,
      [selectedSection]: [...sectionTables, duplicatedTable],
    });
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const addNewSection = (sectionName) => {
    if (sections[sectionName]) {
      toast.error('Ya existe una sección con ese nombre.');
      return;
    }
    setSections({ ...sections, [sectionName]: [] });
    setSelectedSection(sectionName);
    setIsNewSectionModalOpen(false);
  };

  const updateSection = (sectionName) => {
    const updatedSections = { ...sections };
    updatedSections[sectionName] = updatedSections[selectedSection];
    delete updatedSections[selectedSection];

    setSections(updatedSections);
    setSelectedSection(sectionName);
    setIsNewSectionModalOpen(false);
  };

  const deleteSection = () => {
    const updatedSections = { ...sections };
    delete updatedSections[selectedSection];

    setSections(updatedSections);
    setSelectedSection('');
    setIsNewSectionModalOpen(false);
  };

  const duplicateSection = () => {
    if (!selectedSection || !sections[selectedSection]) {
      toast.error('No se puede duplicar la sección actual.');
      return;
    }

    let baseName = selectedSection;
    let copyNumber = 1;
    let newSectionName = `${baseName}-copia`;
    while (sections[newSectionName]) {
      copyNumber += 1;
      newSectionName = `${baseName}-copia${copyNumber}`;
    }

    const duplicatedTables = sections[selectedSection].map((table) => ({
      ...table,
      id: `table-${Date.now()}-${Math.random()}`, // Genera un nuevo ID para cada mesa
    }));

    setSections({
      ...sections,
      [newSectionName]: duplicatedTables,
    });

    setSelectedSection(newSectionName); // Selecciona la nueva sección duplicada
    setIsNewSectionModalOpen(false); // Cierra el modal
  };

  const handleTabChange = (key) => {
    if (key === 'add') {
      setIsEditing(false);
      setNewSectionName('');
      setIsNewSectionModalOpen(true);
    } else if (key === selectedSection) {
      setIsEditing(true);
      setNewSectionName(key);
      setIsNewSectionModalOpen(true);
    } else {
      setSelectedSection(key);
    }
  };

  return (
    <div className="full-height">
      {Object.keys(sections).length === 0 ? (
        <div className="flex flex-col w-full full-height justify-center items-center gap-5">
          <Typography>
            Actualmente no dispone de ninguna sección en su plano.
          </Typography>
          <Button onClick={() => setIsNewSectionModalOpen(true)}>
            <AddIcon /> Añadir Sección
          </Button>
        </div>
      ) : (
        <>
          <div className="w-[85vw] flex m-auto my-3">
            <Tabs
              value={selectedSection}
              onSelectionChange={handleTabChange}
              selectedKey={selectedSection}
            >
              {Object.keys(sections).map((section) => (
                <Tab
                  key={section}
                  value={section}
                  title={
                    <>
                      {selectedSection === section && <EditIcon fontSize="small"/>}{' '}
                      {section}
                    </>
                  }
                />
              ))}
              <Tab title="+" value="add" key="add" />
            </Tabs>
          </div>
          <div className="workspace">
            {sections[selectedSection]?.map((table) => (
              <DraggableTable
                key={table.id}
                table={table}
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
                onClick={() => handleTableClick(table)}
              />
            ))}
            <div className="w-full flex justify-end pt-5 pr-5">
              <Button onClick={addNewTable}>
                <AddIcon />
                Añadir Elemento
              </Button>
            </div>
          </div>
        </>
      )}
      <AddSectionModal
        isOpen={isNewSectionModalOpen}
        onOpenChange={setIsNewSectionModalOpen}
        newSectionName={newSectionName}
        setNewSectionName={setNewSectionName}
        addSection={addNewSection}
        updateSection={updateSection}
        deleteSection={deleteSection}
        duplicateSection={duplicateSection}
        isEditing={isEditing}
      />
      <ModalTable
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tableData={selectedTable}
        onSave={saveTableData}
        onDelete={deleteTable}
        onDuplicate={duplicateTable}
      />
    </div>
  );
};

export default FloorPlanEditor;
