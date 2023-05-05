import { HotelRoomPage } from '@/components/pages/hotel-room-page/hotel-room-page';
import { Layout } from '@/layout/layout';
import {
    getCommonHotelRoomById,
    getRunningQueriesThunk,
    useGetCommonHotelRoomByIdQuery,
} from '@/redux/api/common';
import { wrapper } from '@/redux/store/store';

export default function HotelRooms({ id }: { id: string }) {
    const { data } = useGetCommonHotelRoomByIdQuery(id);
    return (
        <Layout title={`Hotel Booking Aggregator ~ ${data?.hotel.title} : ${data?.title}`}>
            {data ? <HotelRoomPage room={data} /> : null}
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const id = context.params?.id;
        if (typeof id === 'string') {
            const room = getCommonHotelRoomById.initiate(id);
            store.dispatch(room);
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {
                id,
            },
        };
    }
);
