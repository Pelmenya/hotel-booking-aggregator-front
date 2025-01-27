import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useGetRealEstateQuery } from '@/redux/api/real-estate-api';
import cn from 'classnames'; // Импортируем classnames

export const RealEstateChange = () => {
    const { t, i18n } = useTranslation('form');
    const { data: realEstateCategories } = useGetRealEstateQuery('ALL');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    // Получение категорий на основе текущего языка
    const categories =
        i18n.language === 'ru'
            ? realEstateCategories?.ru
            : realEstateCategories?.en;

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedSubcategory(null); // Сброс подкатегории при выборе новой категории
    };

    const handleSubcategorySelect = (subcategoryId) => {
        setSelectedSubcategory(subcategoryId);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="w-full lg:col-span-1">
                <ul className="join join-vertical pt-4 space-y-2 w-full">
                    {categories?.map((category) => (
                        <li
                            key={category.id}
                            className={cn(
                                'join-item btn btn-lg flex gap-2 items-center justify-between w-full',
                                {
                                    'btn-active': selectedCategory === category.id,
                                }
                            )}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            <div className="flex gap-2 items-center">
                                <span className="text-2xl text-primary">
                                    <FontAwesomeIcon icon={Icons[category.icon]} />
                                </span>
                                <span>{category.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full lg:col-span-3 mt-4">
                {selectedCategory !== null && categories && (
                    <ul className="grid w-full grid-cols-1 xl:grid-cols-2 gap-4">
                        {categories
                            .find(
                                (category) => category.id === selectedCategory
                            )
                            ?.subcategories?.map((subcategory) => (
                                <li
                                    key={subcategory.id}
                                    className={cn(
                                        'btn flex justify-between items-center w-full',
                                        {
                                            'btn-active':
                                                selectedSubcategory ===
                                                subcategory.id,
                                        }
                                    )}
                                    onClick={() =>
                                        handleSubcategorySelect(subcategory.id)
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={
                                                selectedSubcategory ===
                                                subcategory.id
                                            }
                                            onChange={() =>
                                                handleSubcategorySelect(
                                                    subcategory.id
                                                )
                                            }
                                            className="radio radio-sm radio-primary"
                                        />
                                        <span>{subcategory.name}</span>
                                    </div>
                                    <span className="text-primary">
                                        <FontAwesomeIcon
                                            icon={Icons[subcategory.icon]}
                                        />
                                    </span>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
