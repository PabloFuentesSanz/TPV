import { useState, useEffect } from 'react';
import {
  Modal,
  Input,
  Button,
  Textarea,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';
import { allergenImages } from '../../utils/allergens';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Tooltip } from '@mui/material';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Box,
} from '@mui/material';

const AddItemModal = ({ onClose, onSave, isOpen, categories, selectedItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [itemPrice, setItemPrice] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  
  const handleChangeCategories = (event) => {
    setSelectedCategories(event.target.value);
  };

  useEffect(() => {
    if (selectedItem) {
      setItemName(selectedItem?.name);
      setItemDescription(selectedItem?.description);
      setSelectedCategories(selectedItem?.categories);
      setItemPrice(selectedItem?.price);
      setImagePreview(selectedItem?.imagePreview);
      setSelectedAllergens(selectedItem?.selectedAllergens);
    }else{
      setItemName('');
      setItemDescription('');
      setSelectedCategories([]);
      setItemPrice('');
      setImagePreview(null);
      setSelectedAllergens([]);
    }
    
  }, [selectedItem]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleSubmit = () => {
    const newItem = {
      id:itemName,
      name: itemName,
      description: itemDescription,
      categories: selectedCategories,
      price: itemPrice,
      selectedAllergens,
      imageUrl: imagePreview,
    };
    onSave(newItem);
    onClose();
  };
  const handleAllergenSelection = (allergen) => {
    setSelectedAllergens((prevSelected) => {
      if (prevSelected.includes(allergen)) {
        // Si ya está seleccionado, lo quitamos
        return prevSelected.filter((a) => a !== allergen);
      } else {
        // Si no está seleccionado, lo añadimos
        return [...prevSelected, allergen];
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={()=>{}} hideCloseButton size="xl">
      <ModalContent>
        <ModalHeader>
          <h3>Añadir Artículo</h3>

        </ModalHeader>
        <ModalBody>
          <Input
            label="Nombre del Artículo"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          
            <Input
              label="Precio PVP (€)"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
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
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={onClose}>
            Cerrar
          </Button>
          <Button auto onClick={handleSubmit}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemModal;
