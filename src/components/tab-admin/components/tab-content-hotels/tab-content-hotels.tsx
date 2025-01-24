import { HotelCreateForm } from '@/components/forms/hotel-create-form/hotel-create-form';
import { useRouter } from 'next/router';
import { HotelEditForm } from '@/components/forms/hotel-edit-form/hotel-edit-form';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';
import AddressSearch from '@/components/address-search/address-search';
import { TabContent } from '@/components/tab/components/tab-content/tab-content';
import { TabContentMain } from '@/components/tab/components/tab-content/tab-content-main/tab-content-main';

export const TabContentHotels = () => {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isEdit = paths.includes('edit');
    const isDelete = paths.includes('delete');

    return (
        <TabContent>
            <TabMenu>
                <TabMenuLink
                    href="/admin/hotels"
                    active={!isEdit && !isDelete}
                    text="Добавить"
                    icon="add"
                />
                <TabMenuLink
                    href="/admin/hotels/edit"
                    active={isEdit}
                    text="Редактировать"
                    icon="edit"
                />
                <TabMenuLink
                    href="/admin/hotels/delete"
                    active={isDelete}
                    text="Удалить"
                    disabled={true}
                    icon="delete"
                />
            </TabMenu>
            <TabContentMain>
                {!isEdit && !isDelete && <HotelCreateForm />}
                {isEdit && <HotelEditForm />}
                <AddressSearch />
            </TabContentMain>
        </TabContent>
    );
};
