import { ChangeEvent, useState } from 'react';
import cn from 'classnames';

export type TCarouselProps = {
    pictures: string[];
    idx: string;
    handlerChecked?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Carousel = ({ idx, pictures, handlerChecked }: TCarouselProps) => {
    const [isArrows, setArrows] = useState(false);

    return (
        <div
            className="carousel max-w-md w-52 rounded-l-3xl bg-gray-800 cursor-pointer"
            onMouseOver={() => setArrows(true)}
            onMouseOut={() => setArrows(false)}
        >
            {pictures.map((picture, index, arr) => (
                <div
                    key={picture}
                    id={`slide${idx}${index + 1}`}
                    className="carousel-item relative max-w-md w-full flex items-center justify-center"
                >
                    <picture>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PICTURES_URL}${picture}`}
                            className="object-cover h-52 w-52"
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
