import { TabAdmin } from '@/components/tab-admin/tab-admin';
import { Layout } from '@/layout/layout';
import { getAmenities, getRunningQueriesThunk } from '@/redux/api/amenities-api';
import { wrapper } from '@/redux/store/store';


export default function HotelsEditPage() {
    return (
        <Layout title="На-День.рф ~ Админ : Отели : Редактирование">
            <TabAdmin />
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getAmenities.initiate('ALL'));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {
            protectedAuth: true,
            roles: ['admin'],
        },
    };
});
