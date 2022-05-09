import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from '../../api/adminApi';
import cartApi from '../../api/cartApi';

const adminSlice = createSlice({
  name: 'products',
  initialState: {
    productsAdmin: [],
    productItemAdmin: [],
    isLoading: true,
  },
  reducers: {
    removeMultiple(state, action) {
      state.productsAdmin = state.productsAdmin.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsAdmin = action.payload;
      })
      .addCase(getProductsAdmin.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getProductsItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productItemAdmin = action.payload;
      })
      .addCase(getProductsItem.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addProductAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addProductAdmin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// get all api products
export const getProductsAdmin = createAsyncThunk('admin/products/getAll', async () => {
  try {
    const res = await adminApi.getAllProducts();
    return res.data;
  } catch (error) {
    return error;
  }
});

// get product admin
export const getProductsItem = createAsyncThunk('admin/orders/getId', async (id) => {
  try {
    const res = await adminApi.get(id);
    return res.data;
  } catch (error) {
    return error;
  }
});

//Update status of order
export const updateStatusOrder = createAsyncThunk('admin/orders/update', async (data) => {
  try {
    const res = await cartApi.update(data);
    return res.data;
  } catch (err) {
    return err;
  }
});

// update Products
export const updateProductsAdmin = createAsyncThunk('admin/orders/update', async (data) => {
  try {
    const res = await adminApi.update(data);
    return res.data;
  } catch (err) {
    return err;
  }
});

//add product
export const addProductAdmin = createAsyncThunk('admin/orders/update', async (data) => {
  try {
    const res = await adminApi.add(data);
    return res.data;
  } catch (err) {
    return err;
  }
});

//MultipeDeleteItem products
export const deleteItemAdmin = createAsyncThunk('admin/products/multipleDelete', async (id) => {
  try {
    const res = await adminApi.remove(id);
    return res.data;
  } catch (err) {
    return err;
  }
});

//deleteSelectItem products
export const deleteSelectItem = createAsyncThunk('admin/products/delete', async (id) => {
  try {
    const res = await adminApi.remove(id);
    return res.data;
  } catch (err) {
    return err;
  }
});

const { reducer, actions } = adminSlice;
export const { removeMultiple } = actions;
export default reducer;
