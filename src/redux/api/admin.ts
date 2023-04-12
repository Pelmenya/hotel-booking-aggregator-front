import { THotel } from '@/types/t-hotel';
import { TUser } from '@/types/t-user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const adminApi = createApi({
    reducerPath: 'admin',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/admin',
        
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: [],
    endpoints: (builder) => ({
        postAdminUsers: builder.mutation<Partial<TUser>, any>({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        postAdminHotels: builder.mutation<THotel, any>({
            query: (body) => ({
                url: 'hotels',
                method: 'POST',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        putAdminHotels: builder.mutation<THotel, any>({
            query: ({ id, body } ) => ({
                url: `hotels/${id}`,
                method: 'PUT',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),

    }),
});

// Export hooks for usage in functional components
export const {
    usePostAdminUsersMutation,
    usePostAdminHotelsMutation,
    usePutAdminHotelsMutation,
    util: { getRunningQueriesThunk },
} = adminApi;

// export endpoints for use in SSR
export const { postAdminUsers, postAdminHotels, putAdminHotels } = adminApi.endpoints;