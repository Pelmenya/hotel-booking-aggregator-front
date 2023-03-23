import { TMobileHeaderProps } from '../mobil-header/mobil-header';
import cn from 'classnames';
import Link from 'next/link';

export const MobileNav = ({ isOpen, user }: TMobileHeaderProps) => (
    <div className={cn({ ['hidden']: !isOpen }, 'sm:hidden')} id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
            <a
                href="#"
                className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
            >
                Главная
            </a>
            {user?.role === 'admin' && (
                <Link
                    href='/admin/hotels'
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Отели
                </Link>
            )}
        </div>
    </div>
);
