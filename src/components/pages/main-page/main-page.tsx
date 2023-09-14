import { useGetCommonHotelsQuery } from '@/redux/api/common';
import { List } from '../../list/list';
import { CarouselVideo } from '@/components/carousel-video/carousel-video';

export const MainPage = () => {
    const { data } = useGetCommonHotelsQuery('');

    return (
        <>
            <CarouselVideo />
            {data ? <List items={data} href="/hotels" /> : null}
        </>
    );
};
