import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddressForm from '../../Cart/components/AddressForm';
import PaymentForm from '../../Cart/components/PaymentForm';
import Review from '../../Cart/components/Review';

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  const steps = [`${t('Shipping address')}`, `${t('Payment details')}`, `${t('Review your order')}`];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm onSubmit={handleSubmit} activeStep={activeStep} steps={steps} />;
      case 1:
        return (
          <PaymentForm activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack} steps={steps} />
        );
      case 2:
        return <Review activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack} steps={steps} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleSubmit = (values) => {
    if (values) {
      setActiveStep(activeStep + 1);
    }
    localStorage.setItem('info', JSON.stringify(values));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          {t('Checkout')}
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          {activeStep === steps.length ? (
            <Box>
              <Typography variant="h5" gutterBottom>
                {t('Thank you for ordering from us.')}
              </Typography>
              <Typography variant="subtitle1">
                {`${t('Your order number is')} #abcxyz. ${t(
                  'We have emailed your order confirmation, and will send you an update when your order has shipped.'
                )}`}
              </Typography>
              <Button variant="contained" href="/" sx={{ width: '100%', marginTop: '32px' }}>
                {t('CONTINUE SHOPPING US PRODUCTS')}
              </Button>
            </Box>
          ) : (
            getStepContent(activeStep)
          )}
        </Box>
      </Paper>
    </Container>
  );
}
