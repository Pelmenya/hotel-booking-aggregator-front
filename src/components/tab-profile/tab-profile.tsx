import { useRouter } from 'next/router';
import { TabHeadLink } from '../tab/components/tab-head/components/tab-head-link/tab-head-link';
import { TabHead } from '../tab/components/tab-head/tab-head';
import { Tab } from '../tab/tab';
import { TabBody } from '../tab/components/tab-body/tab-body';
import { Avatar } from '../pages/profile-page.tsx/components/avatar/avatar';
import { TabBodyItem } from '../tab/components/tab-body/components/tab-body-item.tsx/tab-body-item';
import { UpdateUserForm } from '../forms/update-user-form/update-user-form';

export const TabProfile = () => {
    const router = useRouter();
    const paths = router.pathname.split('/');

    const isEdit = paths.includes('edit');
    const isPassword = paths.includes('password');
    const isProfile = paths.includes('profile') && !isEdit && !isPassword ;
    
    return (
        <Tab>
            <TabHead>
                <TabHeadLink href="/profile" active={isProfile}>
                    Пользователь
                </TabHeadLink>
                <TabHeadLink href="/profile/edit" active={isEdit}>
                    Редактирование
                </TabHeadLink>
                <TabHeadLink href="/profile/password" active={isPassword}>
                    Смена пароля
                </TabHeadLink>
            </TabHead>
            <TabBody>
                <TabBodyItem active={isProfile} firstInTab={true}>
                    <div className="bg-base-100 px-4 py-4 h-full w-full rounded-md flex flex-col items-center justify-center">
                        <Avatar />
                        <UpdateUserForm />
                    </div>
                </TabBodyItem>
                <TabBodyItem active={isEdit}>
                    <Avatar />
                </TabBodyItem>
            </TabBody>
        </Tab>
    );
};
