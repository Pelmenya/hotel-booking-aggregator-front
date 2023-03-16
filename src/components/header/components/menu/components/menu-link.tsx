import Link from 'next/link';
import { TBaseProps } from '@/types/t-base-props';
import { MenuProfileIcon } from './components/menu-profile-icon';
import { MenuLogoutIcon } from './components/menu-logout-icon';
import { MenuLoginIcon } from './components/menu-login-icon';

export type TMenuLinkProps = TBaseProps & {
    id?: string;
    href: string;
    text: string;
    icon?: 'profile' | 'logout' | 'login';
    onClick?: () => void;
};

export const MenuLink = ({
    children,
    href,
    text,
    icon,
    onClick,
}: TMenuLinkProps) => (
    <li onClick={onClick}>
        <Link href={href}>
            {icon === 'login' && <MenuLoginIcon />}
            {icon === 'profile' && <MenuProfileIcon />}
            {icon === 'logout' && <MenuLogoutIcon />}
            {children}
            {text}
        </Link>
    </li>
);
