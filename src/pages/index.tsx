import { MainPage } from '@/components/pages/main-page/main-page';
import { Layout } from '@/layout/layout';
import { wrapper } from '@/redux/store/store';

export default function Main() {
    return <Layout title="На-День.рф ~ Главная">
        <MainPage />
    </Layout>;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    
    return {
        props: {
        },
    };
});
