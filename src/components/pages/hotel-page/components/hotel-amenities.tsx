import { Collapse } from '@/components/collapse/collapse';
import { TAmenity } from '@/types/t-hotel-res-data';
import { useTranslation } from 'react-i18next';
import { THotelPageProps } from '../hotel-page';

export const HotelAmenities = ({ data }: THotelPageProps) => {
    const { t, i18n } = useTranslation('common');

    const renderAmenities = (amenitiesList: TAmenity[], title: string) => (
        <div
            className="p-4 rounded-lg border border-base-300 h-full"
            key={title}
        >
            <h4 className="text-lg font-semibold">{title}</h4>
            {amenitiesList.map((item) => (
                <p className="text-sm mb-1" key={item.idx}>
                    {item.name}
                </p>
            ))}
        </div>
    );

    return (
        <Collapse title={t('HOTEL_BLOCK_TITLE_AMENITIES', 'Все удобства')} type={'arrow'} fullView={true}>
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
    );
};
