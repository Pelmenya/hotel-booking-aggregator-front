import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { getImageUrl } from 'utils/getImageUrl';
import { getRole } from 'utils/getRole';
import { Confirm } from './confirm';

export const UserInfo = () => {
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
            </div>
        </>
    );
};
