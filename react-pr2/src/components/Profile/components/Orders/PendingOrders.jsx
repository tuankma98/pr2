import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../../../utils/utils';
import queryString from 'query-string';
import { getOrdersItem } from '../../../../store/Slice/cartSlice';
import StorageKeys from '../../../../constants/storage-keys';

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

function PendingOrders(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = useSelector((state) => state.cart.cartOrdersItem);
  const { email } = JSON.parse(localStorage.getItem(StorageKeys.USER));

  useEffect(() => {
    const params = queryString.stringify({ status: 'Pending', email });
    dispatch(getOrdersItem(params));
  }, [dispatch, email]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0}>
        <TableContainer>
          <Table sx={{ minWidth: 820 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="90px">
                  Order ID
                </TableCell>
                <TableCell align="left" width="350px">
                  {`Name (All ${orders.length} Product)`}
                </TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center" width="90px">
                      {item.id}
                    </TableCell>
                    <TableCell align="left" width="350px">
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
                      {item.address}, {item.ward}, {item.district}
                    </TableCell>
                    <TableCell align="right" padding="normal">
                      {item.status}
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
      </Paper>
    </Box>
  );
}

export default PendingOrders;
