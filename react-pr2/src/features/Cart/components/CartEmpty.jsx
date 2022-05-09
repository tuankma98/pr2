import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import iconCart from '../../../assets/images/cart.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '40px',
  },
});

function CartEmpty(props) {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const handleCartClick = () => {
    history.push('/');
  };

  return (
    <Box className={classes.root}>
      <Box>
        <img src={iconCart} alt="cart" width="190px" />
      </Box>
      <Box component="p">{t('There are no products in your cart')}</Box>
      <Button variant="contained" onClick={handleCartClick}>
        {t('CONTINUE SHOPPING US PRODUCTS')}
      </Button>
    </Box>
  );
}

export default CartEmpty;
