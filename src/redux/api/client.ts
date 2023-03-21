import { IUser } from '@/types/i-user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const clientApi = createApi({
    reducerPath: 'client',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/client',
        
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: [],
    endpoints: (builder) => ({
        postRegister: builder.mutation<Partial<IUser>, any>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    usePostRegisterMutation,
    util: { getRunningQueriesThunk },
} = clientApi;

// export endpoints for use in SSR
export const { postRegister } = clientApi.endpoints;