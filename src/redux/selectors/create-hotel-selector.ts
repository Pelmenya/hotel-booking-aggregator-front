import { TAppState } from '../../types/t-app-state';

export const getCreateHotelStateStep = (state: TAppState ) => state.createHotel.step;
export const getCreateHotelStateSelectedCategory  = (state: TAppState) => state.createHotel.selectedCategory;
export const getCreateHotelStateSelectedSubcategory  = (state: TAppState) => state.createHotel.selectedSubcategory;
export const getCreateHotelStateRealEatateType  = (state: TAppState) => state.createHotel.realEstateType;