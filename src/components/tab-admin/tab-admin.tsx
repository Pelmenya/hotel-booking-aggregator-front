import { ContentHotels } from './components/content-hotels/content-hotels';
import { ContentRooms } from './components/content-rooms/content-rooms';
import { useRouter } from 'next/router';
import { Tab } from '../tab/tab';
import { TabHead } from '../tab/components/tab-head/tab-head';
import { TabHeadLink } from '../tab/components/tab-head/components/tab-head-link/tab-head-link';
import { TabBody } from '../tab/components/tab-body/tab-body';
import { TabBodyItem } from '../tab/components/tab-body/components/tab-body-item.tsx/tab-body-item';

export const TabAdmin = () => {
    const router = useRouter();
    const paths = router.pathname.split('/');
    const isHotelRooms = paths.includes('hotel-rooms');
    const isHotels = paths.includes('hotels');

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
            </TabHead>
            <TabBody>
                <TabBodyItem
                    active={isHotels}
                    firstInTab={true}
                >
                    <ContentHotels />
                </TabBodyItem>
                <TabBodyItem active={isHotelRooms}>
                    <ContentRooms />
                </TabBodyItem>
            </TabBody>
        </Tab>
    );
};
