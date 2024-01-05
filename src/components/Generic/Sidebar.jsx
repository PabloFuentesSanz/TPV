import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemIcon } from '@mui/material';
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <div style={{ padding: '16px' }}>
          <Typography variant="h6" noWrap>
            Tu Casa Comidas y Bebidas
          </Typography>
          <Typography
            variant="body2"
            noWrap
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <PlaceIcon style={{ marginRight: '4px' }} /> C/ Quintana 22
          </Typography>
        </div>
        <List>
          {/* Botón Inicio que redirige a Home */}
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </Link>
          {/* Otros elementos */}
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Ajustes" />
          </ListItem>
          {/* Agrega más elementos según sea necesario */}
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
