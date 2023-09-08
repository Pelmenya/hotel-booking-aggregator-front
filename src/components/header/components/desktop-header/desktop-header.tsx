import { TUserProps } from '@/types/t-user-props';
import Link from 'next/link';
import { Logo } from '../../../logo/logo';
import cn from 'classnames';
import { useRouter } from 'next/router';

export const DesktopHeader = ({ user }: TUserProps) => {
    const router = useRouter();
    const paths = router.asPath.split('/');
    const isMainPage = paths.every((item) => item === '');
    const isAdminPage = paths.includes('admin');

    return (
        <div className="hidden sm:block">
            <div className="flex space-x-4">
                <Link href="/">
                    <Logo />
                </Link>
                <Link
                    href="/"
                    className={cn('btn btn-sm', {
                        ['btn-primary']: isMainPage,
                    })}
                    aria-current="page"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                        />
                    </svg>
                    Главная
                </Link>
                {user?.role === 'admin' && (
                    <Link
                        href="/admin/hotels"
                        className={cn('btn btn-sm', {
                            ['btn-primary']: isAdminPage,
                        })}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                            />
                        </svg>
                        Админ
                    </Link>
                )}
            </div>
        </div>
    );
};
