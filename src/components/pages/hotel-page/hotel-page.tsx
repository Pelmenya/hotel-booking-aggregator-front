import { DataJson } from '@/components/data-json/data-json';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { THotel } from '@/types/t-hotel';

export type THotelPageProps = {
    hotel?: THotel
}
export const HotelPage = ({ hotel }: THotelPageProps) => {
    return (
        <>
            {hotel?.images.length ? <ImagesGrid images={hotel.images} /> : null}
            <DataJson data={hotel} />
        </>
    );
};
