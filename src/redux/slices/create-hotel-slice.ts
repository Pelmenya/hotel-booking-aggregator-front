import { bedTypes } from '@/components/forms/components/beds-type-selector/constants';
import { TNullable } from '@/types/t-nullable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TPoint } from '../api/address-api';

export type TStep = 1 | 2 | 3 | 4 | 5;

export type TBedSelection = {
    id: string;
    type: string;
    count: number;
};

export type TCreateHotelState = {
    step: TStep;
    steps: TStep[];
    selectedCategory: TNullable<number>;
    selectedSubcategory: TNullable<number>;
    realEstateType: TNullable<{ ru: string; en: string }>;
    hotelTitle: TNullable<string>;
    hotelAddress: TNullable<string>;
    hotelCoordinates: TNullable<TPoint>;
    hotelCondition: TNullable<string>,
    hotelArea: TNullable<number>,
    hotelFloor: TNullable<number>, 
    selectedAmenitiesCategory: TNullable<string>;
    selectedAmenities: string[];
    bedSelections: TBedSelection[];
    totalBeds: number;
    countRooms: number,
    countGuests: number,
    kitchenType: TNullable<string>,
};

const initialState: TCreateHotelState = {
    step: 1,
    steps: [],
    selectedCategory: null,
    selectedSubcategory: null,
    realEstateType: null,
    hotelTitle: null,
    hotelAddress: null,
    hotelCoordinates: null,
    hotelArea: null,
    hotelFloor: null,
    selectedAmenitiesCategory: null,
    selectedAmenities: [],
    bedSelections: [],
    totalBeds: 0,
    countRooms: 0,
    countGuests: 0,
    kitchenType: null,
    hotelCondition: null,
};

const calculateTotalBeds = (bedSelections: TBedSelection[]) => {
    return bedSelections.reduce((total, bed) => {
        const bedType = bedTypes.find(b => b.type === bed.type);
        return total + (bedType ? bed.count * bedType.persons : 0);
    }, 0);
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
        setHotelAddress(state, action: PayloadAction<TNullable<string>>) {
            state.hotelAddress = action.payload;
        },
        setHotelCoordinates(state, action: PayloadAction<TNullable<TPoint>>) {
            state.hotelCoordinates = action.payload;
        },
        setHotelFloor(state, action: PayloadAction<TNullable<number>>) {
            state.hotelFloor = action.payload;
        },
        setHotelArea(state, action: PayloadAction<TNullable<number>>) {
            state.hotelArea = action.payload;
        },
        setCountRooms(state, action: PayloadAction<number>) {
            state.countRooms = action.payload;
        },
        setCountGuests(state, action: PayloadAction<number>) {
            state.countGuests = action.payload;
        },
        setHotelCondition(state, action: PayloadAction<string>) {
            state.hotelCondition = action.payload;
        },
        setKitchenType(state, action: PayloadAction<string>) {
            state.kitchenType = action.payload;
        },
        setSelectedAmenitiesCategory(state, action: PayloadAction<TNullable<string>>) {
            state.selectedAmenitiesCategory = action.payload;
        },
        toggleAmenity(state, action: PayloadAction<string>) {
            const amenity = action.payload;
            if (state.selectedAmenities.includes(amenity)) {
                state.selectedAmenities = state.selectedAmenities.filter(
                    (a) => a !== amenity
                );
            } else {
                state.selectedAmenities.push(amenity);
            }
        },
        addBedSelection(state, action: PayloadAction<TBedSelection>) {
            state.bedSelections.push(action.payload);
            state.totalBeds = calculateTotalBeds(state.bedSelections);
        },
        updateBedSelection(state, action: PayloadAction<TBedSelection>) {
            const index = state.bedSelections.findIndex(bed => bed.id === action.payload.id);
            if (index !== -1) {
                state.bedSelections[index].count = action.payload.count;
                state.totalBeds = calculateTotalBeds(state.bedSelections);
            }

        },
        removeBedSelection(state, action: PayloadAction<string>) {
            state.bedSelections = state.bedSelections.filter(bed => bed.id !== action.payload);
            state.totalBeds = calculateTotalBeds(state.bedSelections);
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
    setHotelCoordinates,
    setSelectedAmenitiesCategory,
    toggleAmenity,
    addBedSelection,
    updateBedSelection,
    removeBedSelection,
    setCountGuests,
    setCountRooms, 
    setKitchenType,
    setHotelArea,
    setHotelFloor,
    setHotelCondition,
} = createHotelSlice.actions;
