import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    getHotelSelectedAmenitiesCategory,
    getHotelSelectedAmenities
} from '@/redux/selectors/create-hotel-selector';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useGetAmenitiesQuery } from '@/redux/api/amenities-api';
import { RealEstateAmenitiesCategoryList } from './components/real-estate-amenities-category-list';
import { setSelectedAmenitiesCategory, toggleAmenity } from '@/redux/slices/create-hotel-slice';

export const RealEstateAmenitiesChange: React.FC = () => {
    const { i18n } = useTranslation('form');
    const { data: realEstateAmenitiesCategories } = useGetAmenitiesQuery('ALL');
    const dispatch = useAppDispatch();

    const selectedCategoryFromRedux = useAppSelector(getHotelSelectedAmenitiesCategory);
    const selectedAmenities = useAppSelector(getHotelSelectedAmenities);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(selectedCategoryFromRedux);

    const categories = i18n.language === 'ru'
        ? realEstateAmenitiesCategories?.map((category) => category.ru)
        : realEstateAmenitiesCategories?.map((category) => category.en);

    const handleCategorySelect = (categoryId: string) => {
        dispatch(setSelectedAmenitiesCategory(categoryId));
        setSelectedCategory(categoryId);
    };

    const handleSubcategorySelect = (subcategoryId: string) => {
        dispatch(toggleAmenity(subcategoryId));
    };

    return (
        <div className="grid grid-cols-1 pt-4 gap-4 w-full flex-auto md:min-h-[390px]">
            <div className="w-full">
                <RealEstateAmenitiesCategoryList
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    selectedSubcategories={selectedAmenities}
                    onCategorySelect={handleCategorySelect}
                    onSubcategorySelect={handleSubcategorySelect}
                />
            </div>
        </div>
    );
};