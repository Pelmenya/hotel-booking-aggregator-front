import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';


export type TAmenityViewRes = {
    ru: {
        title: string;
        amenities: string[];
    };
    en: {
        title: string;
        amenities: string[];
    };
};

export const amenitiesApi = createApi({
    reducerPath: 'amenitiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/amenities' }),
    
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },

    endpoints: (builder) => ({
        getAmenities: builder.query<TAmenityViewRes, string>({
            query: () => ({
                url: '',
                method: 'GET',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
    }),
});

export const { 
    useGetAmenitiesQuery,
    util: { getRunningQueriesThunk } 
} = amenitiesApi;

export const  { getAmenities } = amenitiesApi.endpoints;