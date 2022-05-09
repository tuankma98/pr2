import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../features/Auth/Login';
import Register from '../../features/Auth/Register';
import { setOpen } from '../../store/Slice/userSlice';

const useStyles = makeStyles({
  closeBtn: {
    position: 'absolute',
    top: '5px',
    right: '15px',
    zIndex: 1,
  },
});

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

function ToggleAuth() {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [mode, setMode] = useState(MODE.LOGIN);
  const open = useSelector((state) => state.user.open);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <IconButton onClick={handleClose}>
        <Close className={classes.closeBtn} sx={{ fontSize: '30px' }}></Close>
      </IconButton>
      <DialogContent>
        {mode === MODE.REGISTER && (
          <>
            <Register closeDialog={handleClose} />
            <Box textAlign="center">
              <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                {t('Already an account. Login here')}
              </Button>
            </Box>
          </>
        )}
        {mode === MODE.LOGIN && (
          <>
            <Login closeDialog={handleClose}></Login>
            <Box textAlign="center">
              <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                {t("Don't have an account. Register here")}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ToggleAuth;
