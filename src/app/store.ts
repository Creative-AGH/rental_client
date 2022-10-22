import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/Theme/slice';
import { placeApiSlice } from '../features/api/placeApiSlice';
import { itemApiSlice } from '../features/api/itemApiSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [placeApiSlice.reducerPath]: placeApiSlice.reducer,
    [itemApiSlice.reducerPath]: itemApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placeApiSlice.middleware, itemApiSlice.middleware),
});
