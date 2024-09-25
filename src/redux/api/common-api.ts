import { TSearchBaseParams } from '@/types/t-base-search-params';
import { THotel } from '@/types/t-hotel';
import { THotelRoom } from '@/types/t-hotel-room';
import { TUser } from '@/types/t-user';
import { TUserSettings } from '@/types/t-user-settings';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/common',

    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getProfile: builder.mutation<Partial<TUser>, string>({
            query: () => ({
                url: 'profile',
                method: 'GET',
                credentials: 'include'
            }),

        }),
        getProfileSettings: builder.mutation<Partial<TUserSettings>, string>({
            query: () => ({
                url: 'user-settings',
                method: 'GET',
                credentials: 'include'
            }),

        }),
        postUserSettings: builder.mutation<TUserSettings, TUserSettings>({
            query: (body) => ({
                url: 'user-settings',
                method: 'POST',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        putUserSettings: builder.mutation<TUserSettings, Partial<TUserSettings>>({
            query: (body) => ({
                url: 'user-settings',
                method: 'PUT',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        updateProfile: builder.mutation<TUser, Partial<TUser>>({
            query: (body) => ({
                url: 'profile',
                method: 'PUT',
                body,
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
        getCommonHotels: builder.query<THotel[], string>({
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
    useGetProfileMutation,
    useUpdateProfileMutation,
    useGetProfileSettingsMutation,
    usePostUserSettingsMutation,
    usePutUserSettingsMutation,
    useGetCommonHotelsQuery,
    useGetCommonHotelByIdQuery,
    useGetCommonHotelRoomsQuery,
    useLazyGetCommonHotelsQuery,
    useLazyGetCommonHotelByIdQuery,
    useLazyGetCommonHotelRoomsQuery,
    useGetCommonHotelRoomByIdQuery,
    useLazyGetCommonHotelRoomByIdQuery,
    util: { getRunningQueriesThunk },
} = commonApi;

// export endpoints for use in SSR
export const {
    getProfile,
    getCommonHotels,
    getProfileSettings,
    postUserSettings, 
    putUserSettings, 
    getCommonHotelById, 
    getCommonHotelRooms, 
    getCommonHotelRoomById, 
    updateProfile } = commonApi.endpoints;