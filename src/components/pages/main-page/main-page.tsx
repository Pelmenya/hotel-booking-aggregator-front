import { useGetCommonHotelsQuery } from '@/redux/api/common';
import { List } from '../../list/list';
import { CarouselVideo, TSlide } from '@/components/carousel-video/carousel-video';

const sls: TSlide[] = [
    { url: 'tropical.mp4', head: 'Окунитесь в мир приключений' },
    { url: 'forest.mp4', head: 'Мир изысконной природы' },
    { url: 'agua.mp4', head: 'TOP-HOTELS.SU - твой путь'},
];

export const MainPage = () => {
    const { data } = useGetCommonHotelsQuery('');

    return (
        <>
            <CarouselVideo slides={sls} delay={5000}/>
            {data ? <List items={data} href="/hotels" /> : null}
        </>
    );
};
