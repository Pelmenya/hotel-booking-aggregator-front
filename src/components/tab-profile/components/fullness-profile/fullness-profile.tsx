import { CSSProperties, useMemo } from 'react';
import { getFullnessProfile } from 'utils/getFullnessProfile';
import CrownIcon from '@/icons/crown.svg';
import { TUser } from '@/types/t-user';
import { TNullable } from '@/types/t-nullable';
import { useTranslation } from 'react-i18next';

export type TFullnesProfileProps = {
    user: TNullable<TUser>;
};

export const FullnessProfile = ({ user }: TFullnesProfileProps) => {
    const { t } = useTranslation('common')
    const progressProfile = useMemo(() => getFullnessProfile(user), [user]);

    return (
        <div className="flex flex-col items-center justify-around">
            <p className='text-md text-center'>{t('TITLE_FULLNESS_PROFILE','Заполненность профиля')}</p>
            <div
                className="radial-progress flex flex-col items-center justify-center bg-success text-neutral-content border-success border-4"
                style={
                    {
                        '--value': `${progressProfile}`,
                        '--size': '4rem',
                        '--thickness': '3px',
                    } as CSSProperties
                }
                role="progressbar"
            >
                <CrownIcon />
                <span className="text-sm">{progressProfile}%</span>
            </div>
        </div>
    );
};
