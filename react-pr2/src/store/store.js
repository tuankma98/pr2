import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slice/productSlice';
import categoryReducer from './Slice/categorySlice';
import productDetailReducer from './Slice/productDetailSlice';
import cartReducer from './Slice/cartSlice';
import userReducer from './Slice/userSlice';
import adminReducer from './Slice/adminSlice';

const rootReducer = {
  products: productReducer,
  categories: categoryReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  user: userReducer,
  admin: adminReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
