import { Collapse } from '@/components/collapse/collapse';
import { Map } from '@/components/map/map';
import { TGeoDataList } from '@/types/t-hotel-res-data';
import { useTranslation } from 'react-i18next';
import { THotelHeadProps } from './hotel-head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark, faChurch, faFutbol, faDharmachakra, faShoppingBag, faTrain, faTree, faMusic, faBook, faCity, faSubway, faMountain, faBinoculars, faPaw, faMosque, faTheaterMasks, faAnchor, faSchool, faBriefcase, faUmbrellaBeach, faPlaneDeparture, faMonument, faSkiing, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const getIconByCategory = (category: string) => {
    switch (category) {
        case 'MUSEUM':
            return faLandmark;
        case 'CHURCH':
            return faChurch;
        case 'ARENAS_AND_STADIUMS':
            return faFutbol;
        case 'BUDDIST_TEMPLE':
            return faDharmachakra;
        case 'SHOPPING':
            return faShoppingBag;
        case 'RAILWAY_STATION':
            return faTrain;
        case 'PARK':
            return faTree;
        case 'CONCERTS_AND_PERFORMANCES':
            return faMusic;
        case 'LIBRARY':
            return faBook;
        case 'CENTER':
            return faCity;
        case 'SUBWAY':
            return faSubway;
        case 'CABLEWAY':
            return faMountain;
        case 'VIEWPOINT':
            return faBinoculars;
        case 'ZOOS_AND_AQUARIUMS':
            return faPaw;
        case 'MOSQUE':
            return faMosque;
        case 'THEATER':
            return faTheaterMasks;
        case 'HARBOR':
            return faAnchor;
        case 'EDUCATIONAL_OBJECTS':
            return faSchool;
        case 'BUSINESS_CENTER':
            return faBriefcase;
        case 'BEACH':
            return faUmbrellaBeach;
        case 'AIRPORT':
            return faPlaneDeparture;
        case 'HISTORICAL_POI':
            return faMonument;
        case 'SKI':
            return faSkiing;
        default:
            return faMapMarkerAlt; // иконка по умолчанию
    }
};
  
export const HotelGeoData = ({ data, hotelAddress }: THotelHeadProps) => {
    const { i18n } = useTranslation();
    const [latitude, longitude] = [
        data?.locations?.en?.geocode_data?.geo_data?.mid?.lat,
        data?.locations?.en?.geocode_data?.geo_data?.mid?.lon,
    ];

    const renderGeoData = (geoDataList: TGeoDataList, title: string) => (
        <div className="p-4 rounded-xl border border-base-300 h-full" key={title}>
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            {geoDataList.map((item) => {
                const icon = getIconByCategory(item.category);
                return (
                    <p className="text-sm mb-1 flex items-center" key={item.idx}>
                        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />} 
                        {item.name} ~ {item.distance_from_hotel} {item.measurement}
                    </p>
                );
            })}
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
