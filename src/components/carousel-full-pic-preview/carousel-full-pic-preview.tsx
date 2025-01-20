import { getImageUrl } from 'utils/get-image-url';
import cn from 'classnames';

import styles from './carousel-full-pic-preview.module.css';
import { useEffect, useRef, useState } from 'react';
import { TImage } from '@/types/t-hotel-res-data';

export type TCarouselFullPicPreviewProps = { images: TImage[]; name: string };

export const CarouselFullPicPreview = ({
    images,
    name,
}: TCarouselFullPicPreviewProps) => {
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
        <>
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
                                'btn btn-circle btn-sm opacity-75 hover:btn-md hover:bg-white hover:text-black',
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
                                'btn btn-circle btn-sm opacity-75 hover:btn-md hover:bg-white hover:text-black',
                                { ['invisible']: !canScrollRight }
                            )}
                        >
                            ❯
                        </button>
                    </div>
                ) : (
                    <></>
                )}

                <ul ref={listRef} className="carousel">
                    {images.map((image, idx) => (
                        <li
                            id={image.path}
                            key={image.id}
                            className={cn(
                                'carousel-item w-full items-center justify-center'
                            )}
                        >
                            <picture>
                                <img
                                    className={cn(
                                        'rounded-3xl min-h-[35vh] sm:min-h-[60vh] lg:min-h-[70vh]',
                                        styles.pic
                                    )}
                                    src={getImageUrl(image.path)}
                                    alt={name + ' - ' + idx }
                                />
                            </picture>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex w-full py-2 gap-2 overflow-x-auto">
                {images.map((image, idx) => (
                    <a
                        href={`#${image.path}`}
                        key={image.id}
                        className="flex shrink-0"
                    >
                        <picture>
                            <img
                                className="h-12 w-12 rounded"
                                src={getImageUrl(image.path)}
                                alt={name + ' - ' + idx}
                            />
                        </picture>
                    </a>
                ))}
            </div>
        </>
    );
};
