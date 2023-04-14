import { useAppSelector } from '@/hooks/use-app-selector';
import { useGetCommonHotelsQuery } from '@/redux/api/common';
import { HotelCard } from './components/hotel-card/hotel-card';

export const MainPage = () => {
    const { data } = useGetCommonHotelsQuery('');

    return (
        <>
            {data ? (
                <>
                    {data.map((hotel) => (
                        <HotelCard key={hotel.id} {...hotel} />
                    ))}
                </>
            ) : null}
        </>
    );
};
