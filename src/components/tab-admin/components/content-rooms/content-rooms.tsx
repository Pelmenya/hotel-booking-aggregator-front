import { HotelCreateForm } from '@/components/forms/hotel-create-form/hotel-create-form';
import { useRouter } from 'next/router';
import cn from 'classnames';
import Link from 'next/link';
import { HotelEditForm } from '@/components/forms/hotel-edit-form/hotel-edit-form';
import { TabMenuLink } from '../tab-menu-link/tab-menu-link';
import { HotelRoomCreateForm } from '@/components/forms/hotel-room-create-form/hotel-room-create-form';

export const ContentRooms = () => {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isEdit = paths.includes('edit');
    const isDelete = paths.includes('delete');

    return (
        <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">
            <div className="col-span-1">
                <div className="btn-group btn-group-vertical bg-base-100 px-2 py-2 rounded-md w-full">
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
                </div>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md">
                {!isEdit && !isDelete && <HotelRoomCreateForm/>}
                {isEdit && <HotelEditForm />}
            </div>
        </div>
    );
};
