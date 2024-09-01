import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { usePostLogoutMutation } from '@/redux/api/auth';
import { getUserState } from '@/redux/selectors/user';
import { removeUser } from '@/redux/slices/user';
import Link from 'next/link';
import { getImageUrl } from 'utils/getImageUrl';
import { getRole } from 'utils/getRole';
import IdentificationIcon from '@/icons/identification.svg';
import PasswordIcon from '@/icons/shield-check.svg';
import LogoutIcon from '@/icons/logout-icon.svg';
import { Confirm } from './confirm';
import  { Countdown } from '@/components/count-down/count-down';

export const UserInfo = () => {
    const dispatch = useAppDispatch();
    const [postLogout] = usePostLogoutMutation();
    const { user } = useAppSelector(getUserState);

    return (
        <>
            {user?.avatars?.length ? (
                <div className="avatar">
                    <div className="w-36 rounded-full">
                        <picture>
                            <img
                                src={getImageUrl(user?.avatars[0])}
                                alt={user?.name}
                            />
                        </picture>
                    </div>
                </div>
            ) : null}
            <div className="flex flex-col w-full max-w-xl divide-y-2 py-20">
                <div className="flex w-full justify-between py-2">
                    <p>Имя</p>
                    <p>{user?.name}</p>
                </div>
                {user?.emailIsConfirm ? (
                    <div className="flex w-full justify-between py-2">
                        <p>Почта</p>
                        <p>{user?.email}</p>
                    </div>
                ) : (
                    <Confirm user={user} channel="EMAIL" />
                )}
                {user?.phoneIsConfirm ? (
                    <div className="flex w-full justify-between py-2">
                        <p>Контактный телефон</p>
                        <p>{user?.contactPhone}</p>
                    </div>
                ) : (
                    <Confirm user={user} channel="SMS" />
                )}
                <div className="flex w-full justify-between py-2">
                    <p>Роль пользователя</p>
                    <p>{user?.role ? getRole(user.role) : ''}</p>
                </div>
                <div className="flex w-full justify-between py-2">
                    <Countdown initialMinutes={0} initialSeconds={5}/>
                </div>
            </div>
            <div className="flex flex-col w-full max-w-xl divide-y-2">
                <Link
                    href={'/profile/edit'}
                    className="flex w-full justify-between py-2 text-primary cursor-pointer"
                >
                    <div className="flex gap-2">
                        <IdentificationIcon />
                        Изменить данные
                    </div>
                </Link>
                <Link
                    href={'/profile/password'}
                    className="flex w-full justify-between py-2 text-primary cursor-pointer"
                >
                    <div className="flex gap-2">
                        <PasswordIcon />
                        Изменить пароль
                    </div>
                </Link>
                <button
                    className="flex w-full justify-between py-2 text-error cursor-pointer"
                    onClick={async () => {
                        const logout = await postLogout(null).unwrap();
                        if (logout.success) {
                            dispatch(removeUser());
                        }
                    }}
                >
                    <div className="flex gap-2">
                        <LogoutIcon />
                        Выйти
                    </div>
                </button>
            </div>
        </>
    );
};
