import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { getImageUrl } from 'utils/getImageUrl';
import styles from './carousel.module.css';
import { TImage } from '@/types/t-hotel-res-data';

export type TCarouselProps = {
    images: TImage[];
    alt?: string;
};

export const Carousel = ({ images, alt = '' }: TCarouselProps) => {
    const [scrollLength, setScrollLength] = useState<number>(0);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

    const listRef = useRef<HTMLUListElement>(null);

    const checkForScrollPosition = () => {
        const { current } = listRef;
        if (current) {
            const { scrollLeft, scrollWidth, clientWidth } = current;
            setScrollLength(current.getBoundingClientRect().width);
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
        }
    };

    const scrollContainerBy = (distance: number) =>
        listRef.current?.scrollBy({ left: distance, behavior: 'smooth' });

    useEffect(() => {
        const { current } = listRef;
        checkForScrollPosition();
        current?.addEventListener('scroll', checkForScrollPosition);

        return () =>
            current?.removeEventListener('scroll', checkForScrollPosition);
    }, []);

    return (
        <div className={styles.wrapper}>
            {images.length > 1 ? (
                <div
                    className={cn(
                        'absolute items-center justify-between transform -translate-y-1/2 left-3 right-3 top-1/2 min-h-2',
                        styles.buttons
                    )}
                >
                    <button
                        onClick={(e) => {
                            scrollContainerBy(-scrollLength);
                            e.stopPropagation();
                        }}
                        className={cn(
                            'btn btn-circle btn-xs opacity-75 hover:btn-sm hover:bg-white hover:text-black',
                            { ['invisible']: !canScrollLeft }
                        )}
                    >
                        ❮
                    </button>
                    <button
                        onClick={(e) => {
                            scrollContainerBy(scrollLength);
                            e.stopPropagation();
                        }}
                        className={cn(
                            'btn btn-circle btn-xs opacity-75 hover:btn-sm hover:bg-white hover:text-black',
                            { ['invisible']: !canScrollRight }
                        )}
                    >
                        ❯
                    </button>
                </div>
            ) : (
                <></>
            )}
            <ul
                className="carousel max-w-full md:w-52 sm:w-full rounded-t-3xl sm:rounded-t-3xl md:rounded-l-3xl md:rounded-r-none bg-gray-800 cursor-pointer"
                ref={listRef}
            >
                {images.map((img: TImage) => (
                    <li
                        key={img.id}
                        className="carousel-item scroll-py-10 w-full flex items-center justify-center"
                    >
                        <picture className="w-full h-52">
                            <img
                                src={getImageUrl(img.path)}
                                className="object-cover w-full h-full"
                                alt={alt}
                            />
                        </picture>
                    </li>
                ))}
            </ul>
        </div>
    );
};
