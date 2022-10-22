import { apiSlice } from './apiSlice';
import { GetItem } from '../../types/GetItemT';

export const itemApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Item'] }).injectEndpoints({
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

export const { useGetAllBorrowedItemsQuery, useGetAllItemsQuery, useGetItemQuery } = itemApiSlice;
