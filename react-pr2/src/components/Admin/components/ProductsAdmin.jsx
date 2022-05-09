import { Close } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogContent, IconButton, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemAdmin, getProductsAdmin, getProductsItem } from '../../../store/Slice/adminSlice';
import { formatPrice, thumbnailURL } from '../../../utils/utils';
import CreateProducts from './CreateProducts';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import UpdateProducts from './UpdateProducts';
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
  closeBtn: {
    position: 'absolute',
    top: '5px',
    right: '15px',
    zIndex: 1,
  },
}));

export default function ProductsAdmin() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();
  const productAdmin = useSelector((state) => state.admin.productsAdmin);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getProductsAdmin());
  }, [dispatch]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = productAdmin.map((item) => item.id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleEditProducts = async (id) => {
    await dispatch(getProductsItem(id));
    setOpenUpdate(true);
  };

  const handleCreateProducts = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleConfirmDelete = async () => {
    setOpenDeleteItem(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteItem(false);
  };

  const handleDeleteItem = async (id) => {
    setOpenDeleteItem(false);
    await dispatch(deleteItemAdmin(id));
    dispatch(getProductsAdmin());
    enqueueSnackbar(`${t('Delete successfully')}`, { variant: 'success' });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={productAdmin.length}
              />
              <TableBody>
                {productAdmin.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const { salePrice, originalPrice, promotionPercent, name, images, id } = row;
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

                      <TableCell align="center">{promotionPercent > 0 ? `${promotionPercent}%` : 0}</TableCell>
                      <TableCell align="center">
                        <Tooltip title={t('Edit')}>
                          <IconButton onClick={(e) => handleEditProducts(id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>

                      <TableCell align="right">
                        <Box>
                          <Tooltip title={t('Delete')}>
                            <IconButton onClick={handleConfirmDelete}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Dialog
                            disableEscapeKeyDown
                            open={openDeleteItem}
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
                              <Button onClick={() => handleDeleteItem(id)} autoFocus>
                                Agree
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
                    <UpdateProducts closeDialog={handleCloseUpdate} />
                  </DialogContent>
                </Dialog>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
            <Box>
              <Button variant="outlined" onClick={handleCreateProducts}>
                CREATE PRODUCTS
              </Button>
              <Dialog
                disableEscapeKeyDown
                open={openCreate}
                onClose={handleCloseCreate}
                aria-labelledby="form-dialog-title"
              >
                <IconButton onClick={handleCloseCreate}>
                  <Close className={classes.closeBtn} sx={{ fontSize: '30px' }}></Close>
                </IconButton>
                <DialogContent>
                  <CreateProducts closeDialog={handleCloseCreate} />
                </DialogContent>
              </Dialog>
            </Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={productAdmin.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
