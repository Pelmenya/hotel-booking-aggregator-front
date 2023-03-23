import { TUserProps } from '@/types/t-user-props';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { boolean } from 'yup';

export type TUserState = TUserProps;

const initialState: TUserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user', initialState,

    reducers: {
        setUser(state, action){
            state.user = action.payload;
        },

        removeUser(state){
            state.user = null;
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

export const { setUser, removeUser } = userSlice.actions;
