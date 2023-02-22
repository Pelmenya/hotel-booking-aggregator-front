import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { themeSlice } from '../slices/theme';

export const store = configureStore({
    reducer: {
        [themeSlice.name]: themeSlice.reducer,
    },
    devTools: true,

});

export const makeStore = () => store;

export type TAppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<TAppStore>(makeStore);