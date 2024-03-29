import { TUserProps } from '@/types/t-user-props';
import Link from 'next/link';
import { Logo } from '../../../logo/logo';
import cn from 'classnames';
import { useRouter } from 'next/router';
import MainIcon from '@/icons/main.svg';
import AdminIcon from '@/icons/admin.svg';

export const DesktopHeader = ({ user }: TUserProps) => {
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
                    Главная
                </Link>
                {user?.role === 'admin' && (
                    <Link
                        href="/admin/hotels"
                        className={cn('btn btn-sm', {
                            ['btn-primary']: isAdminPage,
                        })}
                    >
                        <AdminIcon />
                        Админ
                    </Link>
                )}
            </div>
        </div>
    );
};
