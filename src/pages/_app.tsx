import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user';
import { wrapper } from '@/redux/store/store';
import { FontsProvider } from '@/providers/fonts-provider/fonts-provider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '@/providers/auth-provider/auth-provider';

function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    const { pageProps } = props;

    return (
        <ReduxProvider store={store}>
            <FontsProvider>
                <AuthProvider pageProps={ pageProps }>
                    <Component {...pageProps} />
                </AuthProvider>
            </FontsProvider>
        </ReduxProvider>
    );
}

export default App;
