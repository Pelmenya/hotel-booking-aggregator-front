import { useRouter } from 'next/router';
import { TabHeadLink } from '../tab/components/tab-head/components/tab-head-link/tab-head-link';
import { TabHead } from '../tab/components/tab-head/tab-head';
import { Tab } from '../tab/tab';
import { TabBody } from '../tab/components/tab-body/tab-body';
import { TabBodyItem } from '../tab/components/tab-body/components/tab-body-item.tsx/tab-body-item';
import { useTranslation } from 'react-i18next';
import { TabContentProfile } from './components/tab-content-profile/tab-content-profile';

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
                    <TabContentProfile />
                </TabBodyItem>
                <TabBodyItem active={isSettings}>
                    <div>Здесь будет страница настроек</div>
                </TabBodyItem>
            </TabBody>
        </Tab>
    );
};
