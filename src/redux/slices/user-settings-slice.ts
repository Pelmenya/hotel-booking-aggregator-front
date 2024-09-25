import { TUserSettingsProps } from '@/types/t-user-settings-props';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export type TUserSettingsState = TUserSettingsProps;

const initialState: TUserSettingsState = {
    userSettings: {
        language: 'ru',
        currency:'₽',
        theme: 'light',
        phoneChanel: true,
        emailChanel: true,
        pushChanel: true,
    }
};

export const userSettingsSlice = createSlice({
    name: 'userSettings', initialState,

    reducers: {
        setUserSettings(state, action){
            state.userSettings = action.payload;
        },

        removeUserSettings(state){
            state.userSettings = initialState.userSettings;
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper 
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },

},
);

export const { setUserSettings, removeUserSettings } = userSettingsSlice.actions;