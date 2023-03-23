import { TUserProps } from '@/types/t-user-props';
import Link from 'next/link';
import { Logo } from '../logo/logo';

export const DesktopHeader = ({ user }: TUserProps) => (
    <div className="hidden sm:block">
        <div className="flex space-x-4">
            <Link href="/">
                <Logo />
            </Link>
            <button
                className="bg-neutral px-3 py-2 rounded-md text-sm font-medium text-neutral-content"
                aria-current="page"
            >
                Главная
            </button>
            {user?.role === 'admin' && (
                <Link
                    href="/admin/hotels"
                    className="text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                    Отели
                </Link>
            )}
        </div>
    </div>
);
