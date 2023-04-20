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
                        className={cn('carousel-item w-full items-center justify-center') }
                    >
                        <picture>
                            <img className={cn('rounded-3xl', styles.pic)} src={getImageUrl(url)} alt="" />
                        </picture>
                    </div>
                ))}
            </div>
            <div className="flex w-full py-2 gap-2 overflow-x-auto">
                {images.map((url, idx) => (
                    <a href={`#${url}`} key={url+idx} className="flex shrink-0">
                        <picture>
                            <img className='h-12 w-12 rounded' src={getImageUrl(url)} alt="" />
                        </picture>
                    </a>
                ))}
            </div>
        </>
    );
};
