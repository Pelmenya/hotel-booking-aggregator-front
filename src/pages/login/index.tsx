import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { Header } from '@/components/header/header';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
    

    return (
        <>
            <Head>
                <title>Hotel Booking Aggregator ~ Вход</title>
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
        </>
    );
}