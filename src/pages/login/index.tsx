import { LoginForm } from '@/components/forms/login-form';
import { Layout } from '@/layout/layout';

export default function Login() {
    return (
        <Layout title="Hotel Booking Aggregator ~ Вход">
            <LoginForm />
        </Layout>
    );
}

export async function getStaticProps() {
    return {
        props: {
            protectedFromUser: true,
        },
    };
}
