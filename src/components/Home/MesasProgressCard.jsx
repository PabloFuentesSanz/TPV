import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function MesasProgressCard({ mesasVacias, mesasOcupadas }) {
  const totalMesas = mesasVacias + mesasOcupadas;
  const porcentajeOcupadas =
    totalMesas === 0 ? 0 : (mesasOcupadas / totalMesas) * 100;

  return (
    <Card sx={{ width: '50%', p: 5, height: '20rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        TOTAL DE MESAS
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
        <CircularProgress
          variant="determinate"
          value={100} // Pista gris completa
          size={150}
          thickness={4}
          sx={{
            color: 'grey.300',
            position: 'absolute',
            zIndex: 0,
          }}
        />
        <CircularProgress
          variant="determinate"
          value={porcentajeOcupadas}
          size={150}
          thickness={4}
          sx={{
            color: 'primary.main',
            animationDuration: '550ms',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(porcentajeOcupadas)}%`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography>
          Mesas vacías {mesasVacias}/{totalMesas} (
          {((mesasVacias / totalMesas) * 100).toFixed(0)}%)
        </Typography>
        <Typography>
          Mesas ocupadas {mesasOcupadas}/{totalMesas} (
          {((mesasOcupadas / totalMesas) * 100).toFixed(0)}%)
        </Typography>
      </Box>
    </Card>
  );
}

export default MesasProgressCard;
