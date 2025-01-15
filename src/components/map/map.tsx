import { YMaps, Map as MapComponent, Placemark } from '@pbe/react-yandex-maps';

export type MapProps = {
    coordinates: number[];
};

export const Map = ({ coordinates }: MapProps) => {
    
    return (
        <YMaps
            query={{
                apikey: process.env.NEXT_PUBLIC_YM_API_KEY
            }}
        >
            <div className='border border-base-300 bg-base-100 rounded-box p-4'>
                <MapComponent
                    state={{ center: coordinates, zoom: 17 }}
                    width={'100%'}
                    height={'315px'}
                >
                    <Placemark geometry={coordinates} />
                </MapComponent>
            </div>
        </YMaps>
    );
};
