import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { adminApi } from '../api/admin';
import { authApi } from '../api/auth';
import { clientApi } from '../api/client';
import { commonApi } from '../api/common';
import { confirmApi } from '../api/confirm';
import { userSlice } from '../slices/user';



const isDev = process.env.NODE_ENV !== 'production';
const middlewares = isDev && typeof window === 'object' ? [logger] : [];

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [confirmApi.reducerPath]: confirmApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        ...middlewares, 
        authApi.middleware, 
        commonApi.middleware, 
        clientApi.middleware, 
        adminApi.middleware,
        confirmApi.middleware,
    ]),
    devTools: true,
});

export const makeStore = () => store;

export type TAppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<TAppStore>(makeStore);