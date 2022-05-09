import { Box, Button, TableBody } from '@mui/material';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from '../../../../utils/utils';
import { cartTotaltSelector } from '../../selectors';
import { useTranslation } from 'react-i18next';
import { TAX_RATE } from '../../constants';
import { orders } from '../../../../store/Slice/cartSlice';
import StorageKeys from '../../../../constants/storage-keys';
import { updateInfoUser } from '../../../../store/Slice/userSlice';

export default function Review({ activeStep, steps, handleBack, setActiveStep }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartTotal = useSelector(cartTotaltSelector);
  const SHIPPING_FEE = cartTotal > 0 ? 15000 : 0;
  const subTotal = cartTotal * TAX_RATE + cartTotal;
  const total = subTotal + SHIPPING_FEE;

  const { email, id } = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const info = JSON.parse(localStorage.getItem('info'));
  const { address, fullname, district, phone } = info;

  const cartItemLocalStorage = JSON.parse(localStorage.getItem('cart-list'));

  const payments = [
    { name: `${t('Card type')}`, detail: 'Visa' },
    { name: `${t('Card holder')}`, detail: 'NGUYEN ANH TUAN' },
    { name: `${t('Card number')}`, detail: 'xxxx-xxxx-xxxx-1234' },
    { name: `${t('Expiry date')}`, detail: '04/2024' },
  ];

  const handleBackPayment = () => {
    handleBack();
  };

  const handleNext = () => {
    const newInfo = { ...info, status: 'Pending', email };
    const showInfo = { ...info, email, id };
    const action = {
      cart: [...cartItemLocalStorage],
      ...newInfo,
      total,
    };
    dispatch(orders(action));
    dispatch(updateInfoUser(showInfo));
    localStorage.removeItem('cart-list');
    localStorage.removeItem('info');
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t('Order')}
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} align="center" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
              {t('Payment')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>{`${t('Subtotal')}:`}</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              {formatPrice(subTotal)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>{`${t('Shipping Free')}:`}</TableCell>

            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              {formatPrice(SHIPPING_FEE)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} sx={{ borderBottom: 'none', paddingBottom: 0 }}>
              {`${t('Total')}:`}
            </TableCell>
            <TableCell
              align="right"
              sx={{
                borderBottom: 'none',
                paddingBottom: 0,
                color: `${red[400]}`,
                fontSize: '22px',
              }}
            >
              {formatPrice(total)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right" sx={{ paddingTop: 0, fontSize: '12px', color: '#333333' }}>
              {`(${t('Đã bao gồm VAT nếu có')})`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t('Shipping')}
          </Typography>
          <Typography gutterBottom>{`${t('Fullname')}: ${fullname}`}</Typography>
          <Typography gutterBottom>{`${t('Number Phone')}: ${phone}`}</Typography>
          <Typography gutterBottom>{`${t('Address')}: ${address}, ${district} `}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t('Payment details')}
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button sx={{ mt: 3, ml: 1 }} variant="contained" onClick={handleBackPayment}>
            {t('BACK')}
          </Button>
        )}
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleNext}>
          {activeStep === steps.length - 1 ? `${t('Place order')}` : `${t('NEXT')}`}
        </Button>
      </Box>
    </>
  );
}
