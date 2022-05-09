import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import { addProductAdmin, getProductsAdmin } from '../../../store/Slice/adminSlice';
import { categoryAPI } from '../../../store/Slice/categorySlice';
import CategoryField from './form/CategoryField';
import CheckField from './form/CheckField';

const check = [
  {
    label: 'True',
    value: true,
  },
  {
    label: 'False',
    value: false,
  },
];

function CreateProducts(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const categories = useSelector((state) => state.categories.category);

  useEffect(() => {
    dispatch(categoryAPI());
  }, [dispatch]);

  const schema = yup
    .object()
    .shape({
      categoryId: yup.string().required('Please choose a category.'),
      images: yup.string().required('Please choose link images.'),
      name: yup.string().required('Please enter your name products.'),
      originalPrice: yup.string().required('Please enter price products.'),
      promotionPercent: yup.string().required('Please enter promotionPercent products .'),
      salePrice: yup.string().required('Please enter salePrice products.'),
      isFreeShip: yup.string().required('Please choose freeship.'),
      isPromotion: yup.string().required('Please choose promotion.'),
      description: yup.string().required('Please enter description.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      categoryId: '',
      images: '',
      name: '',
      originalPrice: '',
      promotionPercent: 0,
      salePrice: '',
      isFreeShip: '',
      isPromotion: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const newCategory = { ...values, images: [values.images] };
    await dispatch(addProductAdmin(newCategory));
    dispatch(getProductsAdmin());

    const { closeDialog } = props;
    if (closeDialog) {
      closeDialog();
    }
    enqueueSnackbar(`${t('Add successfully')}`, { variant: 'success' });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <CategoryField name="categoryId" label="Category" categories={categories} form={form} />
      <InputField name="images" label={`${t('Images')}`} form={form} />
      <InputField name="name" label={`${t('Name')}`} form={form} />
      <InputField name="originalPrice" label={`${t('OriginalPrice')}`} form={form} />
      <InputField name="promotionPercent" label={`${t('PromotionPercent')}`} form={form} />
      <InputField name="salePrice" label={`${t('salePrice')}`} form={form} />
      <CheckField name="isFreeShip" label={`${t('isFreeShip')}`} form={form} check={check} />
      <CheckField name="isPromotion" label={`${t('isPromotion')}`} form={form} check={check} />
      <InputField name="description" label={`${t('Description')}`} form={form} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
          {t('ADD PRODUCTS')}
        </Button>
      </Box>
    </form>
  );
}

export default CreateProducts;
