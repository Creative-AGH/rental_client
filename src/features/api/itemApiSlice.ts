import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetItem } from '../../types/GetItemT';

export const itemApiSlice = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({}),
});

export const extendItemApi = itemApiSlice.enhanceEndpoints({ addTagTypes: ['Item'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<GetItem[], void>({
      query: () => 'user/items',
      providesTags: ['Item'],
    }),
    getItem: builder.query<GetItem, string>({
      query: (id) => `user/item/${id}`,
    }),
    getAllBorrowedItems: builder.query<GetItem[], string>({
      query: (state) => ({
        url: 'user/items/borrowed',
        method: 'GET',
        body: { state },
      }),
    }),
  }),
});

export const { useGetAllBorrowedItemsQuery, useGetAllItemsQuery, useGetItemQuery } = extendItemApi;
