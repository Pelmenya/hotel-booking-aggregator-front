import { ProfilePage } from '@/components/pages/profile-page.tsx/profile-page';
import { Layout } from '@/layout/layout';
import { TRole } from '@/types/t-role';

export default function Profile() {

    return (
        <Layout title="Hotel Booking Aggregator ~ Профиль">
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
