import { TCarouselProps } from '../carousel/carousel';

export const PicturesGrid = ({ pictures, handlerChecked }: TCarouselProps) => (
    <div className="grid grid-cols-6 gap-2">
        {pictures.map((picture) => (
            <div
                key={picture}
                className="bg-base-200 flex rounded-md px-2 py-2 items-center justify-center"
            >
                <picture>
                    <img className="h-24" src={picture} alt={picture} />
                </picture>
            </div>
        ))}
    </div>
);
