import { wrapper } from '@/redux/store/store';
import { FontsProvider } from '@/styles/fonts-provider/fonts-provider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <ReduxProvider store={store}>
            <FontsProvider>
                <Component {...pageProps} />
            </FontsProvider>
        </ReduxProvider>
    );
}

export default App;
