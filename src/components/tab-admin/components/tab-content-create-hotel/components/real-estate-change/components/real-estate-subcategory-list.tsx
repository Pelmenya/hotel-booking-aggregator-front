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

export const RealEstateSubcategoryList: React.FC<
    RealEstateSubcategoryListProps
> = ({ subcategories, selectedSubcategory, onSubcategorySelect }) => (
    <ul className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subcategories?.map((subcategory) => (
            <li
                key={subcategory.id}
                tabIndex={0}
                className={cn('btn flex justify-between items-center w-full', {
                    'btn-active': selectedSubcategory === subcategory.id,
                })}
                onClick={() => onSubcategorySelect(subcategory.id)}
            >
                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <input
                            type="radio"
                            checked={selectedSubcategory === subcategory.id}
                            className="radio radio-primary radio-sm"
                            readOnly
                        />
                        <div className="text-left leading-4 max-w-[250px] sm:max-w-none lg:max-w-[250px] break-words">
                            {subcategory.name}
                        </div>
                    </div>
                    <span className="text-primary">
                        <FontAwesomeIcon icon={Icons[subcategory.icon]} />
                    </span>
                </div>
            </li>
        ))}
    </ul>
);
