import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Modal,
  Input,
  Button,
  Textarea,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Switch,
} from '@nextui-org/react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Box,
  Tooltip,
  SelectChangeEvent,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { allergenImages } from '../../utils/allergens';
import { unitConversions, units } from '../../utils/units';

interface AddItemModalProps {
  onClose: () => void;
  onSave: (item: Item) => void;
  isOpen: boolean;
  categories: Record<string, Category>;
  selectedItem?: Item;
  items: Item[];
}
const AddItemModal: React.FC<AddItemModalProps> = ({
  onClose,
  onSave,
  isOpen,
  categories,
  selectedItem,
  items,
}) => {
  const [itemName, setItemName] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isElaborate, setIsElaborate] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>([]);
  const [supplierPrice, setSupplierPrice] = useState<number>();
  const [supplierName, setSupplierName] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [reorderPoint, setReorderPoint] = useState<number>(0);
  const [unitOfMeasure, setUnitOfMeasure] = useState<string>('');
  const [salableItem, setSalableItem] = useState<boolean>(true);
  const [escandallo, setEscandallo] = useState<number>(0.0);
  useEffect(() => {
    if (selectedItem) {
      setItemName(selectedItem?.name);
      setItemDescription(selectedItem?.description);
      setSelectedCategories(selectedItem?.categories);
      setItemPrice(selectedItem?.price);
      setImagePreview(selectedItem?.imagePreview);
      setSelectedAllergens(selectedItem?.selectedAllergens);
      setIsElaborate(selectedItem?.isElaborate);
      setIngredients(selectedItem.ingredients);
      setSupplierPrice(selectedItem.supplierPrice);
      setSupplierName(selectedItem.supplierName);
      setStock(selectedItem.stock);
      setReorderPoint(selectedItem.reorderPoint);
      setUnitOfMeasure(selectedItem.unitOfMeasure);
      setSalableItem(selectedItem.salableItem);
    } else {
      setItemName('');
      setItemDescription('');
      setSelectedCategories([]);
      setItemPrice(0);
      setImagePreview(undefined);
      setSelectedAllergens([]);
      setIsElaborate(false);
      setIngredients([]);
      setSupplierPrice(undefined);
      setSupplierName('');
      setStock(0);
      setReorderPoint(0);
      setUnitOfMeasure('');
      setSalableItem(true);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      calculateCostOfProduction();
    }
  }, [ingredients]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('image')) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      setImagePreview(undefined);
      setImageFile(null);
    }
  };

  const handleSubmit = () => {
    const newItem: Item = {
      id: itemName,
      name: itemName,
      isElaborate: isElaborate,
      price: itemPrice, // Solo si está en la tpv
      supplierPrice: supplierPrice ?? 0.0, // Solo si es simple
      supplierName: supplierName, // Solo si es simple
      categories: selectedCategories,
      description: itemDescription,
      imageUrl: imagePreview ?? '',
      imagePreview: undefined,
      selectedAllergens,
      ingredients: ingredients, // Solo si es elaborado (ingredientes es un array de ingrediente, ingrediente tiene nombre, cantidad, medida, merma)
      stock: stock, // Solo si es simple
      reorderPoint: reorderPoint, // Solo si es simple
      unitOfMeasure: unitOfMeasure, // Solo si es simple
      salableItem: salableItem,
    };
    onSave(newItem);
    onClose();
  };

  const handleAllergenSelection = (allergen: string) => {
    setSelectedAllergens((prevSelected) => {
      if (prevSelected.includes(allergen)) {
        return prevSelected.filter((a) => a !== allergen);
      } else {
        return [...prevSelected, allergen];
      }
    });
  };

  const handleChangeCategories = (event: SelectChangeEvent<string[]>) => {
    setSelectedCategories(event.target.value as string[]);
  };

  const handleAddIngredientClick = () => {
    if (ingredients) {
      setIngredients([
        ...ingredients,
        { name: '', amount: 1, unit: 'unidades', merma: 0 },
      ]);
    }
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    if (ingredients) {
      const newIngredients = ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      );
      setIngredients(newIngredients);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const convertToPriceUnit = (
    amount: number,
    ingredientUnit: string,
    priceUnit: string
  ): number => {
    const conversionFunction = unitConversions[ingredientUnit];
    if (conversionFunction && ingredientUnit !== priceUnit) {
      return conversionFunction(amount);
    }
    return amount; // No se requiere conversión o no está definida
  };

  const calculateCostOfProduction = () => {
    if (ingredients) {
      let totalCost = 0;
      ingredients.forEach((ingredient) => {
        const ingredientData = items.find(
          (item) => item.name === ingredient.name
        );
        const convertedAmount = convertToPriceUnit(
          ingredient.amount,
          ingredient.unit,
          ingredientData?.unitOfMeasure ?? ''
        );
        const totalIngredientCost =
          (ingredientData?.supplierPrice || 0) * convertedAmount;
        const mermaAmount = totalIngredientCost * (ingredient.merma / 100);
        totalCost += totalIngredientCost - mermaAmount;
      });
      setEscandallo(parseFloat(totalCost.toFixed(2)));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} hideCloseButton size="5xl">
      <ModalContent style={{ height: '90vh', overflowY: 'auto' }}>
        <ModalHeader>
          <h3>{selectedItem ? 'Editar' : 'Añadir'} Artículo</h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-5">
            <FormControl margin="normal" className="w-1/3">
              <InputLabel id="tipo">Tipo de Producto</InputLabel>
              <Select
                labelId="tipo"
                value={isElaborate ? 'elaborado' : 'simple'}
                onChange={(e) => setIsElaborate(e.target.value === 'elaborado')}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Tipo de Producto"
                  />
                }
              >
                <MenuItem key="simple" value="simple">
                  Simple
                </MenuItem>
                <MenuItem key="elaborado" value="elaborado">
                  Elaborado
                </MenuItem>
              </Select>
            </FormControl>
            <Switch isSelected={salableItem} onValueChange={setSalableItem}>
              {salableItem
                ? 'Este artículo aparecerá en tu TPV'
                : 'Este artículo NO aparecerá en tu TPV'}
            </Switch>
          </div>

          <Input
            label="Nombre del Artículo"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          {!isElaborate ? (
            <>
              <div className="flex gap-5">
                <Input
                  type="number"
                  label="Precio de Compra al Proveedor (€)"
                  value={supplierPrice?.toString()}
                  onChange={(e) => setSupplierPrice(parseFloat(e.target.value))}
                />
                <Input
                  label="Proveedor"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                />
                {salableItem && (
                  <Input
                    label="Precio PVP (€)"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                  />
                )}
              </div>
              <div className="flex items-center justify-center gap-5">
                <Input
                  label="Stock Actual"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  min={0}
                />
                <Input
                  label="Punto de reorden"
                  type="number"
                  value={reorderPoint}
                  onChange={(e) => setReorderPoint(e.target.value)}
                  min={1}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="medida">Unidad de Medida</InputLabel>
                  <Select
                    labelId="medida"
                    value={unitOfMeasure}
                    onChange={(e) => setUnitOfMeasure(e.target.value)}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Unidad de Medida"
                      />
                    }
                  >
                    {units.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </>
          ) : (
            <Input
              label="Precio PVP (€)"
              onChange={(e) => setItemPrice(parseFloat(e.target.value))}
            />
          )}
          <div className="flex gap-5 items-center  w-full">
            <FormControl className="w-1/2" margin="normal">
              <InputLabel id="categories-label">Categorías</InputLabel>
              <Select
                labelId="categories-label"
                multiple
                value={selectedCategories}
                onChange={handleChangeCategories}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Categorías" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {Object.keys(categories).map((categoryName) => (
                  <MenuItem key={categoryName} value={categoryName}>
                    {categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {salableItem && (
              <FormControl className="w-1/2" margin="normal">
                <InputLabel id="printer-label">Impresoras</InputLabel>
                <Select
                  labelId="printer-label"
                  multiple
                  value={selectedCategories}
                  onChange={handleChangeCategories}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Impresoras"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {Object.keys(categories).map((categoryName) => (
                    <MenuItem key={categoryName} value={categoryName}>
                      {categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Textarea
              label="Descripción"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              minRows="6"
            />
            <div
              className="image-upload-container"
              style={{ textAlign: 'center', marginBottom: '15px' }}
            >
              <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                <div
                  style={{
                    width: '160px',
                    height: '160px',
                    border: '1px dashed black',
                    borderColor: '#bbb',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Previsualización"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      Imagen
                      <FileUploadIcon />
                    </div>
                  )}
                </div>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div>
            {Object.keys(allergenImages).map((allergen) => (
              <Tooltip key={allergen} title={allergen}>
                <div
                  key={allergen}
                  className={`allergen-image ${
                    selectedAllergens.includes(allergen) ? 'selected' : ''
                  }`}
                  onClick={() => handleAllergenSelection(allergen)}
                  style={{
                    cursor: 'pointer',
                    opacity: selectedAllergens.includes(allergen) ? '1' : '0.5',
                    display: 'inline-block',
                    margin: '5px',
                  }}
                >
                  <img
                    src={allergenImages[allergen]}
                    alt={allergen}
                    style={{ width: '50px', height: '50px' }}
                  />
                </div>
              </Tooltip>
            ))}
          </div>

          {isElaborate && (
            <>
              <div>
                {ingredients?.map((ingredient, index) => (
                  <div key={index} className="ingredient-row">
                    <div className="flex gap-5 justify-center items-center">
                      <div className="w-1/2">
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="ingrediente">Ingrediente</InputLabel>
                          <Select
                            labelId="ingrediente"
                            value={ingredient.name}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                'name',
                                e.target.value
                              )
                            }
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Ingrediente"
                              />
                            }
                          >
                            {items.map((item) => (
                              <MenuItem key={item.id} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <Input
                        type="number"
                        value={ingredient.amount.toString()}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            'amount',
                            parseFloat(e.target.value)
                          )
                        }
                        label="Cantidad"
                        className="w-1/4"
                        min={1}
                      />
                      <div className="w-1/4">
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="medida">Medida</InputLabel>
                          <Select
                            labelId="medida"
                            value={ingredient.unit}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                'unit',
                                e.target.value
                              )
                            }
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Medida"
                              />
                            }
                          >
                            {units.map((unit) => (
                              <MenuItem key={unit} value={unit}>
                                {unit}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <Input
                        type="number"
                        value={ingredient.merma.toString()}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            'merma',
                            parseFloat(e.target.value)
                          )
                        }
                        label="Merma (%)"
                        className="w-1/4"
                        min={0}
                      />
                      <CloseIcon
                        onClick={() => handleRemoveIngredient(index)}
                        className="cursor-pointer"
                      />{' '}
                    </div>
                  </div>
                ))}
                <Button onClick={handleAddIngredientClick}>
                  <AddIcon />
                  Añadir Ingrediente
                </Button>
              </div>
              <div className="ingredient-calculation">
                <h4>Costo de Producción: {escandallo} €</h4>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Cerrar
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemModal;
