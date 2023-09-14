import { useCallback, useRef, useState } from 'react';
import cn from 'classnames';

const videosPaths = ['tropical.mp4', 'forest.mp4', 'agua.mp4'];

export const CarouselVideo = () => {
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const listRef = useRef<HTMLUListElement>(null);

    const handlerScrollContainerToClick = useCallback(
        (distance: number) => {
            listRef.current?.scrollTo({
                left: listRef.current.getBoundingClientRect().width * distance,
                behavior: 'instant',
            });
        },
        [listRef]
    );

    const handlerScrollContainer = useCallback(() => {
        if (listRef.current !== null) {
            if (
                listRef.current?.scrollLeft %
                    listRef.current.getBoundingClientRect().width ===
                0
            ) {
                setActiveSlide(
                    listRef.current?.scrollLeft /
                        listRef.current.getBoundingClientRect().width
                );
            }
        }
    }, []);

    return (
        <div className="relative">
            <ul
                ref={listRef}
                className="carousel w-full rounded-3xl my-8"
                onScroll={handlerScrollContainer}
            >
                {videosPaths.map((path, idx) => (
                    <li
                        id={`Slide-${idx}`}
                        key={path}
                        className={cn(
                            'carousel-item relative w-full float-left !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none',
                            {
                                ['opacity-100']: activeSlide === idx,
                                ['opacity-0']: activeSlide !== idx,
                            }
                        )}
                    >
                        <video className="w-full" autoPlay loop muted>
                            <source
                                src={`${process.env.NEXT_PUBLIC_BASE_VIDEO_URL}${path}`}
                                type="video/mp4"
                            />
                        </video>
                    </li>
                ))}
            </ul>
            <div
                className="absolute bottom-8 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                data-te-carousel-indicators
            >
                {videosPaths.map((path, idx) => (
                    <button
                        id={`Slide-button-${idx}`}
                        key={path}
                        type="button"
                        className={cn(
                            'mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none',
                            {
                                ['opacity-100']: activeSlide === idx,
                                ['opacity-50']: activeSlide !== idx,
                            }
                        )}
                        aria-current="true"
                        aria-label={`Slide-${idx}`}
                        onClick={(e) => {
                            if (e.target instanceof HTMLButtonElement) {
                                setActiveSlide(
                                    Number(e.target.id.split('-')[2])
                                );
                                handlerScrollContainerToClick(idx);
                            }
                        }}
                    ></button>
                ))}
            </div>
        </div>
    );
};
