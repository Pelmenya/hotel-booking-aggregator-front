import { wrapper } from '@/redux/store/store';
import { FontsProvider } from '@/providers/fonts-provider/fonts-provider';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '@/providers/auth-provider/auth-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/globals.css';
import '@/styles/toastify.css';


function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    const { pageProps } = props;

    return (
        <ReduxProvider store={store}>
            <FontsProvider>
                <AuthProvider pageProps={pageProps}>
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
                </AuthProvider>
            </FontsProvider>
        </ReduxProvider>
    );
}

export default App;
