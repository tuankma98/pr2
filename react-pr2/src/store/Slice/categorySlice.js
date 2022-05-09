import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
    categoryItem: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryAPI.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(getCategoryItem.fulfilled, (state, action) => {
      state.categoryItem = action.payload;
    });
  },
});

export const categoryAPI = createAsyncThunk('category/getAll', async () => {
  try {
    const res = await categoryApi.getAll();
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const getCategoryItem = createAsyncThunk('category/getItem', async (id) => {
  try {
    const res = await categoryApi.get(id);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

const { reducer } = categorySlice;
export default reducer;
