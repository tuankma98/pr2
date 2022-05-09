import { Box, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogin, updateInfoUser } from '../../../store/Slice/userSlice';
import InfomationForm from './InfomationForm';

function ProfileInfomation(props) {
  const dispatch = useDispatch();
  const {} = useSelector((state) => state.user.info);
  const { info, isLoading } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.current);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmitForm = async (values) => {
    const newInfo = { ...info, ...values };
    await dispatch(updateInfoUser(newInfo));
    dispatch(getUserLogin(user.id));

    enqueueSnackbar(`${t('Update successfully')}`, { variant: 'success' });
  };

  return (
    <Box>
      <Paper sx={{ padding: '16px' }}>
      {!isLoading && <InfomationForm onSubmit={handleSubmitForm} />}
      </Paper>
    </Box>
  );
}

export default ProfileInfomation;
