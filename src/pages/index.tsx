import { MainPage } from '@/components/pages/main-page/main-page';
import { Layout } from '@/layout/layout';
import { getCommonHotels, getRunningQueriesThunk } from '@/redux/api/common-api';
import { wrapper } from '@/redux/store/store';

export default function Main() {
    return <Layout title="Top-Hotels.su ~ Главная">
        <MainPage />
    </Layout>;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    
    store.dispatch(getCommonHotels.initiate(''));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {
        },
    };
});
