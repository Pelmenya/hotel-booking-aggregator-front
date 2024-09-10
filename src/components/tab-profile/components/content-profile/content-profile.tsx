import { useRouter } from 'next/router';
import { TabMenu } from '@/components/tab/components/tab-menu/tab-menu';
import { TabMenuLink } from '@/components/tab/components/tab-menu/components/tab-menu-link/tab-menu-link';
import { UserInfo } from '../user-info';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { usePostLogoutMutation } from '@/redux/api/auth';
import { removeUser } from '@/redux/slices/user';

export const ContentProfile = () => {
    const dispatch = useAppDispatch();
    const [postLogout] = usePostLogoutMutation();
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isProfileEdit = paths.includes('profile') && paths.includes('edit');
    const isPasswordChange =
        paths.includes('profile') && paths.includes('password');
    const isProfile =
        paths.includes('profile') && !isPasswordChange && !isProfileEdit;

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
                        handlerOnClick={async () => {
                            const logout = await postLogout(null).unwrap();
                            if (logout.success) {
                                dispatch(removeUser());
                            }
                        }}
                    />
                </TabMenu>
            </div>
            <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md h-full w-full flex flex-col items-center justify-center text-base-content">
                {isProfile && <UserInfo />}
            </div>
        </div>
    );
};
