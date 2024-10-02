import { getImageUrl } from 'utils/getImageUrl';
import cn from 'classnames';
import styles from './images-grid.module.css';

export type TImagesGridProps = {
    images: string[];
    onClick: () => void;
};

export const ImagesGrid = ({ images, onClick }: TImagesGridProps) => {
    const gridItems = [1, 2, 3, 4];

    return (
        <div onClick={onClick} className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[280px] h-full cursor-pointer">
            {images[0] ? (
                <picture className="h-full w-full max-h-[400px] min-h-[280px]">
                    <img
                        className="object-cover h-full w-full rounded-3xl"
                        src={getImageUrl(images[0])}
                        alt=""
                    />
                </picture>
            ) : null}
            <div className="flex w-full flex-wrap gap-4 max-h-[400px] min-h-[280px]">
                {gridItems.map((num) =>
                    images[num] ? (
                        <div
                            key={images[num]}
                            className={cn('h-[48%] relative', styles.pic)}
                        >
                            <>
                                <picture>
                                    <img
                                        className="object-cover w-full h-full rounded-3xl"
                                        src={getImageUrl(images[num])}
                                        alt=""
                                    />
                                </picture>
                                {num === 4 && images.length > 4 ? (
                                    <>
                                        <div className="absolute top-0 left-0 flex items-center bg-black opacity-50 justify-center w-full h-full rounded-3xl" />
                                        <p className={cn('absolute text-white block font-bold text-4xl whitespace-nowrap top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2', styles.num)}>
                                            + {images.length - gridItems.length - 1}
                                        </p>
                                    </>
                                ) : null}
                            </>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};
