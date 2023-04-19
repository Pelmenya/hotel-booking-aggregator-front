import { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import { getImageUrl } from 'utils/getImageUrl';

export type TCarouselProps = {
    pictures: string[];
    idx: string;
};

export const Carousel = ({ idx, pictures }: TCarouselProps) => {
    const [isArrows, setArrows] = useState(false);



    return (
        <div
            className="carousel max-w-md sm:max-w-none rounded-t-3xl sm:rounded-t-3xl md:w-52 sm:w-full md:rounded-l-3xl md:rounded-r-none bg-gray-800 cursor-pointer"
            onMouseOver={() => setArrows(true)}
            onMouseOut={() => setArrows(false)}
        >
            {pictures.map((picture, index, arr) => (
                <div
                    key={picture}
                    id={`slide${idx}${index + 1}`}
                    className="carousel-item relative w-full max-w-md sm:max-w-none flex items-center justify-center"
                >
                    <picture>
                        <img
                            src={getImageUrl(picture)}
                            className="object-cover h-52 sm:w-full md:w-52"
                            alt=""
                        />
                    </picture>
                    {pictures.length > 1 ? (
                        <div
                            className={cn(
                                'absolute flex items-center justify-between transform -translate-y-1/2 left-3 right-3 top-1/2 min-h-2',
                                { ['hidden']: !isArrows }
                            )}
                        >
                            <a
                                href={`#slide${idx}${
                                    index === 0 ? arr.length : index
                                }`}
                                className="btn btn-circle btn-xs opacity-75 hover:btn-sm hover:bg-white hover:text-black"
                            >
                                ❮
                            </a>
                            <a
                                href={`#slide${idx}${
                                    index + 2 <= arr.length ? index + 2 : 1
                                }`}
                                className="btn btn-circle btn-xs opacity-75 hover:btn-sm hover:bg-white hover:text-black"
                            >
                                ❯
                            </a>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ))}
        </div>
    );
};
