import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { TRealEstateCategory } from '@/redux/api/real-estate-api';

type RealEstateSubcategoryListProps = {
    subcategories: TRealEstateCategory[];
    selectedSubcategory: number | null;
    onSubcategorySelect: (subcategoryId: number) => void;
};

export const RealEstateSubcategoryList: React.FC<RealEstateSubcategoryListProps> = ({ subcategories, selectedSubcategory, onSubcategorySelect }) => (
    <ul className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subcategories?.map((subcategory) => (
            <li
                key={subcategory.id}
                tabIndex={0}
                className={cn(
                    'btn flex justify-between items-center w-full',
                    { 'btn-active': selectedSubcategory === subcategory.id }
                )}
                onClick={() => onSubcategorySelect(subcategory.id)}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={selectedSubcategory === subcategory.id}
                        onChange={() => onSubcategorySelect(subcategory.id)}
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
);

