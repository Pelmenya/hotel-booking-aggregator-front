import { Carousel } from '@/components/card/components/carousel/carousel';
import { THotelResData } from '@/types/t-hotel-res-data';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './card.module.css';

export type TCardProps = THotelResData & {
    onClick: (id: string) => void;
};

export const Card = ({
    hotel,
    images,
    amenities,
    locations,
    onClick,
}: TCardProps) => {
    const { i18n } = useTranslation();

    return (
        <div
            id={hotel.id}
            onClick={() => {
                // onClick(id);
            }}
            className="card card-side bg-base-200 shadow-xl rounded-3xl cursor-pointer flex-col sm:flex-col md:flex-row"
        >
            <Carousel
                images={images}
                alt={i18n.language === 'ru' ? hotel.name : hotel.name_en}
            />
            <div className="py-4 px-4 md:max-w-[380px] w-full rounded-3xl">
                <div className="flex flex-col gap-2 h-full">
                    <h6 className={cn('font-bold text-lg', styles.title)}>
                        {i18n.language === 'ru' ? hotel.name : hotel.name_en}
                    </h6>
                    {hotel.stars && hotel.stars > 0 ? (
                        <p className="text-xs">Звездность: {hotel.stars}*</p>
                    ) : (
                        <></>
                    )}
                    {hotel.rating && hotel.rating > 0 ? (
                        <p className="text-xs">Рейтинг: {hotel.rating}</p>
                    ) : (
                        <></>
                    )}

                    <p className="text-primary text-xs">
                        {i18n.language === 'ru'
                            ? 'Адрес: ' + locations.ru.address
                            : 'Address: ' + locations.en.address}
                    </p>
                </div>
            </div>
        </div>
    );
};
