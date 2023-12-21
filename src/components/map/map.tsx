import { YMaps, Map as MapComponent, Placemark } from '@pbe/react-yandex-maps';
import { useEffect, useMemo, useState } from 'react';

export type MapProps = {
    coordinates: string;
};

export const Map = ({ coordinates }: MapProps) => {
    
    const point = useMemo(() => {
        return [Number(coordinates.split(',')[0]), Number(coordinates.split(',')[1])];
    }, [coordinates]);

    const [center, setCenter] = useState(point);

    useEffect(() => { 
        setCenter(point)
    }, [point]);

    return (
        <YMaps>
            <div className="rounded-3xl p-4 bg-base-300 shadow-xl">
                <MapComponent
                    defaultState={{ center, zoom: 17 }}
                    width={'100%'}
                >
                    <Placemark geometry={center} />
                </MapComponent>
            </div>
        </YMaps>
    );
};
