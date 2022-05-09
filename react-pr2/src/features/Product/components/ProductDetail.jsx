import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { formatPrice } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '16px',
    borderBottom: `1px solid ${grey[200]}`,
  },
  description: {
    margin: '16px 0',
  },
  priceBox: {
    padding: '16px',
    backgroundColor: grey[50],
  },
  salePrice: {
    marginRight: '8px',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: '8px',
    fontSize: '15px',
    textDecoration: 'line-through',
  },
  promotionPercent: {},
}));

function ProductDetail({ name, shortDescription, salePrice, originalPrice, promotionPercent }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {`-${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
export default ProductDetail;
