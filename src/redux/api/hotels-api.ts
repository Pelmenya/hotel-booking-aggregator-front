import { TSearchBaseParams } from '@/types/t-base-search-params';
import { THotel } from '@/types/t-hotel';
import { THotelRoom } from '@/types/t-hotel-room';
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
        searchHotels: builder.query<THotel[], string>({
            query: (q: string) => ({
                url: `search?q=${q}`,
                method: 'GET'
            })
        }),

        getHotels: builder.query<THotel[], string>({
            query: (title: string) => ({
                url: `hotels?title=${title}`,
                method: 'GET'
            })
        }),
        getCommonHotelById: builder.query<THotel, string>({
            query: (id: string) => ({
                url: `hotels/${id}`,
                method: 'GET'
            })
        }),
        getCommonHotelRooms: builder.query<THotelRoom[], TSearchBaseParams & { hotel: string }>({
            query: ({ limit = 20, offset = 0, hotel }: TSearchBaseParams & { hotel: string }) => ({
                url: `hotel-rooms?limit=${limit}&offset=${offset}&hotel=${hotel}`,
                method: 'GET'
            })
        }),
        getCommonHotelRoomById: builder.query<THotelRoom, string>({
            query: (id: string) => ({
                url: `hotel-rooms/${id}`,
                method: 'GET'
            })
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetHotelsQuery,
    useGetCommonHotelByIdQuery,
    useGetCommonHotelRoomsQuery,
    useLazySearchHotelsQuery,
    useLazyGetHotelsQuery,
    useLazyGetCommonHotelByIdQuery,
    useLazyGetCommonHotelRoomsQuery,
    useGetCommonHotelRoomByIdQuery,
    useLazyGetCommonHotelRoomByIdQuery,
    util: { getRunningQueriesThunk },
} = hotelsApi;

// export endpoints for use in SSR
export const {
    getHotels,
    getCommonHotelById, 
    getCommonHotelRooms, 
    getCommonHotelRoomById, 
} = hotelsApi.endpoints;