import { useRouter } from 'next/router';
import { TabHeadLink } from '../tab/components/tab-head/components/tab-head-link/tab-head-link';
import { TabHead } from '../tab/components/tab-head/tab-head';
import { Tab } from '../tab/tab';
import { TabBody } from '../tab/components/tab-body/tab-body';
import { Avatar } from '../pages/profile-page/components/avatar/avatar';
import { TabBodyItem } from '../tab/components/tab-body/components/tab-body-item.tsx/tab-body-item';
import { UpdateUserForm } from '../forms/update-user-form/update-user-form';
import { UserInfo } from './components/user-info';
import { UpdatePasswordForm } from '../forms/update-password-form/update-password-form';
import { useTranslation } from 'react-i18next';

export const TabProfile = () => {
    const { t } = useTranslation('account');
    const router = useRouter();
    const paths = router.pathname.split('/');

    const isEdit = paths.includes('edit');
    const isPassword = paths.includes('password');
    const isProfile = paths.includes('profile') && !isEdit && !isPassword;

    return (
        <Tab>
            <TabHead>
                <TabHeadLink href="/profile" active={isProfile}>
                    {t('profile', 'Профиль')}
                </TabHeadLink>
                <TabHeadLink href="/profile/edit" active={isEdit}>
                    {t('editing', 'Редактирование')}
                </TabHeadLink>
                <TabHeadLink href="/profile/password" active={isPassword}>
                    {t('passwordChange', 'Смена пароля')}
                </TabHeadLink>
            </TabHead>
            <TabBody>
                <TabBodyItem active={isProfile}>
                    <div className="bg-base-100 px-4 py-4 h-full w-full rounded-md flex flex-col items-center justify-center text-base-content">
                        <UserInfo />
                    </div>
                </TabBodyItem>
                <TabBodyItem active={isEdit}>
                    <div className="bg-base-100 px-4 py-4 h-full w-full rounded-md flex flex-col items-center justify-center text-base-content">
                        <Avatar />
                        <UpdateUserForm />
                    </div>
                </TabBodyItem>
                <TabBodyItem active={isPassword}>
                    <div className="bg-base-100 px-4 py-4 h-full w-full rounded-md flex flex-col items-center justify-center text-base-content">
                        <UpdatePasswordForm />
                    </div>
                </TabBodyItem>
            </TabBody>
        </Tab>
    );
};
