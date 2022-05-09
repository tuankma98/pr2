import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
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

function OrdersEmpty(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.root}>
      <Box>
        <img src={iconCart} alt="cart" width="190px" />
      </Box>
      <Box component="p">{t('There are no products in orders')}</Box>
    </Box>
  );
}

export default OrdersEmpty;
