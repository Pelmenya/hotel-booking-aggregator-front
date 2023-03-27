import { TabAdmin } from '@/components/tab-admin/tab-admin';
import { Layout } from '@/layout/layout';
import { TRole } from '@/types/t-role';

export default function HotelsPage() {

    return (
        <Layout title="Hotel Booking Aggregator ~ Админ : Отели : Создание">
            <TabAdmin />
        </Layout>
    );
}

export async function getStaticProps() {
    const roles:TRole[] = ['admin'];
    return {
        props: {
            protectedAuth: true,
            roles,
        },
    };
}