// Comandas.jsx
import { useState, useEffect } from 'react';
import TableDisplay from '../Comandas/TableDisplay';
import { Tabs, Tab } from '@nextui-org/react';

const Comandas = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    // Simulación de fetch de la API
    const fetchData = async () => {
      // Reemplazar con el fetch real una vez que la API esté lista
      const mockData = [
        {
          sectionName: 'Terraza',
          tables: [
            {
              id: 'table-1704732441662',
              nombreMesa: 'M1',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 27.204299926757812,
                y: 48.709686279296875,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732453482',
              nombreMesa: 'M2',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 147.20428466796875,
                y: 48.279571533203125,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732457151',
              nombreMesa: 'M3',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 275.8064270019531,
                y: 50,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732461068',
              nombreMesa: 'M4',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 401.18280029296875,
                y: 50.645172119140625,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732481002',
              nombreMesa: 'M5',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 28.70965576171875,
                y: 201.8280029296875,
              },
              dimension: {
                width: 57,
                height: 62,
              },
            },
            {
              id: 'table-1704732496275',
              nombreMesa: 'M6',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 102.47309875488281,
                y: 202.47314453125,
              },
              dimension: {
                width: 57,
                height: 62,
              },
            },
            {
              id: 'table-1704732515798',
              nombreMesa: 'Barra',
              tipoMesa: 'muro',
              capacidad: null,
              position: {
                x: 25.05377197265625,
                y: 275.5914306640625,
              },
              dimension: {
                width: 559,
                height: 81,
              },
            },
          ],
        },
        {
          sectionName: 'Salón',
          tables: [
            {
              id: 'table-1704732529856-0.0008981670606467151',
              nombreMesa: 'M1',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 675.5914306640625,
                y: 425.05377197265625,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732529856-0.1530007326720153',
              nombreMesa: 'M2',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 897.7419738769531,
                y: 300.96775817871094,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732529856-0.21507669245787953',
              nombreMesa: 'M3',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 896.236572265625,
                y: 175.8064727783203,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732529856-0.9255508169674695',
              nombreMesa: 'M4',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 895.8065185546875,
                y: 49.569915771484375,
              },
              dimension: {
                width: 100,
                height: 100,
              },
            },
            {
              id: 'table-1704732529856-0.31127483598624783',
              nombreMesa: 'M5',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 614.731201171875,
                y: 135.16134643554688,
              },
              dimension: {
                width: 57,
                height: 62,
              },
            },
            {
              id: 'table-1704732529856-0.7245971086089422',
              nombreMesa: 'M6',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 615.3763580322266,
                y: 49.78495788574219,
              },
              dimension: {
                width: 57,
                height: 62,
              },
            },
            {
              id: 'table-1704732529856-0.5888179989637663',
              nombreMesa: 'Barra',
              tipoMesa: 'muro',
              capacidad: null,
              position: {
                x: 699.0645751953125,
                y: 48.3333740234375,
              },
              dimension: {
                width: 104,
                height: 277,
              },
            },
            {
              id: 'table-1704732547995',
              nombreMesa: 'Barra-lateral',
              tipoMesa: 'muro',
              capacidad: '',
              position: {
                x: 303.193603515625,
                y: 273.7097473144531,
              },
              dimension: {
                width: 500,
                height: 103,
              },
            },
            {
              id: 'table-1704732584143',
              nombreMesa: 'M7',
              tipoMesa: 'cuadrada',
              capacidad: '4',
              position: {
                x: 513.225830078125,
                y: 194.9462890625,
              },
              dimension: {
                width: 57,
                height: 62,
              },
            },
          ],
        },
      ];
      setSections(mockData);
      setSelectedSection(mockData[0]?.sectionName || '');
    };

    fetchData();
  }, []);

  const handleTableClick = (table) => {
    // Lógica para abrir comanda en la mesa seleccionada
    console.log('Abrir comanda para:', table.nombreMesa);
  };
  const containerStyles = {
    overflow: 'auto',
    maxWidth: '100%',
    maxHeight: '87vh',
    overflowX: 'auto',
    overflowY: 'auto',
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: '20px'
  };

  return (
    <div className="full-height flex justify-center items-center">
      <div style={containerStyles}>
        <div className="workspace">
          <Tabs value={selectedSection} onSelectionChange={setSelectedSection}>
            {sections.map((section) => (
              <Tab
                key={section.sectionName}
                value={section.sectionName}
                title={section.sectionName}
              />
            ))}
          </Tabs>

          {sections
            .filter((section) => section.sectionName === selectedSection)
            .flatMap((section) =>
              section.tables.map((table) => (
                <TableDisplay
                  key={table.id}
                  table={table}
                  onTableClick={handleTableClick}
                />
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default Comandas;
