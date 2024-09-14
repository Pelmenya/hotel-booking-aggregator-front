import { ContentHotels } from './components/content-hotels/content-hotels';
import { ContentRooms } from './components/content-rooms/content-rooms';
import { useRouter } from 'next/router';
import { Tab } from '../tab/tab';
import { ContentUsers } from './components/content-users/content-users';
import { ContentCalendar } from './components/content-calendar/content-calendar';
import { TabList } from '../tab/components/tab-list/tab-list';
import { TabListItem } from '../tab/components/tab-list/components/tab-list-item/tab-list-item';

export const TabAdmin = () => {
    const router = useRouter();
    const paths = router.pathname.split('/');
    const isHotelRooms = paths.includes('hotel-rooms');
    const isHotels = paths.includes('hotels');
    const isUsers = paths.includes('users');
    const isCalendar = paths.includes('calendar');

    return (
        <Tab>
            <TabList>
                <TabListItem href="/admin/hotels" active={isHotels} tab="Отели">
                    <ContentHotels />
                </TabListItem>
                <TabListItem
                    href="/admin/hotel-rooms"
                    active={isHotelRooms}
                    tab="Номера"
                >
                    <ContentRooms />
                </TabListItem>
                <TabListItem
                    href="/admin/calendar"
                    active={isCalendar}
                    tab="Календарь"
                >
                    <ContentCalendar />
                </TabListItem>
                <TabListItem
                    href="/admin/users"
                    active={isUsers}
                    tab="Пользователи"
                >
                    <ContentUsers />
                </TabListItem>
            </TabList>
        </Tab>
    );
};
