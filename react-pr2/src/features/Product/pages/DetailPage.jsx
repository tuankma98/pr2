import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, LinearProgress, Paper, Tab } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { productApiId } from '../../../store/Slice/productDetailSlice';
import AddToCartForm from '../components/Detail/AddToCartForm';
import DetailBreadcrumb from '../components/Detail/DetailBreadcrumb';
import ProductAdditional from '../components/Detail/ProductAdditional';
import ProductDescription from '../components/Detail/ProductDescription';
import ProductReviews from '../components/Detail/ProductReviews';
import ProductThumbnail from '../components/Detail/ProductThumbnail';
import ProductSkeletonByFilters from '../components/Filters/ProductSkeletonByFilters';
import ProductDetail from '../components/ProductDetail';
import { setAddToCart, toggleMiniCartClick } from '../../../store/Slice/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: '12px',
    borderRight: `1px solid ${grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: '12px',
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const [value, setValue] = useState('1');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    params: { productId },
  } = useRouteMatch();

  const { productDetail, isLoading } = useSelector((state) => state.productDetail);
  const product = productDetail[productId];

  useEffect(() => {
    if (!product) {
      dispatch(productApiId(productId));
    }
  }, [product, productId, dispatch]);

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = setAddToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
    dispatch(toggleMiniCartClick(true));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Container>
        {isLoading ? <ProductSkeletonByFilters length={1} /> : <DetailBreadcrumb {...product} />}
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              {isLoading ? (
                <Box className={classes.loading}>
                  <LinearProgress />
                </Box>
              ) : (
                <ProductThumbnail product={product} />
              )}
            </Grid>
            <Grid item className={classes.right}>
              <ProductDetail {...product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <TabContext value={value}>
          <Box sx={{ marginTop: '16px', borderColor: 'divider' }} className={classes.tabs}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={t('Description')} value="1" />
              <Tab label={t('Additional Infomation')} value="2" />
              <Tab label={t('Reviews')} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ProductDescription product={product} />
          </TabPanel>
          <TabPanel value="2">
            <ProductAdditional product={product} />
          </TabPanel>
          <TabPanel value="3">
            <ProductReviews />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
}

export default DetailPage;
