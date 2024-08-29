import { TSuccess } from '@/types/t-success';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const confirmApi = createApi({
    reducerPath: 'confirm',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/confirm',
        
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: [],
    endpoints: (builder) => ({
        postEmailCode: builder.mutation<TSuccess, any>({
            query: () => ({
                url: 'email-code',
                method: 'POST',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        putConfirmEmail: builder.mutation<TSuccess, {code: string}>({
            query: (body) => ({
                body,
                url: 'email',
                method: 'PUT',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        postSmsCode: builder.mutation<TSuccess, any>({
            query: () => ({
                url: 'sms-code',
                method: 'POST',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        putConfirmPhone: builder.mutation<TSuccess, {code: number}>({
            query: (body) => ({
                body,
                url: 'phone',
                method: 'PUT',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    usePostEmailCodeMutation,
    usePutConfirmEmailMutation,
    usePostSmsCodeMutation,
    usePutConfirmPhoneMutation,
    util: { getRunningQueriesThunk },
} = confirmApi;

// export endpoints for use in SSR
export const { postEmailCode, putConfirmEmail, postSmsCode, putConfirmPhone } = confirmApi.endpoints;