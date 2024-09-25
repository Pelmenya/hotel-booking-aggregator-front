import { TabAdmin } from '@/components/tab-admin/tab-admin';
import { Layout } from '@/layout/layout';
import { getAdminUsers, getRunningQueriesThunk } from '@/redux/api/admin-api';
import { wrapper } from '@/redux/store/store';

export default function UsersPage() {
    return (
        <Layout title="Top-Hotels.su ~ Админ : Пользователи">
            <TabAdmin />
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        store.dispatch(getAdminUsers.initiate(''));

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {
                protectedAuth: true,
                roles: ['admin'],
            },
        };
    }
);
