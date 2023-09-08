import { TBaseProps } from '@/types/t-base-props';
import Head from 'next/head';
import { Header } from '../components/header/header';
import { Footer } from '@/components/footer/footer';

export type ILayoutProps = TBaseProps & {
    title: string;
};

export const Layout = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="logo.svg" />
            </Head>
            <Header />
            <main className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="w-full min-h-main">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
};
