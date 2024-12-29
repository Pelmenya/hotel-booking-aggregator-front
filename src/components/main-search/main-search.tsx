import { useLazySearchHotelsQuery } from '@/redux/api/hotels-api';
import { MouseEvent, useState } from 'react';
import { List } from '../list/list';

export const MainSearch = () => {
    const [qString, setQString] = useState('');

    const [trigger, { data }] = useLazySearchHotelsQuery();

    const searchHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        trigger(qString).unwrap();
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

            {data ? <List items={data} href="/hotels" /> : null}
        </>
    );
};
