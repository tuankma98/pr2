import { Box } from '@mui/material';
import React from 'react';
import ListPage from './pages/ListPage';

function ProductFeature({ queryParams }) {
  return (
    <Box>
      <ListPage queryParams={queryParams} />
    </Box>
  );
}

export default ProductFeature;
