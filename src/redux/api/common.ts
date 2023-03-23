import { IUser } from '@/types/t-user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const commonApi = createApi({
    reducerPath: 'common',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/common',

    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getAuthUser: builder.mutation<Partial<IUser>, string>({
            query: () => ({
                url: '/user', 
                method: 'GET',
                credentials: 'include'
            }),

        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetAuthUserMutation,
    util: { getRunningQueriesThunk },
} = commonApi;

// export endpoints for use in SSR
export const { getAuthUser } = commonApi.endpoints;