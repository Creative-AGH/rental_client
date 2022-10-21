import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mapApiSlice = createApi({
  reducerPath: 'mapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    getMapData: builder.query({
      query: () => 'map',
    }),
  }),
});

export const { useGetMapDataQuery } = mapApiSlice;
