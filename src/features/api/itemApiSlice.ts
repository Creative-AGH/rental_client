import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetItem } from '../../types/GetItemT';

export const itemApiSlice = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    getAllItems: builder.query<GetItem[], void>({
      query: () => 'user/items',
    }),
    getItem: builder.query<GetItem, string>({
      query: (id) => `user/item/${id}`,
    }),
    getAllBorrowedItems: builder.query<GetItem[], any>({
      query: ({ state }) => ({
        url: 'user/items/borrowed',
        method: 'GET',
        body: { state },
      }),
    }),
  }),
});

export const { useGetAllItemsQuery, useGetItemQuery } = itemApiSlice;
