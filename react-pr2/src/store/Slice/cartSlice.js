import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../api/cartApi';

const cartItemLocalStorage = JSON.parse(localStorage.getItem('cart-list'));

const cartSlice = createSlice({
  name: 'carts',
  initialState: {
    showMiniCart: false,
    cartItem: cartItemLocalStorage || [],
    cartOrdersItem: [],
    cartOrders: [],
    isLoading: true,
  },
  reducers: {
    toggleMiniCartClick(state, action) {
      state.showMiniCart = action.payload;
    },
    setAddToCart(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItem.findIndex((idx) => idx.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity += quantity;
      } else {
        state.cartItem.push(action.payload);
      }
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItem.findIndex((idx) => idx.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity = quantity;
      }
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
    removeFromCart(state, action) {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
    removeMultiple(state, action) {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orders.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(orders.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getOrdersItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartOrdersItem = action.payload;
      })
      .addCase(getOrdersItem.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const orders = createAsyncThunk('cart/order', async (order) => {
  try {
    const res = await cartApi.add(order);
    return res.data;
  } catch (err) {
    return err;
  }
});

// getOrderItem
export const getOrdersItem = createAsyncThunk('cart/orders/getId', async (id) => {
  try {
    const res = await cartApi.get(id);
    return res.data;
  } catch (error) {
    return error;
  }
});

//get all api orders
export const getOrders = createAsyncThunk('orders/getAll', async () => {
  try {
    const res = await cartApi.getAll();
    return res.data;
  } catch (error) {
    return error;
  }
});

const { reducer, actions } = cartSlice;
export const { removeFromCart, setQuantity, setAddToCart, removeMultiple, toggleMiniCartClick } = actions;
export default reducer;
