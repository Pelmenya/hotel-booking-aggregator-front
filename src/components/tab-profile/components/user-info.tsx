import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { usePostLogoutMutation } from '@/redux/api/auth';
import { getUserState } from '@/redux/selectors/user';
import { removeUser } from '@/redux/slices/user';
import Link from 'next/link';
import { getImageUrl } from 'utils/getImageUrl';
import { getRole } from 'utils/getRole';

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
                <div className="flex w-full justify-between py-2">
                    <p>Почта</p>
                    <p>{user?.email}</p>
                </div>
                <div className="flex w-full justify-between py-2">
                    <p>Контактный телефон</p>
                    <p>{user?.contactPhone}</p>
                </div>
                <div className="flex w-full justify-between py-2">
                    <p>Роль пользователя</p>
                    <p>{user?.role ? getRole(user.role) : ''}</p>
                </div>
            </div>
            <div className="flex flex-col w-full max-w-xl divide-y-2">
                <Link
                    href={'/profile/edit'}
                    className="flex w-full justify-between py-2 text-primary cursor-pointer"
                >
                    Изменить данные
                </Link>
                <Link
                    href={'/profile/password'}
                    className="flex w-full justify-between py-2 text-primary cursor-pointer"
                >
                    Изменить пароль
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
                    Выйти
                </button>
            </div>
        </>
    );
};
