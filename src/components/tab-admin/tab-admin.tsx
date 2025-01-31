import { TabContentCreateHotel } from './components/tab-content-create-hotel/tab-content-create-hotel';
import { useRouter } from 'next/router';
import { Tab } from '../tab/tab';
import { ContentUsers } from './components/content-users/content-users';
import { TabList } from '../tab/components/tab-list/tab-list';
import { TabListItem } from '../tab/components/tab-list/components/tab-list-item/tab-list-item';

export const TabAdmin = () => {
    const router = useRouter();
    const paths = router.pathname.split('/');
    //    const isHotelRooms = paths.includes('hotel-rooms');
    const isHotels = paths.includes('hotels');
    const isUsers = paths.includes('users');
    //  const isCalendar = paths.includes('calendar');

    return (
        <Tab>
            <TabList>
                <TabListItem href="/admin/hotels" active={isHotels} tab="Жильё">
                    <TabContentCreateHotel />
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

/*                 <TabListItem
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
 */