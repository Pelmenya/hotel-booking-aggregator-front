import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export type TSuggestion = {
    machine: string;
    sign: string;
    value: string;
    zip: string;
};

export type TSuggestionAddressResponseData = {
    query: string;
    requestProcessTime: number;
    suggestions: TSuggestion[];
};

export type TPoint = {
    latitude: number;
    longitude: number;

}

export type TCoordinatesResData = {
    coordinates: TPoint;
};

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/proxy' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getAddressSuggestions: builder.query<TSuggestionAddressResponseData, string>({
            query: (q: string) => ({
                url: `suggest/address?q=${q}`,
                method: 'GET',
                credentials: 'include'     // обязательно для проставления cookie
            }),
            // Вы можете добавить transformResponse для обработки ответа, если это необходимо
        }),
        getCoordinates: builder.query<TCoordinatesResData, string>({
            query: (address: string) => ({
                url: `geocode?address=${encodeURIComponent(address)}`,
                method: 'GET',
                credentials: 'include'
            }),
        }),
    }),
});

export const { useGetAddressSuggestionsQuery, useGetCoordinatesQuery } = addressApi;
