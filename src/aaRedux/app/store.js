import {configureStore} from '@reduxjs/toolkit';

// import the reducer
import userReducer from './userSlice';



const rootReducer = {
  // add the reducer here
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
})

export default store;