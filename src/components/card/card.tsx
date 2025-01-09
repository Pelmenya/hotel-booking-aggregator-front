import { Carousel } from '@/components/card/components/carousel/carousel';
import { TAmenity, THotelResData } from '@/types/t-hotel-res-data';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Ostrovok from '../../icons/ostrovok/ostrovok.svg';
import Rating from '../../icons/hand-thumb-up.svg';
import Star from '../../icons/star.svg';

import styles from './card.module.css';
import { useCallback } from 'react';

export type TCardProps = THotelResData & {
    onClick: (id: string) => void;
};

export const Card = ({
    hotel,
    images,
    amenities,
    locations,
    geoData,
    onClick,
}: TCardProps) => {
    const { t, i18n } = useTranslation('common');

    const getSortAmenities = useCallback((a: TAmenity[]) => {
        const sortAmenities = [...a].sort((a,b) => a.name.length - b.name.length)
        return sortAmenities
    }, [])

    return (
        <div
            id={hotel.id}
            onClick={() => {
                // onClick(id);
            }}
            className="card card-side bg-base-200 shadow-xl rounded-3xl cursor-pointer flex-col sm:flex-col lg:flex-row h-full"
        >
            <Carousel
                images={images}
                alt={i18n.language === 'ru' ? hotel.name : hotel.name_en}
            />
            <div className="py-4 px-4 lg:max-w-[380px] w-full rounded-3xl flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-2 h-full">
                    <h6 className={cn('font-bold text-lg', styles.title)}>
                        {i18n.language === 'ru' ? hotel.name : hotel.name_en}
                    </h6>
                    <div className='flex gap-2'>
                        {hotel.stars && hotel.stars > 0 ? (
                            <p className="text-xs flex">
                                <Star /> {hotel.stars}*
                            </p>
                        ) : (
                            <></>
                        )}
                        {hotel.rating && hotel.rating > 0 ? (
                            <p className="text-xs flex">
                                <Rating /> {'' + hotel.rating}
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>

                    <p className="text-primary text-xs">
                        {i18n.language === 'ru'
                            ? 'Адрес: ' + locations.ru.address
                            : 'Address: ' + locations.en.address}
                    </p>
                    {amenities.ru ? (
                        <div className="flex gap-2 flex-wrap">
                            {i18n.language === 'ru'
                                ? getSortAmenities(amenities.ru.amenities_list).map((item) => (
                                    <p
                                        className="badge badge-sm badge-host text-xs"
                                        key={item.idx}
                                    >
                                        {item.name}
                                    </p>
                                ))
                                : getSortAmenities(amenities.en.amenities_list).map((item) => (
                                    <p
                                        className="badge badge-sm badge-host text-xs"
                                        key={item.idx}
                                    >
                                        {item.name}
                                    </p>
                                ))}
                        </div>
                    ) : (
                        <></>
                    )}
                    {geoData ? (
                        <div>
                            {i18n.language === 'ru'
                                ? geoData.ru.geo_list.map((item) => (
                                    <p
                                        className="text-warning text-xs"
                                        key={item.idx}
                                    >
                                        {item.name} ~{' '}
                                        {item.distance_from_hotel}{' '}
                                        {item.measurement}
                                    </p>
                                ))
                                : geoData.en.geo_list.map((item) => (
                                    <p
                                        className="text-warning text-xs"
                                        key={item.idx}
                                    >
                                        {item.name} ~{' '}
                                        {item.distance_from_hotel}{' '}
                                        {item.measurement}
                                    </p>
                                ))}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <a
                    className="underline underline-offset-8"
                    target={'_blank'}
                    href={
                        process.env.NEXT_PUBLIC_BASE_OSTROVOK +
                        hotel.hotel_link_ostrovok
                    }
                    rel="noreferrer"
                >
                    {'-> ' + t('BOOKING', 'Забронировать на') + ': '}
                    <Ostrovok /> {''}
                </a>
            </div>
        </div>
    );
};
