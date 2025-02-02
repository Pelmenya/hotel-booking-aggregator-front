import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TRealEstateCategories,
    useGetRealEstateQuery,
} from '@/redux/api/real-estate-api';
import {
    saveSelectedCategory,
    saveSelectedRealEstateType,
    saveSelectedSubcategory,
} from '@/redux/slices/create-hotel-slice';
import { RealEstateCategoryList } from './components/real-estate-category-list';
import { RealEstateSubcategoryList } from './components/real-estate-subcategory-list';
import {
    getCreateHotelStateSelectedCategory,
    getCreateHotelStateSelectedSubcategory,
} from '@/redux/selectors/create-hotel-selector';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';

export const RealEstateChange: React.FC = () => {
    const { i18n } = useTranslation('form');
    const { data: realEstateCategories } = useGetRealEstateQuery('ALL');
    const dispatch = useAppDispatch();

    const selectedCategoryFromRedux = useAppSelector(
        getCreateHotelStateSelectedCategory
    );
    const selectedSubcategoryFromRedux = useAppSelector(
        getCreateHotelStateSelectedSubcategory
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
        const categoryRu = realEstateCategories?.ru?.find(
            (category) => category.id  === (i18n.language === 'en' ? Number(selectedCategory) - 1: selectedCategory)
        );
        const categoryEn = realEstateCategories?.en?.find(
            (category) => category.id  === (i18n.language === 'ru' ? Number(selectedCategory) + 1: selectedCategory)
        );

        if (categoryRu && categoryEn) {
            const subcategoryRu = categoryRu.subcategories.find(
                (subcategory) => subcategory.id  === (i18n.language === 'en' ? Number(selectedSubcategory) - 1: selectedSubcategory)
            );
            const subcategoryEn = categoryEn.subcategories.find(
                (subcategory) => subcategory.id  === (i18n.language === 'ru' ? Number(selectedSubcategory) + 1: selectedSubcategory)
            );

            if (subcategoryEn && subcategoryRu) {
                dispatch(
                    saveSelectedRealEstateType({
                        ru: subcategoryRu.name,
                        en: subcategoryEn.name,
                    })
                );
            }
        }
    }, [
        selectedCategory,
        selectedSubcategory,
        categories,
        dispatch,
        realEstateCategories,
        i18n,
    ]);

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
