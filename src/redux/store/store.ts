import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { adminApi } from '../api/admin-api';
import { authApi } from '../api/auth-api';
import { clientApi } from '../api/client-api';
import { commonApi } from '../api/common-api';
import { confirmApi } from '../api/confirm-api';
import { userSlice } from '../slices/user-slice';
import { userSettingsSlice } from '../slices/user-settings-slice';
import { hotelsApi } from '../api/hotels-api';
import { addressApi } from '../api/address-api';
import { amenitiesApi } from '../api/amenities-api';
import { realEstateApi } from '../api/real-estate-api';



const isDev = process.env.NODE_ENV !== 'production';
const middlewares = isDev && typeof window === 'object' ? [logger] : [];

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [userSettingsSlice.name]: userSettingsSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [confirmApi.reducerPath]: confirmApi.reducer,
        [hotelsApi.reducerPath]: hotelsApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [amenitiesApi.reducerPath]: amenitiesApi.reducer,
        [realEstateApi.reducerPath]: realEstateApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        ...middlewares, 
        authApi.middleware, 
        commonApi.middleware, 
        clientApi.middleware, 
        adminApi.middleware,
        confirmApi.middleware,
        hotelsApi.middleware,
        addressApi.middleware,
        amenitiesApi.middleware,
        realEstateApi.middleware,
    ]),
    devTools: true,
});

export const makeStore = () => store;

export type TAppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<TAppStore>(makeStore);