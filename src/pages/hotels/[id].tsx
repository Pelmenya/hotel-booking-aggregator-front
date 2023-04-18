import { HotelPage } from '@/components/pages/hotel-page/hotel-page';
import { MainPage } from '@/components/pages/main-page/main-page';
import { Layout } from '@/layout/layout';
import { getCommonHotelById, getRunningQueriesThunk } from '@/redux/api/common';
import { wrapper } from '@/redux/store/store';

export default function Hotel({ id }: { id: string }) {
    return (
        <Layout title="Hotel Booking Aggregator ~ Главная">
            <HotelPage id={id}/>
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const id = context.params?.id;
        if (typeof id === 'string') {
            store.dispatch(getCommonHotelById.initiate(id));
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {
                id,
            },
        };
    }
);
