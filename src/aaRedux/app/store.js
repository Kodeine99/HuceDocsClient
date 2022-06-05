import {configureStore} from '@reduxjs/toolkit';

// import the reducer



const rootReducer = {
  // add the reducer here
};

const store = configureStore({
  reducer: rootReducer,
})

export default store;