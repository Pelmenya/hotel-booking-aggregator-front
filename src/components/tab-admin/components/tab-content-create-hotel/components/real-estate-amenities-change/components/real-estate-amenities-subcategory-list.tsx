import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { getIconByAmenity } from '@/icons/fortawesome/get-icon-by-amenity';

type RealEstateSubcategoryListProps = {
    subcategories: string[];
    selectedSubcategories: string[];
    onSubcategorySelect: (subcategoryId: string) => void;
};

export const RealEstateAmenitiesSubcategoryList: React.FC<
    RealEstateSubcategoryListProps
> = ({ subcategories, selectedSubcategories, onSubcategorySelect }) => (
    <ul className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
        {subcategories.map((subcategory) => (
            <li
                key={subcategory}
                tabIndex={0}
                className={cn('btn flex justify-between items-center w-full', {
                    'btn-active': selectedSubcategories.includes(subcategory),
                })}
                onClick={() => onSubcategorySelect(subcategory)}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(subcategory)}
                        onChange={() => onSubcategorySelect(subcategory)}
                        className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span
                        className="block leading-4 max-w-[160px] sm:max-w-none lg:max-w-[290px] whitespace-nowrap overflow-hidden"
                        style={{ textOverflow: 'ellipsis' }}
                    >
                        {subcategory}
                    </span>
                </div>
                <span className="text-primary">
                    <FontAwesomeIcon icon={getIconByAmenity(subcategory)} />
                </span>
            </li>
        ))}
    </ul>
);
