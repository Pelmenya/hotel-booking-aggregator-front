import { useGetHotelsQuery } from '@/redux/api/common';
import { THotel } from '@/types/t-hotel';
import { useEffect, useState } from 'react';

export const useHotels = () => {
    const [hotels, setHotels] = useState<THotel[]>([]);
    const { isLoading, error, data } = useGetHotelsQuery('');

    const getHotelsState = () => hotels;

    useEffect(() => {
        if (data) {
            setHotels(data);
        }
    }, [data])

    return { getHotelsState }
}