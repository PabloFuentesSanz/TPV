interface Table {
    id: string;
    nombreMesa: string;
    tipoMesa: string; // Este debería ser un tipo más específico, como 'muro' | 'otroTipo' | ...
    capacidad?: number | null; // Hacerlo opcional para mesas de tipo 'muro' que no tienen capacidad
    position: { x: number; y: number };
    dimension: { width: number; height: number };
  }

  interface Sections {
    [key: string]: Table[];
  }
  
  interface Section {
    sectionName: string;
    tables: Table[]
  }