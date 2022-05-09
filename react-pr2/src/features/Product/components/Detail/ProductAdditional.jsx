import { Box, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '32px',
  },
  title: {
    color: blue[700],
    textDecoration: 'underline',
    paddingBottom: '24px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));

const ProductAdditional = (props) => {
  const classes = useStyles();
  const { product } = props;
  return (
    <Paper elevation={0} className={classes.root}>
      <Box>
        <Typography component="h4" className={classes.title}>
          Thông tin khuyến mãi
        </Typography>
      </Box>
      <Typography variant="body1">{`Miễn phí vận chuyển: ${product.isFreeShip ? 'CÓ' : 'KHÔNG'}`}</Typography>
      <Typography variant="body1">{`Khuyến mãi: ${product.isPromotion ? 'CÓ' : 'KHÔNG'}`}</Typography>
    </Paper>
  );
};

export default ProductAdditional;
