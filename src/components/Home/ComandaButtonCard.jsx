import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'; // Ícono para comandas
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom

function ComandaButtonCard() {
  const navigate = useNavigate();

  const goToComandas = () => {
    navigate('/comandas'); // Ruta a la página de comandas
  };

  return (
    <Card className='w-1/2 flex justify-center items-center'>
      <CardActionArea onClick={goToComandas}>
        <CardContent className='text-center'>
          <RestaurantMenuIcon sx={{ fontSize: 120 }} />
          <Typography gutterBottom variant="h5" component="div">
            Comandas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accede a la gestión de comandas.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ComandaButtonCard;
