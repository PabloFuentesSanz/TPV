/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Box,
  Chip,
  TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { allergenImages } from '../../utils/allergens';
import HeaderTable from './HeaderTable';
import React, { ChangeEvent, useState } from 'react';
import { Switch } from '@nextui-org/react';

interface ItemTableProps {
  items: Item[];
  onDelete: (itemId: string) => void;
  onDuplicate: (item: Item) => void;
  onEdit: (item: Item) => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({
  items,
  onDelete,
  onDuplicate,
  onEdit,
  handleSearchChange,
}) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = (itemId: string) => {
    onDelete(itemId);
  };

  const handleDuplicate = (item: Item) => {
    onDuplicate(item);
  };

  return (
    <>
      <HeaderTable onSearchChange={handleSearchChange} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-primary">
            <TableRow>
              <TableCell>
                <div className="text-white">Imagen</div>
              </TableCell>
              <TableCell>
                <div className="text-white">Nombre</div>
              </TableCell>
              <TableCell>
                <div className="text-white">Alérgenos</div>
              </TableCell>
              <TableCell>
                <div className="text-white">PVP</div>
              </TableCell>
              <TableCell>
                <div className="text-white">Categorías</div>
              </TableCell>
              <TableCell>
                <div className="text-white">En Venta</div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.slice(page * 5, page * 5 + 5).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.imageUrl || 'No img'}
                      alt={`${item.name} img`}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {item.selectedAllergens.map((allergen) => (
                        <Tooltip title={allergen} key={allergen}>
                          <img
                            key={allergen}
                            src={allergenImages[allergen]}
                            alt={allergen}
                            style={{
                              width: '30px',
                              height: '30px',
                              marginRight: '5px',
                            }}
                          />
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{`${item.price} €`}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {Object.keys(item.categories).map((categoryName) => {
                        return (
                          <Chip
                            key={item.categories[categoryName]}
                            label={item.categories[categoryName]}
                          />
                        );
                      })}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Switch isDisabled isSelected={item.salableItem} />
                  </TableCell>
                  <TableCell>
                    <div className="flex content-between gap-4">
                      <Tooltip title="Copiar">
                        <ContentCopyIcon
                          onClick={() => handleDuplicate(item)}
                          className="cursor-pointer text-slate-500"
                        />
                      </Tooltip>
                      <Tooltip title="Editar">
                        <EditIcon
                          onClick={() => onEdit(item)}
                          className="cursor-pointer text-slate-500"
                        />
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <DeleteIcon
                          onClick={() => handleDelete(item.id)}
                          className="cursor-pointer text-slate-500"
                        />
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{ textAlign: 'center', padding: '5em' }}
                >
                  <p>Por el momento no hay ningún artículo creado.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={items.length}
        rowsPerPage={5}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default ItemTable;
