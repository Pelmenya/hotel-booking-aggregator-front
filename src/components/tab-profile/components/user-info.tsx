import { Base } from '@/components/base/base';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'utils/getImageUrl';
import { getRole } from 'utils/getRole';
import { Confirm } from './confirm';
import { FullnessProfile } from './fullness-profile/fullness-profile';

export const UserInfo = () => {
    const { t } = useTranslation('form');
    const { user } = useAppSelector(getUserState);

    return (
        <>
            <div className="grid grid-cols-2 gap-8">
                {user?.avatars?.length ? (
                    <div className="avatar h-36">
                        <div className="rounded-full">
                            <picture>
                                <img
                                    src={getImageUrl(user?.avatars[0])}
                                    alt={user?.name}
                                />
                            </picture>
                        </div>
                    </div>
                ) : null}
                <FullnessProfile user={user || null} />
            </div>
            <div className="flex flex-col w-full max-w-xl divide-y-2 py-20 text-sm">
                <div className="flex w-full justify-between py-2">
                    <p>{t('LABEL_INPUT_USER_NAME', 'Имя')}</p>
                    <p>{user?.name}</p>
                </div>
                {user?.emailIsConfirm ? (
                    <div className="flex w-full justify-between py-2">
                        <p>{t('LABEL_INPUT_', 'Почта')}</p>
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
                {user?.address && (
                    <div className="flex w-full justify-between py-2">
                        <p>Адрес</p>
                        <p>{user?.address}</p>
                    </div>
                )}
                {user?.company && (
                    <div className="flex w-full justify-between py-2">
                        <p>Компания</p>
                        <p>{user?.company}</p>
                    </div>
                )}
                {user?.birthday && (
                    <div className="flex w-full justify-between py-2">
                        <p>День рождения</p>
                        <p>{format(new Date(user?.birthday), 'dd-MM-yyyy')}</p>
                    </div>
                )}
                {user?.gender && (
                    <div className="flex w-full justify-between py-2">
                        <p>Пол</p>
                        <p>{user?.gender}</p>
                    </div>
                )}
                <div className="flex w-full justify-between py-2">
                    <p>Роль пользователя</p>
                    <p>{user?.role ? getRole(user.role) : ''}</p>
                </div>
            </div>
        </>
    );
};
