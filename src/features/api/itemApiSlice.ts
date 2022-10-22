import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import { GetItem } from '../../types/ApiTypes';

const itemsAdapter = createEntityAdapter<GetItem>();

const initialState = itemsAdapter.getInitialState();

export const itemApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Item'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<GetItem[], void>({
      query: () => 'user/items',
      providesTags: ['Item'],
      transformResponse(response: GetItem[]) {
        return itemsAdapter.setAll(initialState, response) as any;
      },
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
      transformResponse(response: GetItem[]) {
        return itemsAdapter.setAll(initialState, response) as any;
      },
    }),
  }),
});

export const selectItemsResult = itemApiSlice.endpoints.getAllItems.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectItemsResult,
  (itemsResult) => itemsResult.data // normalized state object with ids & entities
);
//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
  // Pass in a selector that returns the posts slice of state
} = itemsAdapter.getSelectors((state: any) => (selectPostsData(state) as any) ?? initialState);

export const { useGetAllBorrowedItemsQuery, useGetAllItemsQuery, useGetItemQuery } = itemApiSlice;
