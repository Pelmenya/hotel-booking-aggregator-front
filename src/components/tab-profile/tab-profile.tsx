import { useRouter } from 'next/router';
import { Tab } from '../tab/tab';
import { useTranslation } from 'react-i18next';
import { TabContentProfile } from './components/tab-content-profile/tab-content-profile';
import { TabList } from '../tab/components/tab-list/tab-list';
import { TabListItem } from '../tab/components/tab-list/components/tab-list-item/tab-list-item';

export const TabProfile = () => {
    const { t } = useTranslation('account');
    const router = useRouter();
    const paths = router.pathname.split('/');
    const isProfile = paths.includes('profile');
    const isSettings = paths.includes('settings');

    return (
        <Tab>
            <TabList>
                <TabListItem
                    href="/profile"
                    active={isProfile}
                    tab={t('TAB_HEAD_LINK_PROFILE', 'Профиль')}
                >
                    <TabContentProfile />
                </TabListItem>
                <TabListItem
                    href="/settings"
                    active={isSettings}
                    tab={t('TAB_HEAD_LINK_SETTINGS', 'Настройки')}
                >
                    <TabContentProfile />
                </TabListItem>
            </TabList>
        </Tab>
    );
};
