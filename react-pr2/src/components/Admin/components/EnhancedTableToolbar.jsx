import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Dialog, DialogContent } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteItemAdmin, getProductsAdmin } from '../../../store/Slice/adminSlice';

function EnhancedTableToolbar({ numSelected, selected }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleConfirmDelete = () => {
    setOpen(true);
  };

  const handleCloseDelete = () => {
    setOpen(false);
  };

  const handleDeleteSelectItem = (selected) => {
    setOpen(false);
    selected.forEach((item) => {
      dispatch(deleteItemAdmin(item));
    });
    dispatch(getProductsAdmin());
    enqueueSnackbar(`${t('Delete successfully')}`, { variant: 'success' });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} {t('Selected')}
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {t('CART')}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title={t('Delete')}>
            <IconButton onClick={handleConfirmDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={open}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Do you confirm product deletion?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"></DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Disagree</Button>
              <Button onClick={() => handleDeleteSelectItem(selected)} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Tooltip title={t('Filter list')}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
