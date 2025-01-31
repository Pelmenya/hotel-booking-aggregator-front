import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useGetRealEstateQuery } from '@/redux/api/real-estate-api';
import cn from 'classnames';
import { saveSelectedCategory, saveSelectedSubcategory } from '@/redux/slices/create-hotel-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';

export const RealEstateChange = () => {
    const { t, i18n } = useTranslation('form');
    const { data: realEstateCategories } = useGetRealEstateQuery('ALL');
    const dispatch = useAppDispatch();

    // Получение начальных значений из Redux
    const selectedCategoryFromRedux = useAppSelector((state) => state.createHotel.selectedCategory);
    const selectedSubcategoryFromRedux = useAppSelector((state) => state.createHotel.selectedSubcategory);

    // Локальное состояние
    const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromRedux);
    const [selectedSubcategory, setSelectedSubcategory] = useState(selectedSubcategoryFromRedux);

    // Получение категорий на основе текущего языка
    const categories = i18n.language === 'ru' ? realEstateCategories?.ru : realEstateCategories?.en;

    useEffect(() => {
        // Сохранение выбора в Redux при изменении локального состояния
        dispatch(saveSelectedCategory(selectedCategory));
        dispatch(saveSelectedSubcategory(selectedSubcategory));
    }, [selectedCategory, selectedSubcategory, dispatch]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedSubcategory(null); // Сброс подкатегории при выборе новой категории
    };

    const handleSubcategorySelect = (subcategoryId) => {
        setSelectedSubcategory(subcategoryId);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full flex-auto md:min-h-[390px]">
            <div className="w-full lg:col-span-2">
                <ul className="join join-vertical pt-4 space-y-2 w-full">
                    {categories?.map((category) => (
                        <li
                            key={category.id}
                            tabIndex={0}
                            className={cn(
                                'join-item btn btn-lg grid grid-cols-6 w-full',
                                { 'btn-active': selectedCategory === category.id }
                            )}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            <span className="text-xl text-primary">
                                <FontAwesomeIcon icon={Icons[category.icon]} />
                            </span>
                            <span className="block w-full col-span-5 flex">
                                {category.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full lg:col-span-5 mt-4">
                {selectedCategory !== null && categories && (
                    <ul className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories
                            .find((category) => category.id === selectedCategory)
                            ?.subcategories?.map((subcategory) => (
                                <li
                                    key={subcategory.id}
                                    tabIndex={0}
                                    className={cn(
                                        'btn flex justify-between items-center w-full',
                                        { 'btn-active': selectedSubcategory === subcategory.id }
                                    )}
                                    onClick={() => handleSubcategorySelect(subcategory.id)}
                                >
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={selectedSubcategory === subcategory.id}
                                            onChange={() => handleSubcategorySelect(subcategory.id)}
                                            className="radio radio-sm radio-primary"
                                        />
                                        <span
                                            className="block leading-4 max-w-[160px] sm:max-w-none lg:max-w-[160px] whitespace-nowrap overflow-hidden"
                                            style={{ textOverflow: 'ellipsis' }}
                                        >
                                            {subcategory.name}
                                        </span>
                                    </div>
                                    <span className="text-primary">
                                        <FontAwesomeIcon icon={Icons[subcategory.icon]} />
                                    </span>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
