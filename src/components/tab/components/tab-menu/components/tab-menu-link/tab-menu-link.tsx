import Link from 'next/link';
import cn from 'classnames';
import EditIcon from '@/icons/edit.svg';
import AddIcon from '@/icons/add.svg';
import DeleteIcon from '@/icons/delete.svg';

export type TMenuTabLinkProps = {
    href: string;
    active: boolean;
    text: string;
    disabled?: boolean;
    icon: 'edit' | 'add' | 'delete';
};

export const TabMenuLink = ({
    href,
    active,
    text,
    icon,
    disabled = false,
}: TMenuTabLinkProps) => (
    <>
        {!disabled ? (
            <Link
                href={href}
                className={cn('btn join-item justify-start', {
                    ['btn-active']: active,
                })}
            >
                {icon === 'edit' && <EditIcon />}
                {icon === 'add' && <AddIcon />}
                {icon === 'delete' && <DeleteIcon />}
                {text}
            </Link>
        ) : (
            <button
                disabled={disabled}
                className={cn('btn join-item justify-start', {
                    ['btn-active']: active,
                })}
            >
                {icon === 'edit' && <EditIcon />}
                {icon === 'add' && <AddIcon />}
                {icon === 'delete' && <DeleteIcon />}
                {text}
            </button>
        )}
    </>
);
