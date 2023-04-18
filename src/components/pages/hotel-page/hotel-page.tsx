import { useGetCommonHotelByIdQuery } from '@/redux/api/common';

export const HotelPage = ({ id }: { id: string }) => {
    const { data } = useGetCommonHotelByIdQuery(id);
    return (
        <>
            <div><pre>{JSON.stringify(data, null, 2)}</pre></div>
        </>
    );
};
