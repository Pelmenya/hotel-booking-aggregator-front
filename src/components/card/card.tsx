import { Carousel } from '@/components/card/components/carousel/carousel';
import { THotel } from '@/types/t-hotel';
import { THotelRoom } from '@/types/t-hotel-room';

import styles from './card.module.css';

export type TCardProps = (THotel | THotelRoom) & {
    onClick: (id: string) => void;
};

export const Card = ({
    title,
    id,
    description,
    images,
    onClick,
}: TCardProps) => {
    return (
        <div
            id={id}
            onClick={() => {
                onClick(id);
            }}
            className="card card-side bg-base-300 shadow-xl rounded-3xl gap-4 cursor-pointer flex-col sm:flex-col md:flex-row"
        >
            <Carousel pictures={images} idx={id} />
            <div className="py-4 pr-4 max-w-[380px] w-full rounded-3xl">
                <div className="h-full">
                    <h6 className="font-bold text-lg">{title}</h6>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </div>
    );
};
