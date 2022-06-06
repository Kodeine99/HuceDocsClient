import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from '../api/userApi';

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

// Get user data by token
export const getUserByToken = createAsyncThunk(
  "user/getUserByToken",
  async () => {
    return await userApi.getUserByToken();
  }
);

// get user data by id
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId) => {
    console.log(userId);
    return await userApi.getUserById(userId);
  }
);


// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userInfor: null,
    loading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.loading = false;
    
      return state;
    },
    setAuth: (state, token) => {
      state.token = token.payload;
    }
  },

  extraReducers: {
    // Login 
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;

    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.token = action.payload.result.token;
    },

    // Register
    [userRegister.pending]: (state) => {
      state.loading = true;
    },
    [userRegister.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      if (action.payload.errors) {
        if (action.payload.errors.Password) {
          state.errorMessage = action.payload.errors.Password[0];
        } else if (action.payload.errors.Username) {
          state.errorMessage = action.payload.errors.Username[0];
        }
      } else state.errorMessage = action.payload.message;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      // Save data to store state
      state.username = action.payload.result.username;
    },

    // Get User Data
    [getUserByToken.pending]: (state) => {
      state.loading = true;
    },
    [getUserByToken.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    [getUserByToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.userInfor = action.payload;
    }
  }
});

const {actions, reducer : userReducer} = userSlice;
export const {clearState, setAuth} = actions;
export default userReducer;
export const userSelector = (state) => state.user;