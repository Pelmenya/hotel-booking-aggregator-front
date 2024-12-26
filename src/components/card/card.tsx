import { Carousel } from '@/components/card/components/carousel/carousel';
import { THotel } from '@/types/t-hotel';
import { THotelRoom } from '@/types/t-hotel-room';
import cn from 'classnames';

import styles from './card.module.css';

export type TCardProps = (any) & {
    onClick: (id: string) => void;
};

export const Card = ({
    name,
    name_en,
    id,
    images,
    onClick,
}: TCardProps) => {
    return (
        <div
            id={id}
            onClick={() => {
                onClick(id);
            }}
            className="card card-side bg-base-300 shadow-xl rounded-3xl cursor-pointer flex-col sm:flex-col md:flex-row"
        >
            <Carousel images={images} idx={id} />
            <div className="py-4 px-4 md:max-w-[380px] w-full rounded-3xl">
                <div className="h-full">
                    <h6 className={cn('font-bold text-lg', styles.title)}>{name}</h6>
                    <p className={styles.description}>{name_en}</p>
                </div>
            </div>
        </div>
    );
};
