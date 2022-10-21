import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/Theme/slice';
import { mapApiSlice } from '../features/api/mapApiSlice';
import { itemApiSlice } from '../features/api/itemApiSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [mapApiSlice.reducerPath]: mapApiSlice.reducer,
    [itemApiSlice.reducerPath]: itemApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mapApiSlice.middleware, itemApiSlice.middleware),
});
