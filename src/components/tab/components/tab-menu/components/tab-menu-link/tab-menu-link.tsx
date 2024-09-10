import Link from 'next/link';
import cn from 'classnames';
import EditIcon from '@/icons/edit.svg';
import AddIcon from '@/icons/add.svg';
import DeleteIcon from '@/icons/delete.svg';
import ProfileIcon from '@/icons/profile-icon.svg';
import IdentificationIcon from '@/icons/identification.svg';
import SecureIcon from '@/icons/shield-check.svg';
import LogoutIcon from '@/icons/logout-icon.svg';

export type TMenuTabLinkProps = {
    href?: string;
    active: boolean;
    text: string;
    disabled?: boolean;
    handlerOnClick?: () => void;
    icon:
        | 'edit'
        | 'add'
        | 'delete'
        | 'profile'
        | 'identification'
        | 'secure'
        | 'logout';
};

export const TabMenuLink = ({
    href,
    active,
    text,
    icon,
    disabled = false,
    handlerOnClick,
}: TMenuTabLinkProps) => (
    <>
        {!disabled && href ? (
            <Link
                href={href}
                className={cn('btn join-item justify-start', {
                    ['btn-active']: active,
                })}
            >
                {icon === 'edit' && <EditIcon />}
                {icon === 'add' && <AddIcon />}
                {icon === 'delete' && <DeleteIcon />}
                {icon === 'profile' && <ProfileIcon />}
                {icon === 'secure' && <SecureIcon />}
                {icon === 'identification' && <IdentificationIcon />}
                {icon === 'logout' && <LogoutIcon />}
                {text}
            </Link>
        ) : (
            <button
                onClick={handlerOnClick}
                disabled={disabled}
                className={cn('btn join-item justify-start', {
                    ['btn-active']: active,
                })}
            >
                {icon === 'edit' && <EditIcon />}
                {icon === 'add' && <AddIcon />}
                {icon === 'delete' && <DeleteIcon />}
                {icon === 'profile' && <ProfileIcon />}
                {icon === 'secure' && <SecureIcon />}
                {icon === 'identification' && <IdentificationIcon />}
                {icon === 'logout' && <LogoutIcon />}
                {text}
            </button>
        )}
    </>
);
