import { HotelPage } from '@/components/pages/hotel-page/hotel-page';
import { Layout } from '@/layout/layout';
import {
    getCommonHotelById,
    getCommonHotelRooms,
    getRunningQueriesThunk,
    useGetCommonHotelByIdQuery,
    useGetCommonHotelRoomsQuery,
} from '@/redux/api/common-api';
import { wrapper } from '@/redux/store/store';

export default function Hotel({ id }: { id: string }) {
    const { data } = useGetCommonHotelByIdQuery(id);
    const { data: rooms } = useGetCommonHotelRoomsQuery({ hotel: id });
    return (
        <Layout title={`На-День.рф ~ ${data?.title}`}>
            {data ? <HotelPage hotel={data} rooms={rooms || []}/> : null}
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const id = context.params?.id;
        if (typeof id === 'string') {
            const hotel = getCommonHotelById.initiate(id);
            store.dispatch(hotel);
            const rooms = getCommonHotelRooms.initiate({ hotel: id });
            store.dispatch(rooms);
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {
                id,
            },
        };
    }
);
