import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    product: {},
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(productAPI.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const productAPI = createAsyncThunk('products/getAll', async (filter) => {
  try {
    const { data, pagination } = await productApi.getAll(filter);
    return { data, pagination };
  } catch (error) {
    return error;
  }
});

const { reducer } = productSlice;
export default reducer;
