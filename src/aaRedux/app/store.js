import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';
// import the reducer
import userReducer from './userSlice';
import docOcrResultReducer from './docOcrResultSlice';
import ocrRequestReducer from './ocrRequestSlice';

// const rootReducer = combineReducers({
//   // add the reducer here
//   user: userReducer,
// });

const rootReducer = {
  user: userReducer,
  docOcrResult: docOcrResultReducer,
  ocrRequest: ocrRequestReducer
}

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist:['user']
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  // reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
})

export default store;