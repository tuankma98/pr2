import { Pagination } from '@mui/material';
import React from 'react';

function ProductPagination({ pagination = { page: 1, limit: 12, total: 12 }, onChange }) {
  const handlePageChange = (e, page) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <Pagination
      count={Math.ceil(pagination.total / pagination.limit)}
      page={pagination.page}
      color="primary"
      onChange={handlePageChange}
    ></Pagination>
  );
}

export default ProductPagination;
