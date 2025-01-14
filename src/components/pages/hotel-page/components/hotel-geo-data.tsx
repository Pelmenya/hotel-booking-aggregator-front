import { Collapse } from '@/components/collapse/collapse';
import { Map } from '@/components/map/map';
import { useTranslation } from 'react-i18next';
import { THotelHeadProps } from './hotel-head';


export const HotelGeoData = ({ data, hotelAddress }: THotelHeadProps) => {
    const { i18n } = useTranslation();

    return (
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
                                .filter((item) => item.type === 'main')[0]
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
                                .filter((item) => item.type === 'main')[0]
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
    );
};
