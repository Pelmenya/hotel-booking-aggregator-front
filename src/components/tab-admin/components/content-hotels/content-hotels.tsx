import { HotelCreateForm } from '@/components/forms/hotel-create-form/hotel-create-form';
import { useRouter } from 'next/router';
import { HotelEditForm } from '@/components/forms/hotel-edit-form/hotel-edit-form';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';

export const ContentHotels = () => {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isEdit = paths.includes('edit');
    const isDelete = paths.includes('delete');

    return (
        <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">
            <div className="col-span-1 border border-orange-300 rounded-[0.375rem]">
                <TabMenu>
                    <TabMenuLink
                        href="/admin/hotels"
                        active={!isEdit && !isDelete}
                        text="Добавить"
                    />
                    <TabMenuLink
                        href="/admin/hotels/edit"
                        active={isEdit}
                        text="Редактировать"
                    />
                    <TabMenuLink
                        href="/admin/hotels/delete"
                        active={isDelete}
                        text="Удалить"
                        disabled={true}
                    />
                </TabMenu>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md">
                {!isEdit && !isDelete && <HotelCreateForm />}
                {isEdit && <HotelEditForm />}
            </div>
        </div>
    );
};
