import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';
import { UserInfo } from '../user-info';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { usePostLogoutMutation } from '@/redux/api/auth-api';
import { removeUser } from '@/redux/slices/user-slice';
import { Avatar } from '@/components/pages/profile-page/components/avatar/avatar';
import { UpdateUserForm } from '@/components/forms/update-user-form/update-user-form';
import { UpdatePasswordForm } from '@/components/forms/update-password-form/update-password-form';
import { TabContent } from '@/components/tab/components/tab-content/tab-content';
import { TabMenuWrapper } from '@/components/tab/components/tab-menu/components/tab-menu-wrapper/tab-menu-wrapper';
import { TabContentMain } from '@/components/tab/components/tab-content/tab-content-main/tab-content-main';
import { useTranslation } from 'react-i18next';

export const TabContentProfile = () => {
    const { t } = useTranslation('account');
    const dispatch = useAppDispatch();
    const [postLogout] = usePostLogoutMutation();
    const router = useRouter();
    const pathSegments = useMemo(
        () => router.asPath.split('/'),
        [router.asPath]
    );

    const isProfileEdit = useMemo(
        () => pathSegments.includes('profile') && pathSegments.includes('edit'),
        [pathSegments]
    );
    const isPasswordChange = useMemo(
        () =>
            pathSegments.includes('profile') &&
            pathSegments.includes('password'),
        [pathSegments]
    );
    const isProfile = useMemo(
        () =>
            pathSegments.includes('profile') &&
            !isPasswordChange &&
            !isProfileEdit,
        [pathSegments, isPasswordChange, isProfileEdit]
    );

    const handleLogout = useCallback(async () => {
        const logout = await postLogout(null).unwrap();
        if (logout.success) {
            dispatch(removeUser());
        }
    }, [postLogout, dispatch]);

    return (
        <TabContent>
            <TabMenuWrapper>
                <TabMenu>
                    <TabMenuLink
                        href="/profile"
                        active={isProfile}
                        text={t('TAB_MENU_LINK_ACCOUNT', 'Личный кабинет')}
                        icon="account"
                    />
                    <TabMenuLink
                        href="/profile/edit"
                        active={isProfileEdit}
                        text={t('TAB_MENU_LINK_EDIT_DATA', 'Изменить данные')}
                        icon="identification"
                    />
                    <TabMenuLink
                        href="/profile/password"
                        active={isPasswordChange}
                        text={t('TAB_MENU_LINK_SECURE', 'Изменить пароль')}
                        icon="secure"
                    />
                </TabMenu>
                <TabMenu>
                    <TabMenuLink
                        active={true}
                        text={t('TAB_MENU_LINK_LOGOUT', 'Выйти')}
                        icon="logout"
                        handlerOnClick={handleLogout}
                    />
                </TabMenu>
            </TabMenuWrapper>
            <TabContentMain>
                {isProfile && <UserInfo />}
                {isProfileEdit && (
                    <>
                        <Avatar />
                        <UpdateUserForm />
                    </>
                )}
                {isPasswordChange && <UpdatePasswordForm />}
            </TabContentMain>
        </TabContent>
    );
};
