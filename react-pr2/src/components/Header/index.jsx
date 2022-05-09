import { Logout, PersonAdd, Settings, ShoppingCart } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import ShowMiniCart from '../../features/Cart/components/showMiniCart';
import { cartItemCountSelector } from '../../features/Cart/selectors';
import { toggleMiniCartClick } from '../../store/Slice/cartSlice';
import { logout, setOpen } from '../../store/Slice/userSlice';
import ToggleAuth from '../ToggleAuth';
import './index.scss';
import SeacrchInput from './SeacrchInput/index';

const useStyles = makeStyles({
  root: {},
  logoIcon: {
    marginRight: '90px',
  },
  header: {
    height: '100px',
  },
  account: {
    display: 'flex',
    alignItems: 'center',
  },
  miniCart: {
    position: 'absolute',
    top: '50px',
    right: '9px',
  },
  cart: {
    position: 'relative',
  },
});

export default function Header({ queryParams }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(cartItemCountSelector);
  const open = useSelector((state) => state.user.open);
  const showMiniCarts = useSelector((state) => state.cart.showMiniCart);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.role;

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangeLanguage = () => {
    if (language === 'en') {
      i18n.changeLanguage('vi');
      setLanguage('vi');
    } else {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      dispatch(setOpen(true));
    } else {
      history.push('/cart');
      dispatch(toggleMiniCartClick(false));
    }
  };

  const handleCartClose = () => {
    dispatch(toggleMiniCartClick(false));
  };

  const handleLogoClick = () => {
    history.push('/');
    dispatch(toggleMiniCartClick(false));
  };

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };

  const handleClickUser = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    const action = await logout();
    dispatch(action);
    history.push('/');
  };

  const handleMyAccount = () => {
    history.push('/account');
  };

  const handleAdmin = () => {
    history.push('/admin');
  };

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.header}>
            <Button onClick={handleLogoClick}>
              <Box className={classes.logoIcon}>
                <img src={logo} alt="logo" width="60px" height="40px" />
              </Box>
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <SeacrchInput queryParams={queryParams} />
            </Typography>
            <Box className={classes.account}>
              <Button color="inherit" onClick={handleChangeLanguage}>
                {t('en')}
                <LanguageIcon />
              </Button>
              {!isLoggedIn && (
                <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
                  {t('Login')}
                </Button>
              )}
              {isLoggedIn && (
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClickUser}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
            <Box className={classes.cart}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartItemsCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Box className={classes.miniCart}>{showMiniCarts && <ShowMiniCart onClose={handleCartClose} />}</Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ToggleAuth />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {loggedInUser.role !== 1 ? (
          <MenuItem onClick={handleMyAccount}>
            <Avatar /> {t('My Account')}
          </MenuItem>
        ) : null}
        {loggedInUser.role === 1 ? (
          <MenuItem onClick={handleAdmin}>
            <Avatar /> ADMIN
          </MenuItem>
        ) : null}
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          {t('Add another account')}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('Settings')}
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
}
