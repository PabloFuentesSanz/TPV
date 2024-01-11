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
import { useState } from 'react';

const ItemTable = ({
  items,
  onDelete,
  onDuplicate,
  onEdit,
  handleSearchChange,
}) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (itemId) => {
    onDelete(itemId);
  };

  const handleDuplicate = (item) => {
    onDuplicate(item);
  };

  return (
    <>
      <HeaderTable onSearchChange={handleSearchChange} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-slate-300 ">
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Alérgenos</TableCell>
              <TableCell>PVP</TableCell>
              <TableCell>Categorías</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
             items
             .slice(page * 5, page * 5 + 5)
             .map((item) => (
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
