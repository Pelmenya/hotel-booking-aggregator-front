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
import { RealEstateAmenitiesSubcategoryList } from './components/real-estate-amenities-subcategory-list';

export const RealEstateAmenitiesChange: React.FC = () => {
    const { i18n } = useTranslation('form');
    const { data: realEstateAmenitiesCategories } = useGetAmenitiesQuery('ALL');
    const dispatch = useAppDispatch();

    const selectedCategoryFromRedux = useAppSelector(
        getHotelSelectedAmenitiesCategory
    );
    const selectedAmenities = useAppSelector(getHotelSelectedAmenities);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        selectedCategoryFromRedux
    );

    const categories =
        i18n.language === 'ru'
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
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full flex-auto md:min-h-[390px]">
            <div className="w-full lg:col-span-2">
                <RealEstateAmenitiesCategoryList
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />
            </div>

            <div className="w-full lg:col-span-5 mt-4">
                {selectedCategory !== null && categories && (
                    <RealEstateAmenitiesSubcategoryList
                        subcategories={
                            categories.find(
                                (category) => category.title === selectedCategory
                            )?.amenities || []
                        }
                        selectedSubcategories={selectedAmenities}
                        onSubcategorySelect={handleSubcategorySelect}
                    />
                )}
            </div>
        </div>
    );
};
