import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, MobileStepper, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTranslation } from 'react-i18next';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    title: 'Mừng mùng 8/3',
    imgPath: 'https://salt.tikicdn.com/cache/w1080/ts/banner/94/cf/b4/766682f22de3ebcf1376b1accf25b588.jpg.webp',
  },
  {
    title: 'Giảm giá 30%',
    imgPath: 'https://salt.tikicdn.com/cache/w1080/ts/banner/e8/c9/c8/ddf0217dc5c9187fa8d63d1912cb89c1.png.webp',
  },
  {
    title: 'Hàng mới sale mạnh',
    imgPath: 'https://salt.tikicdn.com/cache/w1080/ts/banner/12/8a/99/e787d397d170c7f3d9bbedf7fbfe3e53.jpg.webp',
  },
  {
    title: 'xyz',
    imgPath: 'https://salt.tikicdn.com/cache/w1080/ts/banner/f3/68/ba/68f9561396801afd2bbab5d5c0ef3539.jpg.webp',
  },
  {
    title: 'Mua 2 tặng 1',
    imgPath: 'https://salt.tikicdn.com/cache/w1080/ts/banner/f3/44/ce/eeac04827bc80391b353528d8c3f413b.jpg.webp',
  },
  {
    title: 'abc',
    imgPath: 'https://salt.tikicdn.com/cache/w1080/ts/banner/6a/52/53/a5979ccb33fde18451556e2237ff304a.png.webp',
  },
];

function ProductBanner() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 60,
          pl: 1,
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="h5">{t('Fashion')}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.title}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    </Box>
  );
}

export default ProductBanner;
