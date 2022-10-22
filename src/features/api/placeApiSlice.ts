import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPlace } from '../../types/GetItemT';
export const placeApiSlice = createApi({
  reducerPath: 'placeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    getAllPlaces: builder.query<GetPlace[], void>({
      query: () => 'user/places',
      transformResponse: (response: GetPlace[]) => {
        return response.map((place) => {
          const latlngs = {
            lat: place.placeCoordinatesDto.x,
            lng: place.placeCoordinatesDto.y,
          };
          return {
            ...place,
            latlngs,
          };
        });
      },
    }),
    getPlaceById: builder.query<GetPlace, string>({
      query: (placeId) => `user/place/${placeId}`,
    }),
    getItemsByPlaceId: builder.query<GetPlace[], string>({
      query: (placeId) => `user/${placeId}/getItemsByPlaceId`,
    }),
  }),
});

export const { useGetItemsByPlaceIdQuery, useGetAllPlacesQuery, useGetPlaceByIdQuery } = placeApiSlice;
