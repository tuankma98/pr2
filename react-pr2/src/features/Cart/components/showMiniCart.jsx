import { Close } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMiniCartClick } from '../../../store/Slice/cartSlice';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    minWidth: '300px',
    minHeight: '100px',
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    padding: '8px',
    position: 'relative',
    borderRadius: '5px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    zIndex: 1,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-16px',
      right: '6px',
      borderStyle: 'solid',
      borderWidth: '8px 10px',
      borderColor: 'transparent transparent white transparent',
    },
  },
  message: {
    textAlign: 'center',
    paddingBottom: '16px',
  },
  action: {
    display: 'inline-block',
    padding: 0,
    margin: '0 auto',
  },
  closeBtn: {
    zIndex: 1,
    position: 'absolute',
    top: '8px',
    right: '8px',
    fontSize: '20px',
    cursor: 'pointer',
    opacity: '0.5',
  },
});

const ShowMiniCart = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { onClose } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };

  const handleBtn = () => {
    history.push('/cart');
    dispatch(toggleMiniCartClick(false));
  };

  return (
    <div>
      <Box className={classes.root}>
        <Box className={classes.message}>{t('Add to cart successfully!')}</Box>
        <Box className={classes.action}>
          <Button color="secondary" size="small" variant="contained" onClick={handleBtn}>
            {t('View cart and checkout')}
          </Button>
        </Box>
        <Close onClick={handleClose} className={classes.closeBtn} />
      </Box>
    </div>
  );
};

export default ShowMiniCart;
