import Link from 'next/link';
import { Logo } from '../logo/logo';

export const DesktopHeader = () => (
    <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
        <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
                <Link href="/">
                    <Logo />
                </Link>
                <button
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                >
                    Главная
                </button>

                <button className="text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Отели
                </button>
            </div>
        </div>
    </div>
);
