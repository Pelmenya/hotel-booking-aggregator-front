import { ChangeEvent } from 'react';

export type TCarouselProps = {
    pictures: string[];
    handlerChecked?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Carousel = ({ pictures, handlerChecked }: TCarouselProps) => {
    return (
        <>
            <div className="carousel w-full">
                {pictures.map((picture, index, arr) => (
                    <div
                        key={picture}
                        id={`slide${index + 1}`}
                        className="carousel-item relative w-full flex items-center justify-center"
                    >
                        <picture>
                            <img src={picture} className="h-52" alt="" />
                        </picture>
                        {pictures.length > 1 ? (
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a
                                    href={`#slide${
                                        index === 0 ? arr.length : index
                                    }`}
                                    className="btn btn-circle"
                                >
                                    ❮
                                </a>
                                <a
                                    href={`#slide${
                                        index + 2 <= arr.length ? index + 2 : 1
                                    }`}
                                    className="btn btn-circle"
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
        </>
    );
};
