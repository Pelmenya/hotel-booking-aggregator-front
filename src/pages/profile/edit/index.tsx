import { ProfilePage } from '@/components/pages/profile-page/profile-page';
import { Layout } from '@/layout/layout';
import { TRole } from '@/types/t-role';

export default function Profile() {

    return (
        <Layout title="На-День.рф ~ Профиль : Редактирование данных">
            <ProfilePage />
        </Layout>
    );
}

export async function getStaticProps() {
    const roles: TRole[] = ['client', 'admin', 'manager'];
    return {
        props: {
            protectedAuth: true,
            roles,
        },
    };
}