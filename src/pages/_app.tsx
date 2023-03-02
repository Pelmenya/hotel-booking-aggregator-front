import { wrapper } from '@/redux/store/store';
import { Inter, Roboto_Mono } from '@next/font/google';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
});

function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <Provider store={store}>
            <div className={`${inter.variable} font-sans ${roboto_mono.variable} font-mono`}>
                <Component {...pageProps} />
            </div>
        </Provider>
    );
}

export default App;
