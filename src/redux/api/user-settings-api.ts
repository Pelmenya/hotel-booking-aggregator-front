import { TUserSettings } from '@/types/t-user-settings';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const userSettingsApi = createApi({
    reducerPath: 'userSettingsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/common',

    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: [],
    endpoints: (builder) => ({
        postUserSettings: builder.mutation<Partial<TUserSettings>, any>({
            query: (body) => ({
                url: 'user-settings',
                method: 'POST',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        putUserSettings: builder.mutation<Partial<TUserSettings>, any>({
            query: (body) => ({
                url: 'user-settings',
                method: 'PUT',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    usePostUserSettingsMutation,
    usePutUserSettingsMutation,
    util: { getRunningQueriesThunk },
} = userSettingsApi;

// export endpoints for use in SSR
export const { postUserSettings, putUserSettings } = userSettingsApi.endpoints;