import { CheckBox } from '../../check-box/check-box';
import { TCarouselProps } from '../carousel/carousel';

export type TPicturesGridProps =  TCarouselProps & {
    title?: string;
}

export const PicturesGrid = ({
    pictures,
    handlerChecked,
    title,
}: TPicturesGridProps) => (
    <>
        {title && <h3 className='bg-neutral px-4 py-4 mb-2 rounded-md font-medium text-neutral-content text-xl font-bold tracking-tight' >{title}</h3>}
        <div className="grid grid-cols-6 gap-2">
            {pictures.map((picture) => (
                <div
                    key={picture}
                    className="bg-base-200 flex rounded-md px-2 py-2 items-center justify-center relative"
                >
                    <picture>
                        <img className="h-20" src={picture} alt="" />
                    </picture>
                    {handlerChecked ? (
                        <CheckBox id={picture} onChange={handlerChecked} />
                    ) : (
                        <></>
                    )}
                </div>
            ))}
        </div>
    </>
);
