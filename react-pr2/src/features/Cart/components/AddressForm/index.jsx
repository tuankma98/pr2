import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputField from '../../../../components/form-controls/InputField';
import { useHistory } from 'react-router-dom';
import { regex_phone } from '../../../../constants';
import StorageKeys from '../../../../constants/storage-keys';

function AddressForm(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const info = JSON.parse(localStorage.getItem('info'));
  const { fullName, phone } = JSON.parse(localStorage.getItem(StorageKeys.USER));

  const { onSubmit, activeStep, steps } = props;
  const schema = yup
    .object()
    .shape({
      fullname: yup
        .string()
        .required('Please enter your full name.')
        .test('Should has at least two words.', 'Please enter at least two words.', (value) => {
          return value.split(' ').length >= 2;
        }),
      phone: yup.string().required('Please enter your phone.').matches(regex_phone, 'Must be a valid phone number'),
      district: yup.string().required('Please enter district').min(3, 'district is too short!'),
      ward: yup.string().required('Please enter ward/commune').min(2, 'ward is too short!'),
      address: yup.string().required('Please enter address').min(3, 'address is too short!'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      fullname: info ? info.fullname : `${fullName}`,
      phone: info ? info.phone : `${phone}`,
      district: info ? info.district : '',
      ward: info ? info.ward : '',
      address: info ? info.address : '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    onSubmit && onSubmit(values);
  };

  const handleBackCart = () => {
    history.push('/cart');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {t('Shipping address')}
      <InputField name="fullname" label={`${t('Fullname')}`} form={form} disable />
      <InputField name="phone" label={`${t('Number Phone')}`} form={form} />
      <InputField name="district" label={`${t('District')}`} form={form} />
      <InputField name="ward" label={`${t('Ward')}`} form={form} />
      <InputField name="address" label={`${t('Address')}`} form={form} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleBackCart}>
          {t('BACK')}
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
          {activeStep === steps.length - 1 ? `${t('Place order')}` : `${t('NEXT')}`}
        </Button>
      </Box>
    </form>
  );
}

export default AddressForm;
