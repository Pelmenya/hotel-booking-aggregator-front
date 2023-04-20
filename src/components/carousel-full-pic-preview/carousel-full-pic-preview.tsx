import { getImageUrl } from 'utils/getImageUrl';
import cn from 'classnames';

import styles from './carousel-full-pic-preview.module.css';

export const CarouselFullPicPreview = ({ images }: { images: string[] }) => {
    return (
        <>
            <div className="carousel">
                {images.map((url) => (
                    <div
                        id={url}
                        key={url}
                        className={cn('carousel-item w-full items-center justify-center max-h-screen', styles.pic) }
                    >
                        <picture>
                            <img src={getImageUrl(url)} alt="" />
                        </picture>
                    </div>
                ))}
            </div>
            <div className="flex w-full py-2 gap-2 overflow-x-auto">
                {images.map((url, idx) => (
                    <a href={`#${url}`} key={url+idx} className="btn">

                    </a>
                ))}
            </div>
        </>
    );
};
