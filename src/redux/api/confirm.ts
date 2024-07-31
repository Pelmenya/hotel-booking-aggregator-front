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
        postEmailCode: builder.mutation<{succes : boolean}, any>({
            query: () => ({
                url: 'email-code',
                method: 'POST',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        postConfirmEmail: builder.mutation<{succes : boolean}, {code: string}>({
            query: (body) => ({
                body,
                url: 'email',
                method: 'PUT',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),

    }),
});

// Export hooks for usage in functional components
export const {
    usePostEmailCodeMutation,
    usePostConfirmEmailMutation,
    util: { getRunningQueriesThunk },
} = confirmApi;

// export endpoints for use in SSR
export const { postEmailCode, postConfirmEmail } = confirmApi.endpoints;