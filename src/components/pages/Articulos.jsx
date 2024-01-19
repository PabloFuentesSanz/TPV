import { useState, useEffect } from 'react';
import ItemTable from '../Articulos/ItemTable';
import AddItemModal from '../Articulos/AddItemModal';
import { Button } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import CategoriesTable from '../Articulos/CategoriesTable';
import AddCategoryModal from '../Articulos/AddCategoryModal';
import { mockedIngredients } from '../../mocks/mockedIngredients';
import { mockedMenu } from '../../mocks/mockedMenu';
import { mockedCategories } from '../../mocks/mockedCategories';

const Articulos = () => {
  const [items, setItems] = useState(mockedIngredients.concat(mockedMenu));
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState(mockedCategories);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Aquí iría la lógica para cargar los artículos desde la base de datos
  }, []);

  useEffect(() => {
    updateCategoriesState();
  }, [items]);

  const updateCategoriesState = () => {
    const newCategoriesState = { ...categories };

    Object.keys(categories).forEach((category) => {
      newCategoriesState[category] = {
        ...newCategoriesState[category],
        items: items
          .filter((item) => item.categories.includes(category))
          .map((item) => item.id),
      };
    });

    setCategories(newCategoriesState);
  };

  const handleAddItem = (newItem) => {
    if (selectedItem) {
      // Editar artículo existente
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id ? { ...item, ...newItem } : item
        )
      );
    } else {
      // Añadir nuevo artículo
      newItem.id = Date.now().toString();
      setItems((prevItems) => [...prevItems, newItem]);
    }

    setSelectedItem(null);
  };

  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [newCategory.name]: {
        id: newCategory.id,
        items: [],
        description: newCategory.description,
      },
    }));
    setShowCategoryModal(false);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowItemModal(false);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleDuplicateItem = (itemToDuplicate) => {
    const duplicatedItem = {
      ...itemToDuplicate,
      id: itemToDuplicate.id + '-copia',
      name: itemToDuplicate.name + ' -copia',
    };

    setItems((prevItems) => [...prevItems, duplicatedItem]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const calculatePercentage = (category) => {
    const totalItems = items.length;
    const itemsInCategory = categories[category].items.length;
    return (itemsInCategory / totalItems) * 100;
  };

  return (
    <div>
      <div className="flex w-full justify-end p-3 gap-3">
        <Button color="secondary" className='text-primary' onClick={() => setShowItemModal(true)}>
          <AddIcon /> Añadir Artículo
        </Button>
        <Button color="secondary" className='text-primary' onClick={() => setShowCategoryModal(true)}>
          <AddIcon /> Añadir Categoría
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[90vw] bg-white p-5 rounded-md">
          <ItemTable
            items={items.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onDuplicate={handleDuplicateItem}
            handleSearchChange={handleSearchChange}
          />
          <div className="w.full flex justify-end">
            <div className="w-2/6 mt-5">
              <CategoriesTable
                categories={categories}
                calculatePercentage={calculatePercentage}
              />
            </div>
          </div>
        </div>
      </div>
      {showItemModal && (
        <AddItemModal
          isOpen={showItemModal}
          onClose={handleCloseModal}
          onSave={handleAddItem}
          categories={categories}
          selectedItem={selectedItem}
          items={items}
        />
      )}
      {showCategoryModal && (
        <AddCategoryModal
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onSave={handleAddCategory}
        />
      )}
    </div>
  );
};

export default Articulos;
