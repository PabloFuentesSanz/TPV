export const units = ['mg', 'g', 'kg', 'ml', 'cl', 'litros', 'unidades'];

type ConversionFunction = (amount: number) => number;

interface UnitConversions {
  [key: string]: ConversionFunction;
}

export const unitConversions: UnitConversions = {
  mg: (amount) => amount / 1e6, // miligramos a kilogramos
  g: (amount) => amount / 1000, // gramos a kilogramos
  kg: (amount) => amount, // kilogramos a kilogramos
  ml: (amount) => amount / 1000, // mililitros a litros
  cl: (amount) => amount / 100, // centilitros a litros
  litros: (amount) => amount, // litros a litros
  unidades: (amount) => amount, // unidades a unidades (asumiendo que no se requiere conversión)
};
