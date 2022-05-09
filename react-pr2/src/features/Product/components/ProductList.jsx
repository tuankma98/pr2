import { Box, Grid } from '@mui/material';
import React from 'react';
import Product from './Product';

function ProductList({ data }) {
  return (
    <Box>
      <Grid container spacing={0}>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
