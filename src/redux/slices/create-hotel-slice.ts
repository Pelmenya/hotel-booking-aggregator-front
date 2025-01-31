import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


export type TStep = 1 | 2 | 3 | 4 | 5;
    

export type TCreateHotelState = {
    step: TStep
    steps: TStep[];
}

const initialState: TCreateHotelState = {
    step: 1,
    steps: [],
};

export const createHotelSlice = createSlice({
    name: 'createHotel', initialState,

    reducers: {
        
        setStep(state, action:PayloadAction<TStep>) {
            state.step = action.payload;
        },

        setInitialState(state) {
            state.step  = 1;
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

export const { setStep, setInitialState } = createHotelSlice.actions;
