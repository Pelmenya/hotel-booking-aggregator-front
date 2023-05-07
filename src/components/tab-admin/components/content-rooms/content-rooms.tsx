import { useRouter } from 'next/router';
import { HotelRoomCreateForm } from '@/components/forms/hotel-room-create-form/hotel-room-create-form';
import { HotelRoomEditForm } from '@/components/forms/hotel-room-edit-form.tsx/hotel-room-edit-form';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';

export const ContentRooms = () => {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isEdit = paths.includes('edit');
    const isDelete = paths.includes('delete');

    return (
        <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">
            <div className="col-span-1">
                <TabMenu>
                    <TabMenuLink
                        href="/admin/hotel-rooms"
                        active={!isEdit && !isDelete}
                        text="Добавить"
                    />
                    <TabMenuLink
                        href="/admin/hotel-rooms/edit"
                        active={isEdit}
                        text="Редактировать"
                    />
                    <TabMenuLink
                        href="/admin/hotel-rooms/delete"
                        active={isDelete}
                        text="Удалить"
                    />
                </TabMenu>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md">
                {!isEdit && !isDelete && <HotelRoomCreateForm />}
                {isEdit && <HotelRoomEditForm />}
            </div>
        </div>
    );
};
