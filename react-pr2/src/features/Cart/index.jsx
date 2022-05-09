import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container, Grid, Dialog, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromCart } from '../../store/Slice/cartSlice';
import { formatPrice, thumbnailURL } from '../../utils/utils';
import CartBreadcrumb from './components/CartBreadcrumb';
import CartEmpty from './components/CartEmpty';
import EnhancedTableHead from './components/EnhancedTableHead';
import EnhancedTableToolbar from './components/EnhancedTableToolbar';
import Quantity from './components/Quantity';
import './index.scss';
import { cartItemCountSelector, cartItemSelector, cartTotaltSelector } from './selectors';
import { TAX_RATE } from './constants';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {},
  salePrice: {
    marginRight: '8px',
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: '8px',
    fontSize: '12px',
    textDecoration: 'line-through',
  },
  thumbnail: {
    display: 'flex',
    alignItems: 'center',
  },
  totalItem: {
    color: red[400],
  },
  left: {
    flex: '1 1 0',
  },
  right: {
    width: '350px',
  },
}));

export default function CartFeature() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const cartItemsCount = useSelector(cartItemCountSelector);
  const cartItems = useSelector(cartItemSelector);

  const cartTotal = useSelector(cartTotaltSelector);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cartItems.map(({ product }) => product.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleConfirmDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleItem = async (id) => {
    setOpen(false);
    dispatch(removeFromCart(id));
    enqueueSnackbar(`${t('Delete successfully')}`, { variant: 'success' });
  };

  const handleBtn = () => {
    history.push('/checkout');
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const invoiceTaxes = TAX_RATE * cartTotal;
  const total = cartTotal + invoiceTaxes;

  return (
    <Box sx={{ width: '100%' }}>
      <Container>
        <CartBreadcrumb />
        <Grid container>
          <Grid item className={classes.left}>
            <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
              {cartItemsCount > 0 ? (
                <>
                  <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
                  <Box>
                    <TableContainer>
                      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead
                          numSelected={selected.length}
                          onSelectAllClick={handleSelectAllClick}
                          rowCount={cartItems.length}
                        />
                        <TableBody>
                          {cartItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            const { product, quantity } = row;
                            const { salePrice, originalPrice, promotionPercent, name, images, id } = product;
                            const isItemSelected = isSelected(id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    onClick={(event) => handleClick(event, id)}
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      'aria-labelledby': labelId,
                                    }}
                                  />
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                  <Box className={classes.thumbnail}>
                                    <img src={thumbnailURL(images[0])} alt={name} width="80px" />
                                    <Box ml={2}>{name}</Box>
                                  </Box>
                                </TableCell>
                                <TableCell align="left">
                                  <Box>
                                    <Box component="span" className={classes.salePrice}>
                                      {formatPrice(salePrice)}
                                    </Box>
                                    {promotionPercent > 0 && (
                                      <Box component="span" className={classes.originalPrice}>
                                        {formatPrice(originalPrice)}
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Quantity id={id} quantity={quantity} />
                                </TableCell>
                                <TableCell align="center">
                                  <Box component="span" className={classes.totalItem}>
                                    {formatPrice(salePrice * quantity)}
                                  </Box>
                                </TableCell>
                                <TableCell align="right">
                                  <Tooltip title={t('Delete')}>
                                    <IconButton onClick={handleConfirmDelete}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <div>
                                    <Dialog
                                      open={open}
                                      onClose={handleClose}
                                      aria-labelledby="alert-dialog-title"
                                      aria-describedby="alert-dialog-description"
                                    >
                                      <DialogTitle id="alert-dialog-title">
                                        {'Do you confirm product deletion?'}
                                      </DialogTitle>
                                      <DialogContent>
                                        <DialogContentText id="alert-dialog-description"></DialogContentText>
                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={handleClose}>Disagree</Button>
                                        <Button onClick={() => handleDeleItem(id)} autoFocus>
                                          Agree
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={cartItems.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Box>
                </>
              ) : (
                <CartEmpty />
              )}
            </Paper>
          </Grid>

          {cartItemsCount > 0 ? (
            <Grid item className={classes.right}>
              <Paper elevation={0} sx={{ marginLeft: '32px' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                        {t('Payment')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>{t('Subtotal')}:</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                        {formatPrice(cartTotal)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>
                        {t('Tax')}: {(TAX_RATE * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                        {formatPrice(invoiceTaxes)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} sx={{ borderBottom: 'none', paddingBottom: 0 }}>
                        {t('Total')}:
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: 'none',
                          paddingBottom: 0,
                          color: `${red[400]}`,
                          fontSize: '22px',
                        }}
                      >
                        {formatPrice(total)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="right" sx={{ paddingTop: 0, fontSize: '12px', color: '#333333' }}>
                        ({t('VAT included')})
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button sx={{ width: '100%' }} variant="contained" onClick={handleBtn}>
                  {t('CHECK OUT')}
                </Button>
              </Paper>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
}
