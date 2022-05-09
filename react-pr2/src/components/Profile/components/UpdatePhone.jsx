import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import { regex_phone } from '../../../constants';
import { getUserLogin, updateInfoUser } from '../../../store/Slice/userSlice';

function UpdatePhone(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const info = useSelector((state) => state.user.info);

  const schema = yup
    .object()
    .shape({
      phone: yup.string().required('Please enter your phone.').matches(regex_phone, 'Must be a valid phone number'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      phone: info.phone,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const newInfo = { ...info, ...values };
    await dispatch(updateInfoUser(newInfo));
    dispatch(getUserLogin(info.id));

    const { closeDialog } = props;
    if (closeDialog) {
      closeDialog();
    }
    enqueueSnackbar(`${t('Update successfully')}`, { variant: 'success' });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <InputField name="phone" label={t('Number Phone')} form={form} />
        <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
          {t('SAVE')}
        </Button>
      </Box>
    </form>
  );
}

export default UpdatePhone;
