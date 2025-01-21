import { useTranslation } from 'react-i18next';
import { TUserProps } from '@/types/t-user-props';
import Link from 'next/link';
import { Logo } from '../../../logo/logo';
import cn from 'classnames';
import { useRouter } from 'next/router';
import MainIcon from '@/icons/main.svg';
import AdminIcon from '@/icons/admin.svg';
import { TTranslationFiles } from '@/types/t-translation-files';

export const DesktopHeader = ({ user }: TUserProps) => {
    const { t } = useTranslation<TTranslationFiles>('common');

    const router = useRouter();
    const paths = router.asPath.split('/');
    const isMainPage = paths.every((item) => item === '');
    const isAdminPage = paths.includes('admin');

    return (
        <div className="hidden sm:block">
            <div className="flex items-center space-x-4">
                <Logo />
                <Link
                    href="/"
                    className={cn('btn btn-sm', {
                        ['btn-primary']: isMainPage,
                    })}
                    aria-current="page"
                >
                    <MainIcon />
                    <p className="hidden md:block">{t('main')}</p>
                </Link>
                {user?.role === 'admin' && (
                    <Link
                        href="/admin/hotels"
                        className={cn('btn btn-sm', {
                            ['btn-primary']: isAdminPage,
                        })}
                    >
                        <AdminIcon />
                        <p className="hidden md:block">{t('admin')}</p>
                    </Link>
                )}
                {user?.role === 'admin' && user?.emailIsConfirm && user?.phoneIsConfirm && (
                    <Link
                        href="/admin/hotels"
                        className={cn('btn btn-sm', {
                            ['btn-primary']: isAdminPage,
                        })}
                    >
                        <AdminIcon />
                        <p className="hidden md:block">{t('HEADER_RENT_BTN', 'Rent')}</p>
                    </Link>
                )}

            </div>
        </div>
    );
};
