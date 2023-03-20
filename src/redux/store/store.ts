import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { authApi } from '../api/auth';
import { commonApi } from '../api/common';
import { userSlice } from '../slices/user';



const isDev = process.env.NODE_ENV !== 'production';
const middlewares = isDev ? [logger] : [];

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([...middlewares, authApi.middleware, commonApi.middleware]),
    devTools: true,
});

export const makeStore = () => store;

export type TAppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<TAppStore>(makeStore);