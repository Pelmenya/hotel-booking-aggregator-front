import { DataJson } from '@/components/data-json/data-json';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { THotel } from '@/types/t-hotel';

export type THotelPageProps = {
    hotel: THotel;
};
export const HotelPage = ({ hotel }: THotelPageProps) => {
    const descriptions: string[] = hotel.description.split('\r\n');

    return (
        <div className="flex flex-col gap-16 py-16">
            <h1 className="font-black text-5xl">{hotel.title}</h1>
            {hotel?.images.length ? <ImagesGrid images={hotel.images} /> : null}
            <article className="prose lg:prose-xl">
                <h3>Про отель</h3>
                {descriptions.map((text, idx) => (
                    <p key={text+idx}>{text}</p>
                ))}
            </article>
        </div>
    );
};
