import { MainPage } from '@/components/main-page/main-page';
import { Layout } from '@/layout/layout';
import { getCommonHotels, getRunningQueriesThunk } from '@/redux/api/common';
import { wrapper } from '@/redux/store/store';

export default function Main() {
    return <Layout title="Hotel Booking Aggregator ~ Главная">
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
