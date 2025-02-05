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
    hotelTitle: TNullable<string>;
    hotelDescription: TNullable<string>;
    hotelCoordinates: TNullable<string>;
    hotelPictures: TNullable<string[]>;
    hotelFiles: TNullable<FileList>;
};

const initialState: TCreateHotelState = {
    step: 1,
    steps: [],
    selectedCategory: null,
    selectedSubcategory: null,
    realEstateType: null,
    hotelTitle: null,
    hotelDescription: null,
    hotelCoordinates: null,
    hotelPictures: null,
    hotelFiles: null
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
            state.hotelDescription = null;
            state.hotelCoordinates = null;
            state.hotelPictures = null;
            state.hotelFiles = null;
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
        setHotelCoordinates(state, action: PayloadAction<TNullable<string>>) {
            state.hotelCoordinates = action.payload;
        },
        setHotelPictures(state, action: PayloadAction<TNullable<string[]>>) {
            state.hotelPictures = action.payload;
        },
        setHotelFiles(state, action: PayloadAction<TNullable<FileList>>) {
            state.hotelFiles = action.payload;
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
    setHotelDescription,
    setHotelCoordinates,
    setHotelPictures,
    setHotelFiles
} = createHotelSlice.actions;
