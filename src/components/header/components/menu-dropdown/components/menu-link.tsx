import Link from 'next/link';
import { TBaseProps } from '@/types/t-base-props';
import MenuProfileIcon from '@/icons/profile-icon.svg';
import MenuLogoutIcon from '@/icons/logout-icon.svg';
import MenuLoginIcon from '@/icons/login-icon.svg';

export type TMenuLinkProps = TBaseProps & {
    id?: string;
    href: string;
    text: string;
    type?: 'profile' | 'logout' | 'login';
    onClick?: () => void;
};

export const MenuLink = ({
    children,
    href,
    text,
    type,
    onClick,
}: TMenuLinkProps) => (
    <li onClick={onClick}>
        <Link href={href}>
            <div className='flex p-1'>
                {type === 'login' && <MenuLoginIcon />}
                {type === 'profile' && <MenuProfileIcon />}
                {type === 'logout' && <MenuLogoutIcon />}
                {children}
                <span className='block ml-2'>{text}</span>
            </div>
        </Link>
    </li>
);
