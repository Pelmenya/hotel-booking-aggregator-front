import Link from 'next/link';
import cn from 'classnames';
import EditIcon from '@/icons/edit.svg';
import AddIcon from '@/icons/add.svg';
import DeleteIcon from '@/icons/delete.svg';
import IdentificationIcon from '@/icons/identification.svg';
import SecureIcon from '@/icons/shield-check.svg';
import LogoutIcon from '@/icons/logout-icon.svg';
import AccountIcon from '@/icons/account.svg'

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
        | 'account'
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
                className={cn('btn join-item flex justify-start tooltip tooltip-bottom sm:tooltip-right', {
                    ['btn-active']: active,
                })}
                data-tip={text}
            >
                {icon === 'edit' && <EditIcon />}
                {icon === 'add' && <AddIcon />}
                {icon === 'delete' && <DeleteIcon />}
                {icon === 'account' && <AccountIcon />}
                {icon === 'secure' && <SecureIcon />}
                {icon === 'identification' && <IdentificationIcon />}
                {icon === 'logout' && <LogoutIcon />}
                <span className='hidden md:block'>{text}</span>
            </Link>
        ) : (
            <button
                onClick={handlerOnClick}
                disabled={disabled}
                className={cn('btn join-item flex justify-start tooltip tooltip-right', {
                    ['btn-active']: active,
                })}
                data-tip={text}
            >
                {icon === 'edit' && <EditIcon />}
                {icon === 'add' && <AddIcon />}
                {icon === 'delete' && <DeleteIcon />}
                {icon === 'account' && <AccountIcon />}
                {icon === 'secure' && <SecureIcon />}
                {icon === 'identification' && <IdentificationIcon />}
                {icon === 'logout' && <LogoutIcon />}
                <span className='hidden md:block'>{text}</span>
            </button>
        )}
    </>
);
