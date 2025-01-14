import { Collapse } from '@/components/collapse/collapse';
import { Map } from '@/components/map/map';
import { TGeoDataList } from '@/types/t-hotel-res-data';
import { useTranslation } from 'react-i18next';
import { THotelHeadProps } from './hotel-head';

export const HotelGeoData = ({ data, hotelAddress }: THotelHeadProps) => {
    const { i18n } = useTranslation();
    const [latitude, longitude] = [
        data?.locations?.en?.geocode_data?.geo_data?.mid?.lat,
        data?.locations?.en?.geocode_data?.geo_data?.mid?.lon,
    ];

    const renderGeoData = (geoDataList: TGeoDataList, title: string) => (
        <div className="p-4 rounded-lg border border-base-300 h-full" key={title}>
            <h4 className="text-lg font-semibold">{title}</h4>
            {geoDataList.map((item) => (
                <p className="text-sm mb-1" key={item.idx}>
                    {item.name} ~ {item.distance_from_hotel} {item.measurement}
                </p>
            ))}
        </div>
    );

    return (
        <Collapse title={hotelAddress} type="arrow" fullView>
            <div className='flex flex-col gap-4'>
                {latitude && longitude && (
                    <Map coordinates={[latitude, longitude]} />
                )}
                {data?.geoData &&
                    Array.isArray(data.geoData.ru) &&
                    Array.isArray(data.geoData.en) &&
                    data.geoData.en.length > 0 && (
                    <div className='flex flex-wrap gap-4'>
                        {(i18n.language === 'ru'
                            ? data.geoData.ru
                            : data.geoData.en
                        ).filter((geoData) => geoData.type === 'additional').sort((a,b) =>  b.geo_list.length - a.geo_list.length).map((geoData) => (
                            <div className="flex-auto" key={geoData.id}>
                                {renderGeoData(geoData.geo_list, geoData.title)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Collapse>
    );
};
