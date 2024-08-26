import { ContentHotels } from './components/content-hotels/content-hotels';
import { ContentRooms } from './components/content-rooms/content-rooms';
import { useRouter } from 'next/router';
import { Tab } from '../tab/tab';
import { TabHead } from '../tab/components/tab-head/tab-head';
import { TabHeadLink } from '../tab/components/tab-head/components/tab-head-link/tab-head-link';
import { TabBody } from '../tab/components/tab-body/tab-body';
import { TabBodyItem } from '../tab/components/tab-body/components/tab-body-item.tsx/tab-body-item';
import { ContentUsers } from './components/content-users/content-users';
import { ContentCalendar } from './components/content-calendar/content-calendar';

export const TabAdmin = () => {
    const router = useRouter();
    const paths = router.pathname.split('/');
    const isHotelRooms = paths.includes('hotel-rooms');
    const isHotels = paths.includes('hotels');
    const isUsers = paths.includes('users');
    const isCalendar = paths.includes('calendar');

    return (
        <Tab>
            <TabHead>
                <TabHeadLink
                    href="/admin/hotels"
                    active={isHotels}
                >
                    Отели
                </TabHeadLink>
                <TabHeadLink
                    href="/admin/hotel-rooms"
                    active={isHotelRooms}
                >
                    Номера
                </TabHeadLink>
                <TabHeadLink
                    href="/admin/calendar"
                    active={isCalendar}
                >
                    Календарь
                </TabHeadLink>
                <TabHeadLink
                    href="/admin/users"
                    active={isUsers}
                >
                    Пользователи
                </TabHeadLink>
            </TabHead>
            <TabBody>
                <TabBodyItem
                    active={isHotels}
                >
                    <ContentHotels />
                </TabBodyItem>
                <TabBodyItem active={isHotelRooms}>
                    <ContentRooms />
                </TabBodyItem>
                <TabBodyItem active={isCalendar}>
                    <ContentCalendar />
                </TabBodyItem>
                <TabBodyItem active={isUsers}>
                    <ContentUsers />
                </TabBodyItem>
            </TabBody>
        </Tab>
    );
};
