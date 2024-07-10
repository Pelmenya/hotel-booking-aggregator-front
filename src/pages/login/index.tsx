import { LoginForm } from '@/components/forms/login-form/login-form';
import { Layout } from '@/layout/layout';

export default function LoginPage() {
    return (
        <Layout title="Top-Hotels.su ~ Вход">
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
