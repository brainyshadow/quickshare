import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/error';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
