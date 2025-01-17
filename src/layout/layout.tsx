import { TBaseProps } from '@/types/t-base-props';
import Head from 'next/head';
import { Header } from '../components/header/header';
import { Footer } from '@/components/footer/footer';
import Router, { useRouter } from 'next/router';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import { getPublicBaseImagesUrl } from 'utils/getPublicBaseImagesUrl';
import Script from 'next/script';
import { THotelResData } from '@/types/t-hotel-res-data';
import { getImageUrl } from 'utils/getImageUrl';

Router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
        ym('hit', url);
    }
});

export type ILayoutProps = TBaseProps & {
    title: string;
    data?: THotelResData;
};

export const Layout = ({ title, data, children }: ILayoutProps) => {
    const router = useRouter();
    const hotelDescription = data ? data.abouts.ru.descriptions.map(desc => desc.paragraph).join(' ') : 'Сайт для аренды на день';
    const hotelImage = data?.images.length ? getImageUrl(data.images[0].path) : getPublicBaseImagesUrl('og-img.png');

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={hotelDescription} />
                <meta
                    name="keywords"
                    content="Краткосрочная аренда, посуточная аренда, аренда не на долго, на день"
                />
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_SITE_URL + router.asPath}
                />
                <meta property="og:locale" content="ru_RU" />
                <meta
                    property="og:image"
                    content={hotelImage}
                />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={hotelDescription} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href={getPublicBaseImagesUrl('logo.svg')} />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Hotel",
                        "name": "${data?.hotel.name || ''}",
                        "description": "${hotelDescription}",
                        "image": "${hotelImage}",
                        "url": "${process.env.NEXT_PUBLIC_SITE_URL + router.asPath}",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "${data?.locations.ru.address || ''}"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "${data?.hotel.rating || 0}",
                            "reviewCount": "50"
                        }
                    }
                    `}
                </script>
            </Head>

            <YMInitializer
                accounts={[Number(process.env.NEXT_PUBLIC_YM_ACCOUNT)]}
                options={{ webvisor: true, defer: true }}
                version="2"
            />
            <Script
                id="partner-script"
                data-noptimize="1"
                data-cfasync="false"
                data-wpfc-render="false"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function () {
                        var script = document.createElement("script");
                        script.async = true;
                        script.src = 'https://emrld.cc/MzcyNjU0.js?t=372654';
                        document.head.appendChild(script);
                    })();`,
                }}
            />
            <Header />
            <main className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="w-full min-h-main">{children}</div>
            </main>
            <Footer />
        </>
    );
};
