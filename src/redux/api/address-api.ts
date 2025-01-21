import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://ahunter.ru/site/' }),
    endpoints: (builder) => ({
        getAddressSuggestions: builder.query({
            query: (query) => `suggest/address?output=json&query=${encodeURIComponent(query)}`,
            // Вы можете добавить transformResponse для обработки ответа, если это необходимо
        }),
    }),
});

export const { useGetAddressSuggestionsQuery } = addressApi;
