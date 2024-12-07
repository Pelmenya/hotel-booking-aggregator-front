import { TabAdmin } from '@/components/tab-admin/tab-admin';
import { Layout } from '@/layout/layout';
import { TRole } from '@/types/t-role';

export default function HotelRoomsPage() {

    return (
        <Layout title="На-День.рф ~ Админ : Вариант размещения : Создание">
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