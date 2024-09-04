import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { usePostLogoutMutation } from '@/redux/api/auth';
import { removeUser } from '@/redux/slices/user';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MenuLink } from './components/menu-link';
import { menuLinksLogin, menuLinksLogout } from './constants';
import { TUserProps } from '@/types/t-user-props';
import { getImageUrl } from 'utils/getImageUrl';
import ProfileIcon from '@/icons/profile-icon.svg';

export const MenuDropdown = ({ user }: TUserProps) => {
    const dispatch = useAppDispatch();
    const [postLogout] = usePostLogoutMutation();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                className="flex items-center justify-center rounded-full h-8 w-8 bg-neutral text-sm text-neutral-content focus:outline-none focus:outline-none active:ring-2 active:ring-white active:ring-offset-2 active:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
            >
                <span className="sr-only">Open user menu</span>
                <>
                    {user?.avatars?.length ? (
                        <picture>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={getImageUrl(user.avatars[0])}
                                alt={user?.name}
                            />
                        </picture>
                    ) : (
                        <ProfileIcon />
                    )}
                </>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    as="ul"
                    tabIndex={0}
                    className="absolute z-50 right-0 mt-2 menu p-2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] bg-base-100 rounded-box w-52"
                >
                    {user
                        ? menuLinksLogin.map((link) => (
                            <MenuLink
                                key={link.id}
                                href={link.href}
                                text={link.text}
                                type={link.type}
                                onClick={
                                    link.type === 'logout'
                                        ? async () => {
                                            const logout = await postLogout(
                                                null
                                            ).unwrap();
                                            if (logout.success) {
                                                dispatch(removeUser());
                                            }
                                        }
                                        : undefined
                                }
                            />
                        ))
                        : menuLinksLogout.map((link) => (
                            <MenuLink
                                key={link.id}
                                href={link.href}
                                text={link.text}
                                type={link.type}
                            />
                        ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
