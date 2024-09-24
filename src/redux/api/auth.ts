import { TUpdatePasswordDto } from '@/types/t-update-password-dto';
import { TUser } from '@/types/t-user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/auth',

    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: [],
    endpoints: (builder) => ({
        postLogin: builder.mutation<Partial<TUser>, any>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        updatePassword: builder.mutation<{ success: boolean }, TUpdatePasswordDto>({
            query: (body) => ({
                url: 'password',
                method: 'PUT',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        postLogout: builder.mutation<{ success: boolean }, any>({
            query: () => ({
                url: 'logout',
                method: 'POST',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    usePostLoginMutation,
    usePostLogoutMutation,
    useUpdatePasswordMutation,
    util: { getRunningQueriesThunk },
} = authApi;

// export endpoints for use in SSR
export const { postLogin, postLogout, updatePassword } = authApi.endpoints;