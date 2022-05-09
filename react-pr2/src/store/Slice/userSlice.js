import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export const register = createAsyncThunk('user/register', async (user) => {
  try {
    const res = await userApi.register(user);
    const { email, fullName, id, phone, role } = res.data;
    localStorage.setItem(StorageKeys.USER, JSON.stringify({ email, id, fullName, role, phone }));
    return res.data;
  } catch (err) {
    return err;
  }
});

export const login = createAsyncThunk('user/login', async (id) => {
  try {
    const res = await userApi.get(id);
    return res.data;
  } catch (err) {
    return err;
  }
});

// update info user
export const updateInfoUser = createAsyncThunk('user/updateInfo', async (data) => {
  try {
    const res = await userApi.update(data);
    return res.data;
  } catch (err) {
    return err;
  }
});

// get user login
export const getUserLogin = createAsyncThunk('user/getInfo', async (data) => {
  try {
    const res = await userApi.get(data);
    return res.data;
  } catch (err) {
    return err;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    open: false,
    info: [],
    isLoading: true,
  },
  reducers: {
    logout(state) {
      signOut(auth);
      localStorage.removeItem(StorageKeys.USER);
      state.current = {};
    },
    setOpen(state, action) {
      state.open = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { email, fullName, id, phone, role } = action.payload;
      state.current = action.payload;
      localStorage.setItem(
        StorageKeys.USER,
        JSON.stringify({
          id,
          fullName,
          email,
          phone,
          role,
        })
      );
    },
    [getUserLogin.fulfilled]: (state, action) => {
      state.info = action.payload;
      state.isLoading = false
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, setOpen } = actions;
export default reducer;
