import { TAppState } from '../../types/t-app-state';

export const getCreateHotelStateStep = (state: TAppState) => state.createHotel.step;
export const getCreateHotelStateSelectedCategory  = (state: TAppState) => state.createHotel.selectedCategory;
export const getCreateHotelStateSelectedSubcategory  = (state: TAppState) => state.createHotel.selectedSubcategory;
export const getCreateHotelStateRealEstateType  = (state: TAppState) => state.createHotel.realEstateType;
export const getHotelTitle = (state: TAppState) => state.createHotel.hotelTitle;
export const getHotelDescription = (state: TAppState) => state.createHotel.hotelDescription;
export const getHotelAddress = (state: TAppState) => state.createHotel.hotelAddress;
export const getHotelCoordinates = (state: TAppState) => state.createHotel.hotelCoordinates;
export const getHotelSelectedAmenitiesCategory = (state: TAppState) => state.createHotel.selectedAmenitiesCategory;
export const getHotelSelectedAmenities = (state: TAppState) => state.createHotel.selectedAmenities;
