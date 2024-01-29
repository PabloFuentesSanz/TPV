import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  LinearProgress,
} from '@mui/material';
import Typography from '@mui/material/Typography';

interface CategoriesTableProps {
  categories: Categories;
  calculatePercentage: (category: string) => number;
}

function CategoriesTable({
  categories,
  calculatePercentage,
}: CategoriesTableProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" gutterBottom className="pt-3 pl-3">
          Categorías
        </Typography>
        <Table>
          <TableBody>
            {Object.keys(categories).length > 0 ? (
              Object.keys(categories).map((category) => (
                <TableRow key={category}>
                  <TableCell>
                    <Typography variant="subtitle1">{`${category} (${categories[category].items.length})`}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <LinearProgress
                      variant="determinate"
                      value={calculatePercentage(category)}
                      className="w-[200px] p-2"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{ textAlign: 'center', padding: '5em' }}
                >
                  <p>No hay ninguna categoría creada.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CategoriesTable;
