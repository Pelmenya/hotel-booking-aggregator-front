import { TMobileHeaderProps } from '../mobil-header/mobil-header';
import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const MobileNav = ({ isOpen, user }: TMobileHeaderProps) => {
    const { t } = useTranslation('common');

    return (
        <div
            className={cn({ ['hidden']: !isOpen }, 'sm:hidden')}
            id="mobile-menu"
        >
            <div className="space-y-1 px-2 pt-2 pb-3">
                <Link
                    href="/"
                    className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium"
                    aria-current="page"
                >
                    {t('main')}
                </Link>
                {user?.role === 'admin' && (
                    <Link
                        href="/admin/hotels"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        {t('hotels')}
                    </Link>
                )}
            </div>
        </div>
    );
};
