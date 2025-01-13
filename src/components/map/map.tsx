import { YMaps, Map as MapComponent, Placemark } from '@pbe/react-yandex-maps';
import { Base } from '../base/base';

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
            <Base>
                <MapComponent
                    state={{ center: coordinates, zoom: 17 }}
                    width={'100%'}
                    height={'300px'}
                >
                    <Placemark geometry={coordinates} />
                </MapComponent>
            </Base>
        </YMaps>
    );
};
