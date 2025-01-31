import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TRealEstateCategories,
    useGetRealEstateQuery,
} from '@/redux/api/real-estate-api';
import { useSelector, useDispatch } from 'react-redux';
import {
    setStep,
    saveSelectedCategory,
    saveSelectedSubcategory,
} from '@/redux/slices/create-hotel-slice';
import { RealEstateCategoryList } from './components/real-estate-category-list';
import { RealEstateSubcategoryList } from './components/real-estate-subcategory-list';

export const RealEstateChange: React.FC = () => {
    const { t, i18n } = useTranslation('form');
    const { data: realEstateCategories } = useGetRealEstateQuery('ALL');
    const dispatch = useDispatch();

    const selectedCategoryFromRedux = useSelector(
        (state: any) => state.createHotel.selectedCategory
    );
    const selectedSubcategoryFromRedux = useSelector(
        (state: any) => state.createHotel.selectedSubcategory
    );

    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        selectedCategoryFromRedux
    );
    const [selectedSubcategory, setSelectedSubcategory] = useState<
        number | null
    >(selectedSubcategoryFromRedux);

    const categories: TRealEstateCategories | undefined =
        i18n.language === 'ru'
            ? realEstateCategories?.ru
            : realEstateCategories?.en;

    useEffect(() => {
        dispatch(saveSelectedCategory(selectedCategory));
        dispatch(saveSelectedSubcategory(selectedSubcategory));
    }, [selectedCategory, selectedSubcategory, dispatch]);

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategory(categoryId);
        setSelectedSubcategory(null);
    };

    const handleSubcategorySelect = (subcategoryId: number) => {
        setSelectedSubcategory(subcategoryId);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full flex-auto md:min-h-[390px]">
            <div className="w-full lg:col-span-2">
                <RealEstateCategoryList
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />
            </div>

            <div className="w-full lg:col-span-5 mt-4">
                {selectedCategory !== null && categories && (
                    <RealEstateSubcategoryList
                        subcategories={
                            categories.find(
                                (category) => category.id === selectedCategory
                            )?.subcategories || []
                        }
                        selectedSubcategory={selectedSubcategory}
                        onSubcategorySelect={handleSubcategorySelect}
                    />
                )}
            </div>
        </div>
    );
};
