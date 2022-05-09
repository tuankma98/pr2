import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

const productDetailSlice = createSlice({
  name: 'productId',
  initialState: {
    productDetail: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productApiId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productApiId.fulfilled, (state, action) => {
        const { productID, data } = action.payload;
        state.isLoading = false;
        state.productDetail = { ...state.productDetail, [productID]: data };
      })
      .addCase(productApiId.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const productApiId = createAsyncThunk('productId/getId', async (productID) => {
  try {
    const { data } = await productApi.get(productID);
    return { productID, data };
  } catch (error) {
    return error;
  }
});

const { reducer } = productDetailSlice;
export default reducer;
