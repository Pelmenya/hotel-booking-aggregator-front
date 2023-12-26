import { getImageUrl } from 'utils/getImageUrl';
import cn from 'classnames';

import styles from './carousel-full-pic-preview.module.css';
import { useEffect, useRef, useState } from 'react';

export const CarouselFullPicPreview = ({ images }: { images: string[] }) => {
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
                    {images.map((url) => (
                        <li
                            id={url}
                            key={url}
                            className={cn(
                                'carousel-item w-full items-center justify-center'
                            )}
                        >
                            <picture>
                                <img
                                    className={cn('rounded-3xl', styles.pic)}
                                    src={getImageUrl(url)}
                                    alt=""
                                />
                            </picture>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex w-full py-2 gap-2 overflow-x-auto">
                {images.map((url, idx) => (
                    <a
                        href={`#${url}`}
                        key={url + idx}
                        className="flex shrink-0"
                    >
                        <picture>
                            <img
                                className="h-12 w-12 rounded"
                                src={getImageUrl(url)}
                                alt=""
                            />
                        </picture>
                    </a>
                ))}
            </div>
        </>
    );
};
