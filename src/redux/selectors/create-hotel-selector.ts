import { TAppState } from '../../types/t-app-state';

export const getCreateHotelStateStep = (state: TAppState ) => state.createHotel.step;
export const getCreateHotelStateSelectedCategory  = (state: TAppState) => state.createHotel.selectedCategory;
export const getCreateHotelStateSelectedSubcategory  = (state: TAppState) => state.createHotel.selectedSubcategory;
export const getCreateHotelStateRealEstateType  = (state: TAppState) => state.createHotel.realEstateType;
export const getHotelTitle = (state: TAppState) => state.createHotel.hotelTitle;
export const getHotelDescription = (state: TAppState) => state.createHotel.hotelDescription;
export const getHotelCoordinates = (state: TAppState) => state.createHotel.hotelCoordinates;
export const getHotelPictures = (state: TAppState) => state.createHotel.hotelPictures;
export const getHotelFiles = (state: TAppState) => state.createHotel.hotelFiles;