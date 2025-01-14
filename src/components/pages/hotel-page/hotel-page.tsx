import { useMemo } from 'react';
import { THotelResData } from '@/types/t-hotel-res-data';
import { TNullable } from '@/types/t-nullable';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@/components/collapse/collapse';
import { HotelHead } from './components/hotel-head';
import { HotelGeoData } from './components/hotel-geo-data';
import { HotelABouts } from './components/hotel-abouts';

export type THotelPageProps = {
    data: TNullable<THotelResData>;
};
export const HotelPage = ({ data }: THotelPageProps) => {
    const { i18n } = useTranslation();

    const hotelAddress = useMemo(
        () =>
            data && data.locations
                ? i18n.language === 'ru'
                    ? data?.locations.ru.address
                    : data?.locations.en.address
                : '',
        [data, i18n.language]
    );

    return (
        <>
            {/* <div className="p-8">Breadcrumbs</div> */}   
            <div className="p-4"></div>
            <div className="flex flex-col gap-4">
                <HotelHead data={data} hotelAddress={hotelAddress} />
                <HotelGeoData data={data} hotelAddress={hotelAddress} />
                <HotelABouts data={data} />
            </div>
        </>
    );
};
