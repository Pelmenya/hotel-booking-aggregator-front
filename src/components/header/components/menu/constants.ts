import { TMenuLinkProps } from './components/menu-link';

export const menuLinksLogout: TMenuLinkProps[] = [
    {
        id: '1',
        href: '/login',
        text: 'Войти',
        icon: 'login',
    },
]

export const menuLinksLogin: TMenuLinkProps[] = [
    {
        id: '2',
        href: '/profile',
        text: 'Профиль',
        icon: 'profile',
    },
    {
        id: '3',
        href: '/',
        text: 'Выйти',
        icon: 'logout'
    },
]