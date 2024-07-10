import { ProfilePage } from '@/components/pages/profile-page/profile-page';
import { Layout } from '@/layout/layout';
import { TRole } from '@/types/t-role';

export default function Profile() {

    return (
        <Layout title="Top-Hotels.su ~ Профиль">
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
