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
    <ul className="grid w-full grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-4 mt-4">
        {subcategories.map((subcategory) => (
            <li
                key={subcategory}
                tabIndex={0}
                className={cn('btn btn-lg text-sm flex justify-between items-center w-full', {
                    'btn-active': selectedSubcategories.includes(subcategory),
                })}
                onClick={() => {
                    onSubcategorySelect(subcategory);
                }}
            >
                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(
                                subcategory
                            )}
                            className="checkbox checkbox-primary checkbox-sm"
                            readOnly
                        />
                        <div className="text-left leading-4 max-w-[250px] sm:max-w-none lg:max-w-[250px] break-words">
                            {subcategory}
                        </div>
                    </div>
                    <span className="text-primary text-lg">
                        <FontAwesomeIcon icon={getIconByAmenity(subcategory)} />
                    </span>
                </div>
            </li>
        ))}
    </ul>
);
