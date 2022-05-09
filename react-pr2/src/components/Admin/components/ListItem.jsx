import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

export default function MainListItems({ setName }) {
  const history = useHistory();

  const handleRedirectOrders = () => {
    history.push('/admin/orders');
    setName('ORDERS');
  };
  const handleRedirectDashboard = () => {
    history.push('/admin/dashboard');
    setName('DASHBOARD');
  };
  const handleRedirectProducts = () => {
    history.push('/admin/products');
    setName('PRODUCTS');
  };
  return (
    <List component="nav">
      <ListItemButton onClick={handleRedirectDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleRedirectOrders}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton onClick={handleRedirectProducts}>
        <ListItemIcon>
          <SellIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </List>
  );
}
