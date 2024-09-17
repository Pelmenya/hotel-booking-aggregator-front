import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { format } from 'date-fns';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'utils/getImageUrl';
import { getRole } from 'utils/getRole';
import { Confirm } from './confirm';
import { FullnessProfile } from './fullness-profile/fullness-profile';
import EditIcon from '@/icons/edit.svg';
import { getGender } from 'utils/getGender';

export const UserInfo = () => {
    const { t, i18n } = useTranslation('form');
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
                        <p>{t('LABEL_INPUT_EMAIL', 'Почта')}</p>
                        <p>{user?.email}</p>
                    </div>
                ) : (
                    <Confirm user={user} channel="EMAIL" />
                )}
                {user?.phoneIsConfirm ? (
                    <div className="flex w-full justify-between py-2">
                        <p>{t('LABEL_INPUT_PHONE', 'Телефон')}</p>
                        <p>{user?.contactPhone}</p>
                    </div>
                ) : (
                    <Confirm user={user} channel="SMS" />
                )}
                {user?.address && (
                    <div className="flex w-full justify-between py-2">
                        <p>{t('LABEL_INPUT_ADDRESS', 'Адрес')}</p>
                        <p>{user?.address}</p>
                    </div>
                )}
                {user?.company && (
                    <div className="flex w-full justify-between py-2">
                        <p>{t('LABEL_INPUT_COMPANY', 'Компания')}</p>
                        <p>{user?.company}</p>
                    </div>
                )}
                {user?.birthday && (
                    <div className="flex w-full justify-between py-2">
                        <p>{t('LABEL_INPUT_BIRTHDAY', 'Дата рождения')}</p>
                        <p>{format(new Date(user?.birthday), 'dd-MM-yyyy')}</p>
                    </div>
                )}
                {user?.gender && (
                    <div className="flex w-full justify-between py-2">
                        <p>{t('LABEL_INPUT_GENDER', 'Пол')}</p>
                        <p>
                            {user?.gender
                                ? i18n.language === 'ru'
                                    ? getGender(user.gender)
                                    : user.gender
                                : ''}
                        </p>
                    </div>
                )}
                <div className="flex w-full justify-between py-2">
                    <p>{t('LABEL_INPUT_ROLE', 'Роль')}</p>
                    <p>
                        {user?.role
                            ? i18n.language === 'ru'
                                ? getRole(user.role)
                                : user.role
                            : ''}
                    </p>
                </div>
            </div>
            <div className="flex w-full justify-end max-w-xl">
                <Link
                    href={'/profile/edit'}
                    className="flex justify-between py-2 text-primary cursor-pointer text-sm"
                >
                    <div className="flex gap-2">
                        <EditIcon />
                        {t('CAPTION_SUBMIT_BTN_EDIT', 'Редактировать')}
                    </div>
                </Link>
            </div>
        </>
    );
};
