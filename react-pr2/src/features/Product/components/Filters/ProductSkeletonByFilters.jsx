import { Box, Grid, Skeleton, Stack } from '@mui/material';
import React from 'react';

function ProductSkeletonByFilters({ length, width = '70%' }) {
  return (
    <Box>
      <Stack padding={2}>
        <Grid item mb={2}>
          <Skeleton variant="subtitle2" width={width} />
        </Grid>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} mb={1.5}>
            <Box>
              <Skeleton width="50%" />
            </Box>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
}

export default ProductSkeletonByFilters;
