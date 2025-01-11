import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { useCallback, useState } from 'react';
import { MobileHeader } from './components/mobil-header/mobil-header';
import { MobileNav } from './components/mobil-nav/mobile-nav';
import { DesktopHeader } from './components/desktop-header/desktop-header';
import { MenuDropdown } from './components/menu-dropdown/menu-dropdown';
import { LanguageToggle } from '../language-toggle/language-toggle';
import { NotificationsLink } from './notifications-link/notifications-link';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';

export const Header = () => {
    const { user } = useAppSelector(getUserState);
    const [isOpenMobilMenu, setIsOpenMobilMenu] = useState(false);

    const handlerIsOpenMobileMenu = useCallback(
        () => setIsOpenMobilMenu(!isOpenMobilMenu),
        [isOpenMobilMenu]
    );

    return (
        <header>
            <nav className="bg-primary-content rounded-b-3xl">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-12 sm:h-16 lg:h-20 items-center justify-between">
                        <DesktopHeader user={user} />
                        <MobileHeader
                            onClick={handlerIsOpenMobileMenu}
                            isOpen={isOpenMobilMenu}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
                            <ThemeToggle />
                            <NotificationsLink />
                            <LanguageToggle />
                            <div className="ml-3 flex justify-center items-center">
                                <MenuDropdown user={user} />
                            </div>
                        </div>
                    </div>
                </div>
                <MobileNav isOpen={isOpenMobilMenu} user={user} />
            </nav>
        </header>
    );
};
