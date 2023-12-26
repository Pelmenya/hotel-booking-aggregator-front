import { useLazyGetCommonHotelsQuery } from '@/redux/api/common';
import { List } from '../../list/list';
import { CarouselVideo, TSlide } from '@/components/carousel-video/carousel-video';
import { useEffect } from 'react';

const slides: TSlide[] = [
    { url: 'tropical.mp4', head: 'Окунитесь в мир приключений' },
    { url: 'forest.mp4', head: 'Мир изысканной природы' },
    { url: 'agua.mp4', head: 'TOP-HOTELS.SU - Ваш путь'},
];

export const MainPage = () => {
    const [ trigger,  { data }] = useLazyGetCommonHotelsQuery();

    useEffect(() => {
        trigger('').unwrap();
    }, [trigger]);

    return (
        <>
            <CarouselVideo slides={slides} delay={5000}/>
            {data ? <List items={data} href="/hotels" /> : null}
        </>
    );
};
