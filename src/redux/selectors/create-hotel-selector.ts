import { TAppState } from '../../types/t-app-state';

export const getCreateHotelStateStep = (state: TAppState) => state.createHotel.step;
export const getCreateHotelStateSelectedCategory = (state: TAppState) => state.createHotel.selectedCategory;
export const getCreateHotelStateSelectedSubcategory = (state: TAppState) => state.createHotel.selectedSubcategory;
export const getCreateHotelStateRealEstateType = (state: TAppState) => state.createHotel.realEstateType;
export const getHotelTitle = (state: TAppState) => state.createHotel.hotelTitle;
export const getHotelAddress = (state: TAppState) => state.createHotel.hotelAddress;
export const getHotelCondition = (state: TAppState) => state.createHotel.hotelCondition;
export const getHotelArea = (state: TAppState) => state.createHotel.hotelArea;
export const getHotelFloor = (state: TAppState) => state.createHotel.hotelFloor;
export const getHotelFloors = (state: TAppState) => state.createHotel.hotelFloors;
export const getHotelCoordinates = (state: TAppState) => state.createHotel.hotelCoordinates;
export const getHotelSelectedAmenitiesCategory = (state: TAppState) => state.createHotel.selectedAmenitiesCategory;
export const getHotelSelectedAmenities = (state: TAppState) => state.createHotel.selectedAmenities;
export const getHotelKitchenType = (state: TAppState) => state.createHotel.kitchenType;
export const getHotelCountRooms = (state: TAppState) => state.createHotel.countRooms;
export const getHotelCountGuests = (state: TAppState) => state.createHotel.countGuests;
