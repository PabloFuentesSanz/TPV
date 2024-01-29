// FloorPlanEditor.js
import React, { Key, useState } from 'react';
import DraggableTable from '../PlanEditor/DraggableTable';
import { Button, Tabs, Tab } from '@nextui-org/react';
import ModalTable from '../PlanEditor/ModalTable';
import AddSectionModal from '../PlanEditor/AddSectionModal';
import { toast } from 'react-hot-toast';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface FormData {
  nombreMesa: string;
  tipoMesa: string;
  capacidad?: number;
}

const FloorPlanEditor = () => {
  const [sections, setSections] = useState<Sections>({});
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState<boolean>(false);
  const [newSectionName, setNewSectionName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Funciones para manipulación de mesas
  const onDragStop = (tableId: string, d: { x: number; y: number }) => {
    const updatedTables = sections[selectedSection].map((table) => {
      if (table.id === tableId) {
        return { ...table, position: { x: d.x, y: d.y } };
      }
      return table;
    });
    setSections({ ...sections, [selectedSection]: updatedTables });
  };

  const onResizeStop = (tableId: string, size: { width: number; height: number }, position: { x: number; y: number }) => {
    const updatedTables = sections[selectedSection].map((table) => {
      if (table.id === tableId) {
        return { ...table, dimension: size, position };
      }
      return table;
    });
    setSections({ ...sections, [selectedSection]: updatedTables });
  };

  const addNewTable = () => {
    if (!selectedSection) {
      toast.error('Por favor, selecciona una sección primero.');
      return;
    }
    setIsModalOpen(true);
  };

  const saveTableData = (formData: FormData) => {
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
      // Añadir una nueva mesa
      const newTable = {
        id: `table-${Date.now()}`, 
        nombreMesa: formData.nombreMesa,
        tipoMesa: formData.tipoMesa,
        capacidad: formData.tipoMesa !== 'muro' ? formData.capacidad : null,
        position: { x: 10, y: 10 }, 
        dimension: { width: 100, height: 100 }, 
      };
      setSections({
        ...sections,
        [selectedSection]: [...sections[selectedSection], newTable],
      });
    }

    setIsModalOpen(false); // Cerrar el modal después de guardar
    setSelectedTable(null); // Resetea la mesa seleccionada
  };

  const deleteTable = (tableId: string) => {
    const updatedTables = sections[selectedSection].filter(
      (table) => table.id !== tableId
    );
    setSections({ ...sections, [selectedSection]: updatedTables });
    setIsModalOpen(false);
  };

  const duplicateTable = (tableId: string) => {
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

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const addNewSection = (sectionName: string) => {
    if (sections[sectionName]) {
      toast.error('Ya existe una sección con ese nombre.');
      return;
    }
    setSections({ ...sections, [sectionName]: [] });
    setSelectedSection(sectionName);
    setIsNewSectionModalOpen(false);
  };

  const updateSection = (sectionName: string) => {
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
    setIsEditing(false)
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
      id: `table-${Date.now()}-${Math.random()}`,
    }));

    setSections({
      ...sections,
      [newSectionName]: duplicatedTables,
    });

    setSelectedSection(newSectionName);
    setIsNewSectionModalOpen(false);
  };

  const handleTabChange = (key: Key) => {
    if (key === 'add') {
      setIsEditing(false);
      setNewSectionName('');
      setIsNewSectionModalOpen(true);
    } else if (key === selectedSection) {
      setIsEditing(true);
      setNewSectionName(key);
      setIsNewSectionModalOpen(true);
    } else {
      setSelectedSection(key as string);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTable(null);
  };

  // Simula guardar los datos en la API
  const saveFloorPlanToAPI = async (floorPlanData: any) => {
    // Aquí harías la llamada POST a tu API
    console.log('Guardando plano...', floorPlanData);
    // Simula una respuesta de la API
  };

  const handleSaveFloorPlan = async () => {
    // Preparar datos para enviar a la API
    const floorPlanData = Object.keys(sections).map((sectionName) => {
      return {
        sectionName,
        tables: sections[sectionName].map((table) => ({
          id: table.id,
          nombreMesa: table.nombreMesa,
          tipoMesa: table.tipoMesa,
          capacidad: table.capacidad,
          position: table.position,
          dimension: table.dimension,
        })),
      };
    });

    // Llamar a la API para guardar los datos
    try {
      await saveFloorPlanToAPI(floorPlanData);
      toast.success('Plano guardado con éxito');
    } catch (error) {
      toast.error('Error al guardar el plano');
    }
  };

  const containerStyles = {
    overflow: 'auto',
    maxWidth: '100%',
    maxHeight: '87vh',
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: '20px',
  };

  return (
    <div className="full-height flex justify-center items-center">
      {Object.keys(sections).length === 0 ? (
        <div className="flex flex-col w-full full-height justify-center items-center gap-5">
          <Typography>
            Actualmente no dispone de ninguna sección en su plano.
          </Typography>
          <Button onClick={() => setIsNewSectionModalOpen(true)} color='secondary' className='text-primary'>
            <AddIcon /> Añadir Sección
          </Button>
        </div>
      ) : (
        <>
          <div style={containerStyles}>
            <div className="workspace">
              <div className="w-full flex m-auto my-3 justify-between">
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
                          {selectedSection === section && (
                            <EditIcon fontSize="small" />
                          )}{' '}
                          {section}
                        </>
                      }
                    />
                  ))}
                  <Tab title="+" value="add" key="add" className='text-2xl flex mt-[-6px]'/>
                </Tabs>
                <Button
                  color="secondary"
                  onClick={handleSaveFloorPlan}
                  className="text-white mt-3 mr-5 text-primary"
                >
                  <SaveIcon />
                  Guardar Plano
                </Button>
              </div>
              {sections[selectedSection]?.map((table) => (
                <DraggableTable
                  key={table.id}
                  table={table}
                  onDragStop={onDragStop}
                  onResizeStop={onResizeStop}
                  onClick={() => handleTableClick(table)}
                />
              ))}
              <div className="w-full h-[670px] flex justify-end  items-end">
                <Button
                  onClick={addNewTable}
                  className="mr-4 bg-primary text-white"
                >
                  <AddIcon />
                </Button>
              </div>
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
        onClose={handleClose}
        tableData={selectedTable}
        onSave={saveTableData}
        onDelete={deleteTable}
        onDuplicate={duplicateTable}
      />
    </div>
  );
};

export default FloorPlanEditor;
