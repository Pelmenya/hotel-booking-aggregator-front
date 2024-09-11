import { useRouter } from 'next/router';
import { TabHeadLink } from '../tab/components/tab-head/components/tab-head-link/tab-head-link';
import { TabHead } from '../tab/components/tab-head/tab-head';
import { Tab } from '../tab/tab';
import { TabBody } from '../tab/components/tab-body/tab-body';
import { Avatar } from '../pages/profile-page/components/avatar/avatar';
import { TabBodyItem } from '../tab/components/tab-body/components/tab-body-item.tsx/tab-body-item';
import { UpdateUserForm } from '../forms/update-user-form/update-user-form';
import { UpdatePasswordForm } from '../forms/update-password-form/update-password-form';
import { useTranslation } from 'react-i18next';
import { ContentProfile } from './components/content-profile/content-profile';

export const TabProfile = () => {
    const { t } = useTranslation('account');
    const router = useRouter();
    const paths = router.pathname.split('/');
    const isProfile = paths.includes('profile');
    const isSettings = paths.includes('settings');

    return (
        <Tab>
            <TabHead>
                <TabHeadLink href="/profile" active={isProfile}>
                    {t('profile', 'Профиль')}
                </TabHeadLink>
                <TabHeadLink href="/settings" active={isSettings}>
                    {t('settings', 'Настройки')}
                </TabHeadLink>
            </TabHead>
            <TabBody>
                <TabBodyItem active={isProfile}>
                    <ContentProfile />
                </TabBodyItem>
                <TabBodyItem active={isSettings}>
                    <div>Здесь будет страница настроек</div>
                </TabBodyItem>
            </TabBody>
        </Tab>
    );
};
