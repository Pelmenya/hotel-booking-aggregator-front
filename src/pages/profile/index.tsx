import { LoginForm } from '@/components/forms/login-form';
import { Layout } from '@/layout/layout';
import { useGetAuthUserMutation } from '@/redux/api/common';
import { TRole } from '@/types/t-role';

export default function Profile() {
    return (
        <Layout title="Hotel Booking Aggregator ~ Профиль">
            <div>ПРОФИЛЬ</div>
        </Layout>
    );
}

export async function getStaticProps() {
    const roles:TRole[] = ['client', 'admin', 'manager'];
    return {
        props: {
            protectedAuth: true,
            roles,
        },
    };
}
