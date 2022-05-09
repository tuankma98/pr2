import DashboardIcon from '@mui/icons-material/Dashboard';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ProfileNavbar() {
  const history = useHistory();

  const handleRedirectInformation = () => {
    history.push('/account');
  };

  const handleRedirectOrders = () => {
    history.push('/account/history');
  };

  const handleRedirectFavorite = () => {
    history.push('/account/favorite');
  };

  return (
    <List component="nav">
      <ListItemButton onClick={handleRedirectInformation}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Account information" />
      </ListItemButton>
      <ListItemButton onClick={handleRedirectOrders}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Order Management" />
      </ListItemButton>
      <ListItemButton onClick={handleRedirectFavorite}>
        <ListItemIcon>
          <SellIcon />
        </ListItemIcon>
        <ListItemText primary="Favorite product" />
      </ListItemButton>
    </List>
  );
}
