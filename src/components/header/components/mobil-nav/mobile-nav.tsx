import { TMobileHeaderProps } from '../mobil-header/mobil-header';
import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export const MobileNav = ({ isOpen, user }: TMobileHeaderProps) => {
    const { t } = useTranslation('common');

    const router = useRouter();
    const paths = router.asPath.split('/');
    const isMainPage = paths.every((item) => item === '');
    const isAdminPage = paths.includes('admin');

    return (
        <div
            className={cn({ ['hidden']: !isOpen }, 'sm:hidden')}
            id="mobile-menu"
        >
            <div className="space-y-1 px-2 pt-2 pb-3">
                <Link
                    href="/"
                    className={cn(
                        'text-base hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium',
                        {
                            ['bg-info-content text-neutral-content']: isMainPage,
                        }
                    )}
                    aria-current="page"
                >
                    {t('main')}
                </Link>
                {user?.role === 'admin' && (
                    <Link
                        href="/admin/hotels"
                        className={cn(
                            'text-base hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium',
                            {
                                ['bg-info-content text-neutral-content']: isAdminPage,
                            }
                        )}
                    >
                        {t('admin')}
                    </Link>
                )}
            </div>
        </div>
    );
};
