import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';
import ProductSkeletonByFilters from './Filters/ProductSkeletonByFilters';

function ProductFilters({ filters, onChange }) {
  const isLoading = useSelector((state) => state.products.isLoading);

  const handleCategoryChange = (newCategory) => {
    if (!onChange) return;
    const newFilters = {
      categoryId: newCategory.id,
      'category.name': newCategory.name,
    };
    onChange(newFilters);
  };

  const handlePriceChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  const handleService = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <>
          <ProductSkeletonByFilters length={6} />
          <ProductSkeletonByFilters length={2} />
          <ProductSkeletonByFilters length={2} />
        </>
      ) : (
        <>
          <FilterByCategory onChange={handleCategoryChange} />
          <FilterByPrice onChange={handlePriceChange} />
          <FilterByService filters={filters} onChange={handleService} />
        </>
      )}
    </Box>
  );
}

export default ProductFilters;
