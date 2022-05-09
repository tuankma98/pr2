import { TableHead, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { red } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getOrders } from '../../../store/Slice/cartSlice';
import { updateStatusOrder } from '../../../store/Slice/adminSlice';
import { formatPrice } from '../../../utils/utils';
import OrdersEmpty from './OrdersEmpty';
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
    gap: '10px',
    marginBottom: '10px',
  },
  totalItem: {
    color: red[400],
  },
}));

export default function Orders({ orders }) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const cartItemsOrders = !!orders;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeStatus = async (item, type) => {
    const newOrderData = { ...item, status: type };
    await dispatch(updateStatusOrder({ id: item.id, newStatus: newOrderData }));
    dispatch(getOrders());
    if (type === 'Done') {
      enqueueSnackbar(`${t('Finished this order')}`, { variant: 'success' });
    } else {
      enqueueSnackbar(`${t('Cancel this orders')}`, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
        {cartItemsOrders ? (
          <>
            <Box>
              <TableContainer>
                <Table sx={{ minWidth: 1400 }} aria-labelledby="tableTitle" size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width="100px">
                        {t('Order ID')}
                      </TableCell>
                      <TableCell align="left" padding="normal" width="500px">
                        {`${t('Name')} (${10} ${'Product'})`}
                      </TableCell>
                      <TableCell align="center" padding="normal">
                        {t('Total')}
                      </TableCell>
                      <TableCell align="center" padding="normal">
                        {t('Customer')}
                      </TableCell>
                      <TableCell align="center" padding="normal">
                        {t('Phone')}
                      </TableCell>
                      <TableCell align="center" padding="normal">
                        {t('Address')}
                      </TableCell>
                      <TableCell align="center" padding="normal">
                        {t('Status')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center" width="100px">
                            {item.id}
                          </TableCell>
                          <TableCell align="left" padding="normal" width="500px">
                            {item.cart.map((cart, idx) => {
                              const { product } = cart;
                              return (
                                <Box key={idx} className={classes.thumbnail}>
                                  <img src={product.images[0]} alt={product.name} width="60px" />
                                  <Typography>{product.name}</Typography>
                                </Box>
                              );
                            })}
                          </TableCell>
                          <TableCell align="center" padding="normal">
                            <Typography color={`${red[600]}`}>{formatPrice(item.total)}</Typography>
                          </TableCell>
                          <TableCell align="center" padding="normal">
                            {item.fullname}
                          </TableCell>
                          <TableCell align="center" padding="normal">
                            {item.phone}
                          </TableCell>
                          <TableCell align="center" padding="normal">
                            {item.address}, {item.ward}, {item.district}
                          </TableCell>
                          <TableCell align="center" padding="normal">
                            {item.status === 'Pending' ? (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  '& > *': {
                                    m: 1,
                                  },
                                }}
                              >
                                <ButtonGroup variant="text" aria-label="text button group">
                                  <Button onClick={() => handleChangeStatus(item, 'Done')}>Accept</Button>
                                  <Button onClick={() => handleChangeStatus(item, 'Reject')}>Reject</Button>
                                </ButtonGroup>
                              </Box>
                            ) : (
                              <Typography component="span">{item.status}</Typography>
                            )}
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
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </>
        ) : (
          <OrdersEmpty />
        )}
      </Paper>
    </Box>
  );
}
