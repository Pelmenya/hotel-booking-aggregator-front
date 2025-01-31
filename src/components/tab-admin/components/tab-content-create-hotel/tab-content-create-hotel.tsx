import { useRouter } from 'next/router';
import { HotelEditForm } from '@/components/forms/hotel-edit-form/hotel-edit-form';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';
import { TabContent } from '@/components/tab/components/tab-content/tab-content';
import { TabContentMain } from '@/components/tab/components/tab-content/tab-content-main/tab-content-main';
import { Steps } from './components/steps';
import { CreateHotelMain } from './components/create-hotel-main';

export const TabContentCreateHotel = () => {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isEdit = paths.includes('edit');
    const isDelete = paths.includes('delete');

    return (
        <TabContent isMdRow={false}>
            <div className="flex items-center flex-wrap gap-4 w-full">
                <TabMenu isMdRow={false}>
                    <TabMenuLink
                        href="/admin/hotels"
                        active={!isEdit && !isDelete}
                        tooltip="bottom"
                        text="Добавить"
                        icon="add"
                    />
                    <TabMenuLink
                        href="/admin/hotels"
                        active={isEdit}
                        tooltip="bottom"
                        text="Редактировать"
                        icon="edit"
                    />
                    <TabMenuLink
                        href="/admin/hotels"
                        tooltip="bottom"
                        active={isDelete}
                        text="Архив"
                        icon="delete"
                    />
                </TabMenu>
                <Steps />
            </div>
            <TabContentMain>
                {!isEdit && !isDelete && (
                    <CreateHotelMain />
                )}
                {isEdit && <HotelEditForm />}
            </TabContentMain>
        </TabContent>
    );
};
