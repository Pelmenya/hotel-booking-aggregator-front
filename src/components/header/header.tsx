import cn from 'classnames';
import { MenuDropdown } from './components/menu/menu';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { Logo } from './components/logo/logo';
import { useCallback, useState } from 'react';
import Link from 'next/link';

export const Header = () => {
    const [isOpenMobilMenu, setIsOpenMobilMenu] = useState(false);

    const handlerIsOpenMobileMenu = useCallback(
        () => setIsOpenMobilMenu(!isOpenMobilMenu),
        [isOpenMobilMenu]
    );

    return (
        <header>
            <nav className="bg-base-200">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={handlerIsOpenMobileMenu}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={cn(
                                        isOpenMobilMenu && 'hidden',
                                        'block h-6 w-6'
                                    )}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    className={cn(
                                        !isOpenMobilMenu && 'hidden',
                                        'block h-6 w-6'
                                    )}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <Logo />
                        </div>
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
                                        ??????????????
                                    </button>

                                    <button className="text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        ??????????
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
                            <ThemeToggle />
                            <button
                                type="button"
                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">
                                    View notifications
                                </span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>
                            <div className="ml-3 flex justify-center items-center">
                                <MenuDropdown />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={cn(!isOpenMobilMenu && 'hidden', 'sm:hidden')}
                    id="mobile-menu"
                >
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a
                            href="#"
                            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                            aria-current="page"
                        >
                            ??????????????
                        </a>

                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            ??????????
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};
