import { Base } from '@/components/base/base';
import { CSSProperties, useMemo } from 'react';
import { getFullnessProfile } from 'utils/getFullnessProfile';
import CrownIcon from '@/icons/crown.svg';
import { TUser } from '@/types/t-user';
import { TNullable } from '@/types/t-nullable';

export type TFullnesProfileProps = {
    user: TNullable<TUser>;
};

export const FullnessProfile = ({ user }: TFullnesProfileProps) => {
    const progressProfile = useMemo(() => getFullnessProfile(user), [user]);

    return (
        <Base>
            <div className='flex flex-col items-center justify-center gap-2'>
                <p>{'Fullness of the profile'}</p>
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
        </Base>
    );
};
