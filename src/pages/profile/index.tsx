import { LoginForm } from '@/components/forms/login-form';
import { Layout } from '@/layout/layout';

export default function Profile() {
    return (
        <Layout title="Hotel Booking Aggregator ~ Профиль">
            
        </Layout>
    );
}

export async function getStaticProps() {
    return {
        props: {
            protectedAuth: true,
            role: ['client', 'admin', 'manager'],
        },
    };
}
