import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';
import { UserInfo } from '../user-info';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { usePostLogoutMutation } from '@/redux/api/auth';
import { removeUser } from '@/redux/slices/user';
import { Avatar } from '@/components/pages/profile-page/components/avatar/avatar';
import { UpdateUserForm } from '@/components/forms/update-user-form/update-user-form';
import { UpdatePasswordForm } from '@/components/forms/update-password-form/update-password-form';

export const ContentProfile = () => {
    const dispatch = useAppDispatch();
    const [postLogout] = usePostLogoutMutation();
    const router = useRouter();
    const pathSegments = useMemo(() => router.asPath.split('/'), [router.asPath]);

    const isProfileEdit = useMemo(() => pathSegments.includes('profile') && pathSegments.includes('edit'), [pathSegments]);
    const isPasswordChange = useMemo(() => pathSegments.includes('profile') && pathSegments.includes('password'), [pathSegments]);
    const isProfile = useMemo(() => pathSegments.includes('profile') && !isPasswordChange && !isProfileEdit, [pathSegments, isPasswordChange, isProfileEdit]);

    const handleLogout = useCallback(async () => {
        const logout = await postLogout(null).unwrap();
        if (logout.success) {
            dispatch(removeUser());
        }
    }, [postLogout, dispatch]);

    return (
        <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">
            <div className="col-span-1 border border-base-300 rounded-[0.375rem] flex flex-col justify-between">
                <TabMenu>
                    <TabMenuLink
                        href="/profile"
                        active={isProfile}
                        text="Личный кабинет"
                        icon="profile"
                    />
                    <TabMenuLink
                        href="/profile/edit"
                        active={isProfileEdit}
                        text="Изменить данные"
                        icon="identification"
                    />
                    <TabMenuLink
                        href="/profile/password"
                        active={isPasswordChange}
                        text="Изменить пароль"
                        icon="secure"
                    />
                </TabMenu>
                <TabMenu>
                    <TabMenuLink
                        active={true}
                        text="Выйти"
                        icon="logout"
                        handlerOnClick={handleLogout}
                    />
                </TabMenu>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md h-full w-full flex flex-col items-center justify-center text-base-content">
                {isProfile && <UserInfo />}
                {isProfileEdit && (
                    <div className="bg-base-100 px-4 py-4 h-full w-full rounded-md flex flex-col items-center justify-center text-base-content">
                        <Avatar />
                        <UpdateUserForm />
                    </div>
                )}
                {isPasswordChange && (
                    <div className="bg-base-100 px-4 py-4 h-full w-full rounded-md flex flex-col items-center justify-center text-base-content">
                        <UpdatePasswordForm />
                    </div>
                )}
            </div>
        </div>
    );
};
