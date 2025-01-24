import { TabAdmin } from '@/components/tab-admin/tab-admin';
import { Layout } from '@/layout/layout';
import { getAmenities, getRunningQueriesThunk  } from '@/redux/api/amenities-api';
import { getRealEstate } from '@/redux/api/real-estate-api';
import { store } from '@/redux/store/store';
import { TRole } from '@/types/t-role';

export default function HotelsPage() {

    return (
        <Layout title="На-День.рф ~ Админ : Отели : Создание">
            <TabAdmin />
        </Layout>
    );
}

export async function getStaticProps() {
    const roles:TRole[] = ['admin'];

    store.dispatch(getAmenities.initiate('ALL'));
    store.dispatch(getRealEstate.initiate('ALL'));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {
            protectedAuth: true,
            roles,
        },
    };
}