import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useGetRealEstateQuery } from '@/redux/api/real-estate-api';

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
        <>
            <ul className="join">
                {categories?.map((category) => (
                    <li
                        key={category.id}
                        className={`join-item btn btn-lg flex gap-2 ${
                            selectedCategory === category.id ? 'btn-active' : ''
                        }`}
                        onClick={() => handleCategorySelect(category.id)}
                    >
                        <span>{category.name}</span>
                        <span className="text-2xl text-primary">
                            <FontAwesomeIcon icon={Icons[category.icon]} />
                        </span>
                    </li>
                ))}
            </ul>

            <div className="p-4 w-full">
                <div className="mt-4">
                    {selectedCategory !== null && categories && (
                        <ul className="grid w-full grid-cols-2 md:grid-cols-3 gap-4">
                            {categories
                                .find(
                                    (category) =>
                                        category.id === selectedCategory
                                )
                                ?.subcategories?.map((subcategory) => (
                                    <li
                                        key={subcategory.id}
                                        className={`btn flex gap-2 items-center ${
                                            selectedSubcategory ===
                                            subcategory.id
                                                ? 'btn-active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handleSubcategorySelect(
                                                subcategory.id
                                            )
                                        }
                                    >
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
                                            className="radio radio-primary"
                                        />
                                        <span>{subcategory.name}</span>
                                        <span>{subcategory.icon}</span>
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
        </>
    );
};
