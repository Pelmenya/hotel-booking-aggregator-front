import { Collapse } from '@/components/collapse/collapse';
import { TAmenity } from '@/types/t-hotel-res-data';
import { useTranslation } from 'react-i18next';
import { THotelPageProps } from '../hotel-page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIconByAmenity } from '@/icons/fortawesome/get-icon-by-amenity';

export const HotelAmenities = ({ data }: THotelPageProps) => {
    const { t, i18n } = useTranslation('common');

    const renderAmenities = (amenitiesList: TAmenity[], title: string) => (
        <div
            className="p-4 rounded-xl border border-base-300 h-full"
            key={title}
        >
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            {amenitiesList.map((item) => {
                const icon = getIconByAmenity(item.name.trim());
                return (
                    <p
                        className="text-sm mb-1 flex items-center"
                        key={item.idx}
                    >
                        {icon && (
                            <FontAwesomeIcon icon={icon} className="mr-2" />
                        )}
                        {item.name}
                    </p>
                );
            })}
        </div>
    );

    return (
        <>
            {data &&
            Array.isArray(data.amenities.ru) &&
            Array.isArray(data.amenities.en) &&
            (i18n.language === 'ru'
                ? data.amenities.ru
                : data.amenities.en
            ).filter(
                (amenities) => amenities.type === 'additional').length 
                ? (
                    <Collapse
                        title={t('HOTEL_BLOCK_TITLE_AMENITIES', 'Все удобства')}
                        type={'arrow'}
                        fullView={true}
                    >
                        <>
                            {data?.amenities &&
                            Array.isArray(data.amenities.ru) &&
                            Array.isArray(data.amenities.en) &&
                            data.amenities.en.length > 0 && (
                                <ul className="flex flex-wrap gap-4">
                                    {(i18n.language === 'ru'
                                        ? data.amenities.ru
                                        : data.amenities.en
                                    )
                                        .filter(
                                            (amenities) =>
                                                amenities.type === 'additional'
                                        )
                                        .sort(
                                            (a, b) =>
                                                b.amenities_list.length -
                                                a.amenities_list.length
                                        )
                                        .map((amenity) => (
                                            <li
                                                className="flex-1 min-w-[250px]"
                                                key={amenity.id}
                                            >
                                                {renderAmenities(
                                                    amenity.amenities_list,
                                                    amenity.title
                                                )}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </>
                    </Collapse>
                ) : null}
        </>
    );
};
