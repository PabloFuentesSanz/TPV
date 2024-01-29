interface Item {
    id: string;
    name: string;
    description: string;
    categories: string[];
    price: number;
    imagePreview?: string;
    selectedAllergens: string[];
    isElaborate: boolean;
    ingredients?: Ingredient[];
    supplierPrice: number;
    supplierName: string;
    imageUrl: string;
    stock: number;
    reorderPoint: number;
    unitOfMeasure: string;
    salableItem: boolean;
  }