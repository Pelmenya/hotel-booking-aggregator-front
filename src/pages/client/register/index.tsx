import { RegisterForm } from '@/components/forms/register-form/register-form';
import { Layout } from '@/layout/layout';

export default function ClientRegisterPage() {
    return (
        <Layout title="На-День.рф ~ Регистрация : Клиент">
            <RegisterForm />
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
