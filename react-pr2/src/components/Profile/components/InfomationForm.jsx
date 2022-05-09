import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Button, Dialog, DialogContent, IconButton, MenuItem, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import RadioField from './RadioField';
import UpdatePhone from './UpdatePhone';

const useStyles = makeStyles({
  root: {},
  avatar: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    flex: '1 1 0',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeBtn: {
    position: 'absolute',
    top: '5px',
    right: '15px',
    zIndex: 1,
  },
});

function InfomationForm(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const info = useSelector((state) => state.user.info);
  const [openUpdate, setOpenUpdate] = useState(false);

  const schema = yup.object().shape({}).required();

  const form = useForm({
    defaultValues: {
      fullName: info.fullName ? info.fullName : '',
      nickname: info.nickname ? info.nickname : '',
      gender: info.gender ? info.gender : 'female',
      district: info.district ? info.district : '',
      ward: info.ward ? info.ward : '',
      address: info.address ? info.address : '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    onSubmit && onSubmit(values);
  };

  const handleUpdatePhone = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '400px' }}>
        <Typography>Thông tin cá nhân</Typography>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Box className={classes.avatar}>
            <MenuItem>
              <Avatar sx={{ width: '60px', height: '60px' }} />
            </MenuItem>
            <Box className={classes.name}>
              <InputField name="fullName" label={`${t('FullName')}`} form={form} />
              <InputField name="nickname" label={`${t('Nickname')}`} form={form} />
            </Box>
          </Box>
          <RadioField name="gender" form={form} />
          <InputField name="ward" label={`${t('Ward')}`} form={form} />
          <InputField name="district" label={`${t('District')}`} form={form} />
          <InputField name="address" label={`${t('Address')}`} form={form} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
              LƯU THAY ĐỔI
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ borderLeft: '1px solid #ddd', paddingLeft: '24px', marginLeft: '24px', flex: '1 1 0' }}>
        <Typography marginBottom={2}>Số điện thoại và Email</Typography>
        <Box>
          <Box marginBottom={2} className={classes.info}>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <PhoneIcon />
              <Box>
                <Typography>Số điện thoại</Typography>
                <Typography>{info.phone}</Typography>
              </Box>
            </Box>
            <Button variant="outlined" onClick={handleUpdatePhone}>
              Cập nhập
            </Button>
            <Dialog
              disableEscapeKeyDown
              open={openUpdate}
              onClose={handleCloseUpdate}
              aria-labelledby="form-dialog-title"
            >
              <IconButton onClick={handleCloseUpdate}>
                <Close className={classes.closeBtn} sx={{ fontSize: '30px' }}></Close>
              </IconButton>
              <DialogContent>
                <UpdatePhone closeDialog={handleCloseUpdate} />
              </DialogContent>
            </Dialog>
          </Box>
          <Divider />
          <Box margin="16px 0" className={classes.info}>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <EmailIcon />
              <Typography>Địa chỉ Email:</Typography>
            </Box>
            <Typography>{info.email}</Typography>
          </Box>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
}

export default InfomationForm;
