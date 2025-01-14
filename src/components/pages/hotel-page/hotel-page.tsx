import { useMemo } from 'react';
import { THotelResData } from '@/types/t-hotel-res-data';
import { Map } from '@/components/map/map';
import { TNullable } from '@/types/t-nullable';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@/components/collapse/collapse';
import {HotelHead } from './components/hotel-head';

export type THotelPageProps = {
    data: TNullable<THotelResData>;
};
export const HotelPage = ({ data }: THotelPageProps) => {
    const { i18n } = useTranslation();

    const aboutsTitle = useMemo(
        () =>
            data && data.abouts
                ? i18n.language === 'ru'
                    ? data?.abouts.ru?.title || 'Описание'
                    : data?.abouts.en?.title || 'Description'
                : '',
        [data, i18n.language]
    );

    const hotelName = useMemo(
        () =>
            `${
                data && data.hotel
                    ? i18n.language === 'ru'
                        ? data?.hotel.name
                        : data?.hotel.name_en
                    : ''
            }${
                data?.hotel.stars && data?.hotel.stars > 0
                    ? ', ' + data?.hotel.stars + '*'
                    : ''
            }`,
        [data, i18n.language]
    );

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
                <HotelHead data={data} hotelAddress={hotelAddress} hotelName={hotelName}/>
                <Collapse title={hotelAddress} type={'arrow'} fullView={true}>
                    <>
                        {data?.locations.en.geocode_data.geo_data.mid ? (
                            <Map
                                coordinates={[
                                    data.locations.en.geocode_data.geo_data.mid.lat,
                                    data.locations.en.geocode_data.geo_data.mid.lon,
                                ]}
                            />
                            
                        ) : (
                            <></>
                        )}
                        {data?.geoData && Array.isArray(data.geoData.ru) && Array.isArray(data.geoData.en) && data.geoData.en.length > 0 ? (
                            <div>
                                {i18n.language === 'ru'
                                    ? data?.geoData.ru
                                        .filter(
                                            (item) => item.type === 'main'
                                        )[0]
                                        .geo_list.map((item) => (
                                            <p
                                                className="text-warning text-xs"
                                                key={item.idx}
                                            >
                                                {item.name.trim()} ~{' '}
                                                {item.distance_from_hotel}{' '}
                                                {item.measurement}
                                            </p>
                                        ))
                                    : data?.geoData.en
                                        .filter(
                                            (item) => item.type === 'main'
                                        )[0]
                                        .geo_list.map((item) => (
                                            <p
                                                className="text-warning text-xs"
                                                key={item.idx}
                                            >
                                                {item.name} ~{' '}
                                                {item.distance_from_hotel}{' '}
                                                {item.measurement}
                                            </p>
                                        ))}
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                </Collapse>
                <>
                    {data && data.abouts?.ru ? (
                        <Collapse
                            title={aboutsTitle}
                            type={'arrow'}
                            fullView={true}
                        >
                            <article>
                                {i18n.language === 'ru' &&
                                    data?.abouts?.ru?.descriptions?.map(
                                        (item) => (
                                            <>
                                                <h5 className="text-lg text-bold mb-2">
                                                    {item.title}
                                                </h5>
                                                <p
                                                    className="mb-2"
                                                    key={item.idx}
                                                >
                                                    {item.paragraph}
                                                </p>
                                            </>
                                        )
                                    )}
                                {i18n.language === 'en' &&
                                    data?.abouts?.en?.descriptions?.map(
                                        (item) => (
                                            <>
                                                <h5 className="text-lg text-bold mb-2">
                                                    {item.title}
                                                </h5>
                                                <p
                                                    className="mb-2"
                                                    key={item.idx}
                                                >
                                                    {item.paragraph}
                                                </p>
                                            </>
                                        )
                                    )}
                            </article>
                        </Collapse>
                    ) : null}
                </>
            </div>
        </>
    );
};
