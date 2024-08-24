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
            <div className="rounded-3xl p-4 bg-base-300 shadow-xl">
                <MapComponent
                    state={{ center: coordinates, zoom: 17 }}
                    width={'100%'}
                >
                    <Placemark geometry={coordinates} />
                </MapComponent>
            </div>
        </YMaps>
    );
};
