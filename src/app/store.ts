import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/Theme/slice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
