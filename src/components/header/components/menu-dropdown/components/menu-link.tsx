import Link from 'next/link';
import { TBaseProps } from '@/types/t-base-props';
import MenuProfileIcon from '@/icons/profile-icon.svg';
import MenuLogoutIcon from '@/icons/logout-icon.svg';
import MenuLoginIcon from '@/icons/login-icon.svg';
import { useTranslation } from 'react-i18next';

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
}: TMenuLinkProps) => {
    const  { t } = useTranslation('common');

    return (
        <li
            onClick={onClick}
            role="listitem"
            className="rounded-md"
        >
            <Link href={href} role="link" className="rounded-md">
                <div className="flex h-full w-full" role="cell">
                    {type === 'login' && <MenuLoginIcon />}
                    {type === 'profile' && <MenuProfileIcon />}
                    {type === 'logout' && <MenuLogoutIcon />}
                    {children}
                    <span className="block ml-2" role="textbox">
                        {t(text)}
                    </span>
                </div>
            </Link>
        </li>
    );
};
