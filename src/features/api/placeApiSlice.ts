import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './apiSlice';
import { GetPlaceT } from '../../types/ApiTypes';
import { MapLayerApiT } from '../../types/MapLayerT';

export const placeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaces: builder.query<GetPlaceT[], void>({
      query: () => 'user/places',
      transformResponse: (response: GetPlaceT[]) => {
        return response.map((place) => {
          const latlngs = place.placeCoordinatesDto.map((latlng: any) => {
            return { lat: latlng.x, lng: latlng.y };
          });
          delete place.placeCoordinatesDto;
          return {
            ...place,
            latlngs,
          };
        });
      },
    }),
    getPlaceById: builder.query<GetPlaceT, string>({
      query: (placeId) => `user/place/${placeId}`,
    }),
    getItemsByPlaceId: builder.query<GetPlaceT[], string>({
      query: (placeId) => `user/${placeId}/getItemsByPlaceId`,
    }),
  }),
});

export const { useGetItemsByPlaceIdQuery, useGetAllPlacesQuery, useGetPlaceByIdQuery } = placeApiSlice;
