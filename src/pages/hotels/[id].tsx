import { DataJson } from '@/components/data-json/data-json';
import { HotelPage } from '@/components/pages/hotel-page/hotel-page';
import { Layout } from '@/layout/layout';
import {
    getHotelById,
    getRunningQueriesThunk,
    useGetHotelByIdQuery,
} from '@/redux/api/hotels-api';
import { wrapper } from '@/redux/store/store';
import { useTranslation } from 'react-i18next';

export default function Hotel({ id }: { id: string }) {
    const { i18n } = useTranslation();
    const { data } = useGetHotelByIdQuery(id);
    const isDev = process.env.NODE_ENV !== 'production';

    const hotelTitle = data ? (i18n.language === 'ru' ? data.hotel.name : data.hotel.name_en) : '';

    return (
        <Layout title={`На-День.рф ~ ${hotelTitle}`}>
            <HotelPage data={data || null} />
            {isDev && <DataJson data={data} />}
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const id = context.params?.id;
        if (typeof id === 'string') {
            store.dispatch(getHotelById.initiate(id));
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {
                id,
            },
        };
    }
);
