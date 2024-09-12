import { wrapper } from '@/redux/store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { FontsProvider } from '@/providers/fonts-provider/fonts-provider';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/providers/auth-provider/auth-provider';
import { AuthRouter } from '@/router/auth-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import '@/styles/globals.css';
import '@/styles/toastify.css';

import { appWithTranslation } from 'next-i18next';
import '../../i18n';

function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    const { pageProps } = props;

    return (
        <ReduxProvider store={store}>
            <FontsProvider>
                <AuthProvider>
                    <AuthRouter {...pageProps}>
                        <Component {...pageProps} />
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </AuthRouter>
                </AuthProvider>
            </FontsProvider>
        </ReduxProvider>
    );
}

export default appWithTranslation(App);
