import { Carousel } from '@/components/card/components/carousel/carousel';
import { THotelResData } from '@/types/t-hotel-res-data';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './card.module.css';

export type TCardProps = THotelResData & {
    onClick: (id: string) => void;
};

export const Card = ({
    name,
    name_en,
    hotel_link_ostrovok,
    rating,
    stars,
    id,
    images,
    locations,
    onClick,
}: TCardProps) => {
    const { i18n } = useTranslation();

    return (
        <div
            id={id}
            onClick={() => {
                onClick(id);
            }}
            className="card card-side bg-base-300 shadow-xl rounded-3xl cursor-pointer flex-col sm:flex-col md:flex-row"
        >
            <Carousel images={images} />
            <div className="py-4 px-4 md:max-w-[380px] w-full rounded-3xl">
                <div className="h-full">
                    <h6 className={cn('font-bold text-lg', styles.title)}>{i18n.language === 'ru' ? name : name_en}</h6>
                    <p >{i18n.language === 'ru' ? locations.ru : locations.en}</p>
                </div>
            </div>
        </div>
    );
};
