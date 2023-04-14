import { THotel } from '@/types/t-hotel';

export const HotelCard = ({ title, id, description, images }: THotel) => {
    return (
        <div className='flex flex-wrap gap-4'>
            {images.map((image, idx) => (
                <picture key={image + String(idx)}>
                    <img className='h-48'
                        src={`${process.env.NEXT_PUBLIC_BASE_PICTURES_URL}${image}`}
                        alt=""
                    />
                </picture>
            ))}
        </div>
    );
};
