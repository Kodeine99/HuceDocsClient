import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from 'aaRedux/api/userApi';

// Create Async actions

// Login action
export const login = createAsyncThunk(
  'user/login',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const response = await userApi.login(username, password);
      return response;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
)

//Register action
export const userRegister = createAsyncThunk(
  'user/register',
  async (
    {fullName, username, email, phoneNumber, password, confirmPassword}, {rejectWithValue}
  ) => {
    try {
      return await userApi.register(
        fullName, username, email, phoneNumber, password, confirmPassword
      );
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);