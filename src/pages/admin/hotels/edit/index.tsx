import { TabAdmin } from '@/components/tab-admin/tab-admin';
import { Layout } from '@/layout/layout';
import { getHotels, getRunningQueriesThunk } from '@/redux/api/common';
import { wrapper } from '@/redux/store/store';


export default function HotelsEditPage() {
    return (
        <Layout title="Hotel Booking Aggregator ~ Админ : Отели : Редактирование">
            <TabAdmin />
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getHotels.initiate(''));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {
            protectedAuth: true,
            roles: ['admin'],
        },
    };
});
