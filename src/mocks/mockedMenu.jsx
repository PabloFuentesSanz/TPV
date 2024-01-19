export const mockedMenu = [
    {
      id: 'prod-001',
      name: 'Pizza Margarita',
      isElaborate: true,
      price: 8.00, // Precio de venta al público
      categories: ['Comidas'],
      description: 'Pizza Margarita con salsa de tomate casera, mozzarella y albahaca',
      imageUrl: '',
      selectedAllergens: [],
      ingredients: [
        { name: 'Harina de Trigo', amount: 300, unit: 'g', merma: 0 },
        { name: 'Tomate', amount: 200, unit: 'g', merma: 10 },
        { name: 'Queso Mozzarella', amount: 150, unit: 'g', merma: 0 },
        { name: 'Aceite de Oliva', amount: 20, unit: 'ml', merma: 0 },
        { name: 'Sal', amount: 5, unit: 'g', merma: 0 }
      ],
      stock: 0, // No aplicable para producto elaborado
      reorderPoint: 0, // No aplicable para producto elaborado
      unitOfMeasure: '', // No aplicable para producto elaborado
      salableItem: true
    },
    {
      id: 'prod-002',
      name: 'Ensalada César',
      isElaborate: true,
      price: 6.50, // Precio de venta al público
      categories: ['Ensaladas'],
      description: 'Ensalada César con lechuga romana, pechuga de pollo, crutones y aderezo César',
      imageUrl: '',
      selectedAllergens: [],
      ingredients: [
        { name: 'Lechuga Romana', amount: 100, unit: 'g', merma: 5 },
        { name: 'Pechuga de Pollo', amount: 150, unit: 'g', merma: 0 },
        { name: 'Pan', amount: 50, unit: 'g', merma: 0 },
        { name: 'Aceite de Oliva', amount: 10, unit: 'ml', merma: 0 },
        { name: 'Queso Parmesano', amount: 30, unit: 'g', merma: 0 }
      ],
      stock: 0, // No aplicable para producto elaborado
      reorderPoint: 0, // No aplicable para producto elaborado
      unitOfMeasure: '', // No aplicable para producto elaborado
      salableItem: true
    }
  ];
  