import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useGetAuthUserMutation } from '@/redux/api/common';
import { getUserState } from '@/redux/selectors/user';
import { setUser } from '@/redux/slices/user';
import { TBaseProps } from '@/types/t-base-props';
import Head from 'next/head';
import { useEffect } from 'react';
import { Header } from '../components/header/header';

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
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <main className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="w-full min-h-main">
                    {children}
                </div>
            </main>
        </>
    );
};
