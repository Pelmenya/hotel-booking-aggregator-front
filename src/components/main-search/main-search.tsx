import { useLazySearchHotelsQuery } from '@/redux/api/hotels-api';
import { MouseEvent, useState, useCallback, useEffect } from 'react';
import { List } from '../list/list';
import { useInView } from 'react-intersection-observer';
import { THotelResData } from '@/types/t-hotel-res-data';
import { Loading } from '../loading/loading';
import { useTranslation } from 'react-i18next';
import { Base } from '../base/base';

export const MainSearch = () => {
    const { t } = useTranslation('form');
    const [qString, setQString] = useState('Moscow'); // старт
    const [hotels, setHotels] = useState<THotelResData[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10; // количество отелей, получаемых за один запрос

    const [trigger, { isFetching }] = useLazySearchHotelsQuery();

    const fetchHotels = useCallback(async () => {
        try {
            const result = await trigger(
                `${qString}&limit=${limit}&offset=${page * limit}`
            ).unwrap();
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
        if (page > -1 && hasMore) {
            fetchHotels();
        }
    }, [page, fetchHotels, hasMore]);

    const searchHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setHotels([]); // сбросить текущий список отелей
        setPage(0); // начать с 0 страницы
        setHasMore(true); // сбросить флаг окончания
    };

    return (
        <>
            <form name="w-full h-full items-center justify-center">
                <div className="w-full h-full flex border border-base-300 bg-base-100 rounded-box p-12 items-center justify-center relative mt-12 mb-8">
                    <label
                        htmlFor="MainSearchInput"
                        className="relative border w-full max-w-4xl rounded-xl"
                    >
                        <input
                            onChange={(e) => setQString(e.target.value)}
                            id="MainSearchInput"
                            className="input rounded-xl sm:input-md md:input-lg w-full max-w-4xl focus:outline-none"
                            type="text"
                            placeholder={t(
                                'PLACEHOLDER_FORM_SEARCH_HOTELS',
                                'Отель, адрес'
                            )}
                        />
                        <button
                            onClick={(e) => searchHandler(e)}
                            className="btn btn-primary btn-md md:btn-lg  absolute right-0 rounded-xl"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </button>
                    </label>
                </div>
            </form>
            <List items={hotels} href="/hotels" />

            {/* Элемент, который будет следить за видимостью */}
            <div
                ref={ref}
                style={{ height: '100px', background: 'transparent' }}
            >
                {isFetching && (
                    <Loading
                        color="text-primary"
                        size="loading-xs"
                        type="loading-bars"
                    />
                )}
            </div>
        </>
    );
};
