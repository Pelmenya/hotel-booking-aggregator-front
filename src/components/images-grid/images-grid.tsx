import { getImageUrl } from 'utils/getImageUrl';
import cn from 'classnames';
import styles from './images-grid.module.css';

export type TImagesGridProps = {
    images: string[];
}

export const ImagesGrid = ({ images }: TImagesGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-4 max-h-[400px] min-h-[280px] h-full">
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
                {[1, 2, 3, 4].map((num) =>
                    images[num] ? (
                        <picture
                            key={images[num]}
                            className={cn('h-[48%]', styles.pic)}
                        >
                            <img
                                className="object-cover w-full h-full rounded-3xl"
                                src={getImageUrl(images[num])}
                                alt=""
                            />
                        </picture>
                    ) : null
                )}
            </div>
        </div>
    );
};
