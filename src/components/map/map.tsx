import { YMaps, Map as MapComponent, Placemark } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';

export type MapProps = {
    coordinates: number[];
};

export const Map = ({ coordinates }: MapProps) => {
    
    const [center, setCenter] = useState(coordinates);

    useEffect(() => { 
        setCenter(coordinates)
    }, [coordinates]);

    return (
        <YMaps>
            <div className="rounded-3xl p-4 bg-base-300 shadow-xl">
                <MapComponent
                    state={{ center, zoom: 17 }}
                    width={'100%'}
                >
                    <Placemark geometry={center} />
                </MapComponent>
            </div>
        </YMaps>
    );
};
