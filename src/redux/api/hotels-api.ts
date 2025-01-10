import { THotelResData } from '@/types/t-hotel-res-data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const hotelsApi = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/hotels',

    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getHotelById: builder.query<THotelResData, string>({
            query: (id: string) => ({
                url: `hotel/${id}`,
                method: 'GET',
                credentials: 'include'     // обязательно для проставления cookie
            })
        }),

        searchHotels: builder.query<THotelResData[], string>({
            query: (q: string) => ({
                url: `search?q=${q}`,
                method: 'GET',
                credentials: 'include'     // обязательно для проставления cookie
            })
        }),

    }),
});

// Export hooks for usage in functional components
export const {
    useGetHotelByIdQuery,
    useLazySearchHotelsQuery,
    util: { getRunningQueriesThunk },
} = hotelsApi;

// export endpoints for use in SSR
export const {
    getHotelById,
    searchHotels,
} = hotelsApi.endpoints;