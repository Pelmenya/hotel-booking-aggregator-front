import { useLazyGetCommonHotelsQuery } from '@/redux/api/common';
import { List } from '../../list/list';
import { CarouselVideo} from '@/components/carousel-video/carousel-video';
import { useEffect } from 'react';
import { slidesMainPage } from './main-page.constants';

export const MainPage = () => {
    const [ trigger,  { data }] = useLazyGetCommonHotelsQuery();

    useEffect(() => {
        trigger('').unwrap();
    }, [trigger]);

    return (
        <>
            <CarouselVideo slides={slidesMainPage} delay={5000}/>
            {data ? <List items={data} href="/hotels" /> : null}
        </>
    );
};
