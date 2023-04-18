import { useGetCommonHotelsQuery } from '@/redux/api/common';
import { HotelCard } from '../hotel-card/hotel-card'
import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const HotelsList = () => {
    const router = useRouter();
    const { data } = useGetCommonHotelsQuery('');
    
    const handlerOnClickCard = useCallback((id: string) => {
        router.push(`/hotels/${id}`)
    }, [router])


    return (
        <>
            {data ? (
                <div className='grid grid-cols-2 gap-4 py-4'>
                    {data.map((hotel) => (
                        <HotelCard key={hotel.id} {...hotel} onClick={handlerOnClickCard}/>
                    ))}
                </div>
            ) : null}
        </>
    )

}