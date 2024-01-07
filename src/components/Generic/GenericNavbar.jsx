import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import logo from '../../assets/img/logo.png';

function GenericNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Esto navegará hacia atrás en el historial del navegador
  };

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="border-b-1 h-[63px]"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarItem>
          <Sidebar />
        </NavbarItem>
        {/*<NavbarItem>
          <Button onClick={goBack}>
            <ArrowBackIosIcon />
          </Button>
  </NavbarItem>*/}
        <NavbarBrand>
          <img src={logo} alt="Logotipo de Anfitrión" className="h-20"  onClick={goBack}/>{' '}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="secondary"
            onClick={() => navigate('/floorplan-editor')}
          >
            <MapIcon /> Editar Plano
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default GenericNavbar;
