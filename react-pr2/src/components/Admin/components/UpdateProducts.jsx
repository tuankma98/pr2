import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import { getProductsAdmin, updateProductsAdmin } from '../../../store/Slice/adminSlice';
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

function UpdateProducts(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const productItem = useSelector((state) => state.admin.productItemAdmin);

  const schema = yup
    .object()
    .shape({
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
      images: `${productItem.images[0]}`,
      name: `${productItem.name}`,
      originalPrice: `${productItem.originalPrice}`,
      promotionPercent: `${productItem.promotionPercent}`,
      salePrice: `${productItem.salePrice}`,
      isFreeShip: `${productItem.isFreeShip}`,
      isPromotion: `${productItem.isPromotion}`,
      description: `${productItem.description}`,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const newUpdate = { ...values, id: productItem.id, images: [values.images] };
    await dispatch(updateProductsAdmin(newUpdate));
    dispatch(getProductsAdmin());

    const { closeDialog } = props;
    if (closeDialog) {
      closeDialog();
    }
    enqueueSnackbar(`${t('Update successfully')}`, { variant: 'success' });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
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
          {t('UPDATE PRODUCTS')}
        </Button>
      </Box>
    </form>
  );
}

export default UpdateProducts;
