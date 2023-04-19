import { SyntheticEvent } from 'react';
import { Carousel } from '@/components/carousel/carousel';
import { THotel } from '@/types/t-hotel';
import styles from './hotel-card.module.css';

export type THotelCardProps = THotel & {
    onClick: (id: string) => void;
};

export const HotelCard = ({
    title,
    id,
    description,
    images,
    onClick,
}: THotelCardProps) => {
    return (
        <div
            id={id}
            onClick={(e) => {
                if (!(e.target instanceof HTMLAnchorElement)) {
                    onClick(id);
                }
            }}
            className="card card-side bg-base-200 shadow-xl rounded-3xl gap-4 cursor-pointer flex-col sm:flex-col md:flex-row"
        >
            <Carousel pictures={images} idx={id} />
            <div className="py-4 pr-4 max-w-[380px] w-full rounded-3xl">
                <div className="h-full ">
                    <h6 className="text-primary">{title}</h6>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </div>
    );
};
