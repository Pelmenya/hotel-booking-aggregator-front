import { useState } from 'react';
import cn from 'classnames';
import styles from './tab-admin.module.css';
import { ContentHotels } from './components/content-hotels/content-hotels';
import { ContentRooms } from './components/content-rooms/content-rooms';

export const TabAdmin = () => {
    const [tab, setTab] = useState<'hotels' | 'hotel-rooms'>('hotels');
    return (
        <div className="tabs mx-auto max-w-7xl py-6 w-full grid">
            <nav>
                <button
                    onClick={() => setTab('hotels')}
                    className={cn('tab', {
                        ['tab-lifted tab-active [--tab-bg:hsl(var(--n))] [--tab-color:hsl(var(--nc))] [--tab-border-color:hsl(var(--n))] font-bold']:
                            tab === 'hotels',
                    })}
                >
                    Отели
                </button>
                <button
                    onClick={() => setTab('hotel-rooms')}
                    className={cn('tab', {
                        ['tab tab-lifted tab-active [--tab-bg:hsl(var(--n))] [--tab-color:hsl(var(--nc))] [--tab-border-color:hsl(var(--n))] font-bold']:
                            tab === 'hotel-rooms',
                    })}
                >
                    Номера
                </button>
            </nav>
            <div className={cn(styles.tab, 'drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]')}>
                {tab === 'hotels' ? (
                    <div
                        className={cn(
                            'bg-neutral px-4 py-4 rounded-md text-sm font-medium text-neutral-content',
                            styles.start
                        )}
                    >
                        <ContentHotels />
                    </div>
                ) : tab === 'hotel-rooms' ? (
                    <div
                        className={cn(
                            'bg-neutral px-4 py-4 rounded-md text-sm font-medium text-neutral-content'
                        )}
                    >
                        <ContentRooms />
                    </div>
                ) : null}
                <div></div>
            </div>
        </div>
    );
};
