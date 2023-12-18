import { TBaseProps } from '@/types/t-base-props';
import Head from 'next/head';
import { Header } from '../components/header/header';
import { Footer } from '@/components/footer/footer';
import Router, { useRouter } from 'next/router';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import { getPublicBaseImagesUrl } from 'utils/getPublicBaseImagesUrl';

Router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
        ym('hit', url);
    }
});

export type ILayoutProps = TBaseProps & {
    title: string;
};

export const Layout = ({ title, children }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="logo.svg" />
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_SITE_URL + router.asPath}
                />
                <meta property="og:locale" content="ru_RU" />
                <meta
                    property="og:image"
                    content={getPublicBaseImagesUrl('og-img.png')}
                />
                <meta
                    property="og:og:title"
                    content={title.split('~')[1].trim()}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <YMInitializer
                accounts={[Number(process.env.NEXT_PUBLIC_YM_ACCOUNT)]}
                options={{ webvisor: true, defer: true }}
                version="2"
            />
            <Header />
            <main className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="w-full min-h-main">{children}</div>
            </main>
            <Footer />
        </>
    );
};
