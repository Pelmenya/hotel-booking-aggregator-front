import Head from 'next/head';
import { Header } from '@/components/header/header';
import { RegisterForm } from '@/components/forms/register-form';


export default function ClientRegister() {
    

    return (
        <>
            <Head>
                <title>Hotel Booking Aggregator ~ Регистрация : Клиент</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <main className="container mx-auto px-6">
                {/* Remove class [ h-64 ] when adding a card block */}
                {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                <div className="w-full min-h-screen lg:py-10">
                    <RegisterForm />
                </div>
            </main>
        </>
    );
}