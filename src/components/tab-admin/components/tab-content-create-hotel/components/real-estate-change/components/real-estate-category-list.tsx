import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { TRealEstateCategories } from '@/redux/api/real-estate-api';

export type TRealEstateCategoryListProps = {
    categories: TRealEstateCategories | null;
    selectedCategory: number | null;
    onCategorySelect: (categoryId: number) => void;
};

export const RealEstateCategoryList: React.FC<TRealEstateCategoryListProps> = ({ categories, selectedCategory, onCategorySelect }) => (
    <ul className="join join-vertical pt-4 space-y-2 w-full">
        {categories?.map((category) => (
            <li
                key={category.id}
                tabIndex={0}
                className={cn(
                    'join-item btn btn-lg grid grid-cols-6 w-full',
                    { 'btn-active': selectedCategory === category.id }
                )}
                onClick={() => onCategorySelect(category.id)}
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
);

