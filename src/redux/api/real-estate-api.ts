import { TLanguage } from '@/types/t-language';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export type TRealEstateCategory = {
    id: number;
    name: string;
    icon: string;
    language: TLanguage;
};

export type TRealEstateCategories = {
    id: number;
    name: string;
    icon: string;
    language: TLanguage;
    subcategories: TRealEstateCategory[];
}[];

export type TRealEstateCategoriesRes = {
    ru: TRealEstateCategories;
    en: TRealEstateCategories;
};

export const realEstateApi = createApi({
    reducerPath: 'realEstateApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL + '/real-estate' }),
    
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },

    endpoints: (builder) => ({
        getRealEstate: builder.query<TRealEstateCategoriesRes, string>({
            query: () => ({
                url: 'categories',
                method: 'GET',
                credentials: 'include'     // обязательно для проставления cookie
            }),
        }),
    }),
});

export const { 
    useGetRealEstateQuery,
    util: { getRunningQueriesThunk } 
} = realEstateApi;

export const  { getRealEstate } = realEstateApi.endpoints;