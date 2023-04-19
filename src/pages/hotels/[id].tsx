import { HotelPage } from '@/components/pages/hotel-page/hotel-page';
import { Layout } from '@/layout/layout';
import { getCommonHotelById, getRunningQueriesThunk, useGetCommonHotelByIdQuery } from '@/redux/api/common';
import { wrapper } from '@/redux/store/store';

export default function Hotel({ id }: { id: string }) {
    const { data } = useGetCommonHotelByIdQuery(id);
    return (
        <Layout title={`Hotel Booking Aggregator ~ ${data?.title}`}>
            <HotelPage hotel={data}/>
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const id = context.params?.id;
        if (typeof id === 'string') {
            const hotel = getCommonHotelById.initiate(id);
            store.dispatch(hotel);
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {
                id,
            },
        };
    }
);
