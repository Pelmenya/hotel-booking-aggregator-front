import { useRouter } from 'next/router';
import { HotelEditForm } from '@/components/forms/hotel-edit-form/hotel-edit-form';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';
import AddressSearch from '@/components/address-search/address-search';
import { TabContent } from '@/components/tab/components/tab-content/tab-content';
import { TabContentMain } from '@/components/tab/components/tab-content/tab-content-main/tab-content-main';
import { RealEstateChange } from './components/real-estate-change';
import { Steps } from './components/steps';

export const TabContentHotels = () => {
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
                    <div className="border border-base-300 bg-base-100 rounded-box pt-0 px-4 pb-8 flex flex-col items-center gap-6 w-full">
                        <RealEstateChange />
                        <AddressSearch />
                        <button className='btn btn-primary w-full max-w-md'>Далее</button>
                        {/* <HotelCreateForm /> */}
                    </div>
                )}

                {isEdit && <HotelEditForm />}
            </TabContentMain>
        </TabContent>
    );
};
