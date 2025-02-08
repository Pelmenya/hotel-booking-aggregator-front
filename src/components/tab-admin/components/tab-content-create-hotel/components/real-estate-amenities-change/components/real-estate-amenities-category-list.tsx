import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { TAmenityCategory } from '@/redux/api/amenities-api';
import { getIconByAmenity } from '@/icons/fortawesome/get-icon-by-amenity';
import { RealEstateAmenitiesSubcategoryList } from './real-estate-amenities-subcategory-list';

export type TRealEstateAmenitiesCategoryListProps = {
    categories: TAmenityCategory[] | null;
    selectedCategory: string | null;
    selectedSubcategories: string[];
    onCategorySelect: (categoryId: string) => void;
    onSubcategorySelect: (subcategoryId: string) => void;
};

export const RealEstateAmenitiesCategoryList: React.FC<TRealEstateAmenitiesCategoryListProps> = ({
    categories,
    selectedCategory,
    selectedSubcategories,
    onCategorySelect,
    onSubcategorySelect
}) => (
    <div className="space-y-2">
        {categories?.map((category) => (
            <div key={category.title} className="collapse collapse-plus bg-base-100 border border-base-300">
                <input type="radio" name="amenities-accordion" defaultChecked={selectedCategory === category.title} />
                <div
                    className={cn(
                        'collapse-title btn btn-lg grid grid-cols-6 w-full',
                        { 'btn-active': selectedCategory === category.title }
                    )}
                    onClick={() => onCategorySelect(category.title)}
                >
                    <span className="text-xl text-primary">
                        <FontAwesomeIcon icon={getIconByAmenity(category.title)} />
                    </span>
                    <span className="block w-full col-span-5 flex">
                        {category.title}
                    </span>
                </div>
                <div className="collapse-content">
                    <RealEstateAmenitiesSubcategoryList
                        subcategories={category.amenities || []}
                        selectedSubcategories={selectedSubcategories}
                        onSubcategorySelect={onSubcategorySelect}
                    />
                </div>
            </div>
        ))}
    </div>
);
