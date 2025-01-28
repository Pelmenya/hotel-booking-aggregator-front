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
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full">
            <div className="w-full lg:col-span-2">
                <ul className="join join-vertical pt-4 space-y-2 w-full">
                    {categories?.map((category) => (
                        <li
                            key={category.id}
                            className={cn(
                                'join-item btn btn-lg grid grid-cols-6 w-full ',
                                {
                                    'btn-active':
                                        selectedCategory === category.id,
                                }
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
                    <ul className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4">
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
                                        <span className="block lg:max-w-[220px] overflow-hidden whitespace-nowrap" style={{ textOverflow: 'ellipsis' }}>
                                            {subcategory.name}
                                        </span>
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
