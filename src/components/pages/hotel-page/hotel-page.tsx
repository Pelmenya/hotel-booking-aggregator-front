import { useMemo } from 'react';
import { THotelResData } from '@/types/t-hotel-res-data';
import { TNullable } from '@/types/t-nullable';
import { useTranslation } from 'react-i18next';
import { HotelHead } from './components/hotel-head';
import { HotelGeoData } from './components/hotel-geo-data';
import { HotelAbouts } from './components/hotel-abouts';
import { HotelAmenities } from './components/hotel-amenities';

export type THotelPageProps = {
    data: TNullable<THotelResData>;
};

export const HotelPage = ({ data }: THotelPageProps) => {
    const { i18n } = useTranslation();

    const hotelAddress = useMemo(() => {
        return data && data.locations ? (i18n.language === 'ru' ? data.locations.ru.address : data.locations.en.address) : '';
    }, [data, i18n.language]);
    
    /* <div className="p-8">Breadcrumbs</div> */

    return (
        <>
            <div className="p-4"></div> 
            <div className="flex flex-col gap-4">
                <HotelHead data={data} hotelAddress={hotelAddress} />
                <HotelGeoData data={data} hotelAddress={hotelAddress} />
                <HotelAmenities data={data} />
                <HotelAbouts data={data} />
            </div>
        </>
    );
};
