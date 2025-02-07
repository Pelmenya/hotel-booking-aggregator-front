import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { TAmenityCategory } from '@/redux/api/amenities-api';
import { getIconByAmenity } from '@/icons/fortawesome/get-icon-by-amenity';

export type TRealEstateAmenitiesCategoryListProps = {
    categories: TAmenityCategory[] | null;
    selectedCategory: string | null;
    onCategorySelect: (categoryId: string) => void;
};

export const RealEstateAmenitiesCategoryList: React.FC<TRealEstateAmenitiesCategoryListProps> = ({ categories, selectedCategory, onCategorySelect }) => (
    <ul className="join join-vertical pt-4 space-y-2 w-full">
        {categories?.map((category) => (
            <li
                key={category.title}
                tabIndex={0}
                className={cn(
                    'join-item btn btn-lg grid grid-cols-6 w-full',
                    { 'btn-active': selectedCategory === category.title }
                )}
                onClick={() => onCategorySelect(category.title)}
            >
                <span className="text-xl text-primary">
                    <FontAwesomeIcon icon={getIconByAmenity(category.title) } />
                </span>
                <span className="block w-full col-span-5 flex">
                    {category.title}
                </span>
            </li>
        ))}
    </ul>
);

