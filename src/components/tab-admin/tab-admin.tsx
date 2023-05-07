import cn from 'classnames';
import styles from './tab-admin.module.css';
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
    const isHotelRooms = router.pathname.split('/').includes('hotel-rooms');
    const currentPage = (isHotelRooms && 'hotel-rooms') || 'hotels';

    return (
        <Tab>
            <TabHead>
                <TabHeadLink
                    href="/admin/hotels"
                    active={currentPage === 'hotels'}
                >
                    Отели
                </TabHeadLink>
                <TabHeadLink
                    href="/admin/hotel-rooms"
                    active={currentPage === 'hotel-rooms'}
                >
                    Номера
                </TabHeadLink>
            </TabHead>
            <TabBody>
                <TabBodyItem
                    active={currentPage === 'hotels'}
                    firstInTab={true}
                >
                    <ContentHotels />
                </TabBodyItem>
                <TabBodyItem active={currentPage === 'hotel-rooms'}>
                    <ContentRooms />
                </TabBodyItem>
            </TabBody>
        </Tab>
    );
};
