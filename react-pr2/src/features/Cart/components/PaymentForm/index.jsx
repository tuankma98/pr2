import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';

export default function PaymentForm({ activeStep, steps, handleBack, setActiveStep }) {
  const { t } = useTranslation();

  const handleBackAddress = () => {
    handleBack();
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t('Payment method')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label={`${t('Name on card')}`}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label={`${t('Card number')}`}
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label={`${t('Expiry date')}`}
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText={`${t('Last three digits on signature strip')}`}
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label={`${t('Remember credit card details for next time')}`}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button sx={{ mt: 3, ml: 1 }} variant="contained" onClick={handleBackAddress}>
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
