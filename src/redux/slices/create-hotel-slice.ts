import { TNullable } from '@/types/t-nullable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TPoint } from '../api/address-api';

export type TStep = 1 | 2 | 3 | 4 | 5;

export type TCreateHotelState = {
    step: TStep;
    steps: TStep[];
    selectedCategory: TNullable<number>;
    selectedSubcategory: TNullable<number>;
    realEstateType: TNullable<{ ru: string; en: string }>;
    hotelTitle: TNullable<string>;
    hotelAddress: TNullable<string>;
    hotelDescription: TNullable<string>;
    hotelCoordinates: TNullable<TPoint>;
};

const initialState: TCreateHotelState = {
    step: 1,
    steps: [],
    selectedCategory: null,
    selectedSubcategory: null,
    realEstateType: null,
    hotelTitle: null,
    hotelAddress: null,
    hotelDescription: null,
    hotelCoordinates: null,
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
            state.realEstateType = null;
            state.hotelTitle = null;
            state.hotelAddress = null;
            state.hotelDescription = null;
            state.hotelCoordinates = null;
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
        setHotelTitle(state, action: PayloadAction<TNullable<string>>) {
            state.hotelTitle = action.payload;
        },
        setHotelDescription(state, action: PayloadAction<TNullable<string>>) {
            state.hotelDescription = action.payload;
        },
        setHotelAddress(state, action: PayloadAction<TNullable<string>>) {
            state.hotelAddress = action.payload;
        },
        setHotelCoordinates(state, action: PayloadAction<TNullable<TPoint>>) {
            state.hotelCoordinates = action.payload;
        },
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.createHotel,
            };
        },
    },
});

export const { 
    setStep, 
    setInitialState, 
    saveSelectedCategory, 
    saveSelectedSubcategory, 
    saveSelectedRealEstateType,
    setHotelTitle,
    setHotelAddress,
    setHotelDescription,
    setHotelCoordinates,
} = createHotelSlice.actions;
