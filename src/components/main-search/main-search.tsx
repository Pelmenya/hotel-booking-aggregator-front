import { useLazySearchHotelsQuery } from '@/redux/api/hotels-api';
import { MouseEvent, useState, useCallback, useEffect } from 'react';
import { List } from '../list/list';
import { useInView } from 'react-intersection-observer';
import { THotelResData } from '@/types/t-hotel-res-data'; 
import { Loading } from '../loading/loading';

export const MainSearch = () => {
    const [qString, setQString] = useState('Moscow'); // старт
    const [hotels, setHotels] = useState<THotelResData[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10; // количество отелей, получаемых за один запрос

    const [trigger, { isFetching }] = useLazySearchHotelsQuery();

    const fetchHotels = useCallback(async () => {
        try {
            const result = await trigger(`${qString}&limit=${limit}&offset=${page * limit}`).unwrap();
            if (result.length === 0) {
                setHasMore(false); // Если данные пустые, устанавливаем флаг окончания
            } else {
                setHotels((prevHotels) => [...prevHotels, ...result]);
            }
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    }, [trigger, qString, page, limit]);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '100px',
    });

    // Загружаем новые отели, когда элемент становится видимым
    useEffect(() => {
        if (inView && !isFetching && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, isFetching, hasMore]);

    useEffect(() => {
        if (page > 0 && hasMore) {
            fetchHotels();
        }
    }, [page, fetchHotels, hasMore]);

    const searchHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setHotels([]); // сбросить текущий список отелей
        setPage(1); // начать с первой страницы
        setHasMore(true); // сбросить флаг окончания
    };

    return (
        <>
            <form name="w-full h-full items-center justify-center">
                <div className="w-full h-full flex items-center justify-center relative pt-64 mb-16">
                    <label
                        htmlFor="MainSearchInput"
                        className="relative border  w-full max-w-4xl rounded-xl"
                    >
                        <input
                            onChange={(e) => setQString(e.target.value)}
                            id="MainSearchInput"
                            className="input rounded-xl input-lg w-full max-w-4xl focus:outline-none"
                            type="text"
                            placeholder="Название или город отеля..."
                        />
                        <button
                            onClick={(e) => searchHandler(e)}
                            className="btn btn-primary btn-lg absolute right-0 h-16 rounded-xl"
                        >
                            Поиск
                        </button>
                    </label>
                </div>
            </form>

            <List items={hotels} href="/hotels" />

            {/* Элемент, который будет следить за видимостью */}
            <div ref={ref} style={{ height: '100px', background: 'transparent' }}>
                {isFetching && <Loading color="text-primary" size="loading-xs" type="loading-bars" />}
            </div>
        </>
    );
};
