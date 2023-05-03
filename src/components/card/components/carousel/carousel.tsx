import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { getImageUrl } from 'utils/getImageUrl';

export type TCarouselProps = {
    pictures: string[];
    idx: string;
};

export const Carousel = ({ idx, pictures }: TCarouselProps) => {
    const [isArrows, setArrows] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

    const listRef = useRef<HTMLUListElement>(null);

    const checkForScrollPosition = () => {
        const { current } = listRef;
        if (current) {
            const { scrollLeft, scrollWidth, clientWidth } = current;
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
        <div
            className="relative"
            onMouseOver={() => setArrows(true)}
            onMouseOut={() => setArrows(false)}
        >
            <ul
                className="carousel max-w-md sm:max-w-none rounded-t-3xl sm:rounded-t-3xl md:w-52 sm:w-full md:rounded-l-3xl md:rounded-r-none bg-gray-800 cursor-pointer"
                ref={listRef}
            >
                {pictures.map((picture) => (
                    <li
                        key={picture}
                        className="carousel-item scroll-py-10 w-full max-w-md sm:max-w-none flex items-center justify-center"
                    >
                        <picture>
                            <img
                                src={getImageUrl(picture)}
                                className="object-cover h-52 sm:w-full md:w-52"
                                alt=""
                            />
                        </picture>
                    </li>
                ))}
            </ul>
            {pictures.length > 1 ? (
                <div
                    className={cn(
                        'absolute flex items-center justify-between transform -translate-y-1/2 left-3 right-3 top-1/2 min-h-2',
                        { ['hidden']: !isArrows }
                    )}
                >
                    <button
                        onClick={() => scrollContainerBy(-204)}
                        className={cn(
                            'btn btn-circle btn-xs opacity-75 hover:btn-sm hover:bg-white hover:text-black',
                            { ['invisible']: !canScrollLeft }
                        )}
                    >
                        ❮
                    </button>
                    <button
                        onClick={() => scrollContainerBy(204)}
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
        </div>
    );
};
