import { TabAdmin } from '@/components/tab-admin/tab-admin';
import { Layout } from '@/layout/layout';
import { getCommonHotels, getRunningQueriesThunk } from '@/redux/api/common-api';
import { wrapper } from '@/redux/store/store';


export default function HotelsEditPage() {
    return (
        <Layout title="Top-Hotels.su ~ Админ : Отели : Редактирование">
            <TabAdmin />
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getCommonHotels.initiate(''));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {
            protectedAuth: true,
            roles: ['admin'],
        },
    };
});
