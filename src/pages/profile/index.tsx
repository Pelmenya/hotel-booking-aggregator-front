import { LoginForm } from '@/components/forms/login-form/login-form';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Layout } from '@/layout/layout';
import { getUserState } from '@/redux/selectors/user';
import { TRole } from '@/types/t-role';

export default function Profile() {
    const { user } = useAppSelector(getUserState);

    return (
        <Layout title="Hotel Booking Aggregator ~ Профиль">
            <div>ПРОФИЛЬ</div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
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
