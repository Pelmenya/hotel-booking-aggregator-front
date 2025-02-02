import { TNullable } from '@/types/t-nullable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


export type TStep = 1 | 2 | 3 | 4 | 5;

export type TCreateHotelState = {
    step: TStep;
    steps: TStep[];
    selectedCategory: TNullable<number>;
    selectedSubcategory: TNullable<number>;
    realEstateType: TNullable<{ ru: string; en: string }>;
};

const initialState: TCreateHotelState = {
    step: 1,
    steps: [],
    selectedCategory: null,
    selectedSubcategory: null,
    realEstateType: null
};

export const createHotelSlice = createSlice({
    name: 'createHotel',
    initialState,
    reducers: {
        setStep(state, action: PayloadAction<TStep>) {
            state.step = action.payload;
        },
        setInitialState(state) {
            state.step = 1;
            state.selectedCategory = null;
            state.selectedSubcategory = null;
        },
        saveSelectedCategory(state, action: PayloadAction<TNullable<number>>) {
            state.selectedCategory = action.payload;
        },
        saveSelectedSubcategory(state, action: PayloadAction<TNullable<number>>) {
            state.selectedSubcategory = action.payload;
        },
        saveSelectedRealEstateType(state, action: PayloadAction<TNullable<{ ru: string; en: string }>>) {
            state.realEstateType = action.payload;
        },
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { setStep, setInitialState, saveSelectedCategory, saveSelectedSubcategory, saveSelectedRealEstateType } = createHotelSlice.actions;
