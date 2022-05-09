import { Box, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { categoryAPI } from '../../../store/Slice/categorySlice';
import { productAPI } from '../../../store/Slice/productSlice';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductSkeletonByFilters from '../components/Filters/ProductSkeletonByFilters';
import ProductBanner from '../components/ProductBanner';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductPagination from '../components/ProductPagination';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSoft from '../components/ProductSoft';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
    background: '#ffffff',
    borderRight: '1px solid #efefef',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
}));

function ListPage({ queryParams }) {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { data = [], pagination } = product;

  useEffect(() => {
    dispatch(productAPI(queryParams));
    dispatch(categoryAPI());
  }, [queryParams, dispatch]);

  const handlePageChange = (page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSoftChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _order: newSortValue,
      _page: 1,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
      _page: 1,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container>
          <ProductBanner />
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {isLoading ? (
                <>
                  <ProductSkeletonByFilters length={0} />
                  <ProductSkeletonByFilters length={0} width="100%" />
                  <ProductSkeletonList length={12} />
                </>
              ) : (
                <>
                  <ProductSoft currentSoft={queryParams._order} onChange={handleSoftChange} />
                  <FilterViewer filters={queryParams} onChange={setNewFilters} />
                  <ProductList data={data} />
                </>
              )}
              <Box className={classes.pagination}>
                <ProductPagination pagination={pagination} onChange={handlePageChange} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
