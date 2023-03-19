'use client';

import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { usePostLogoutMutation } from '@/redux/api/auth';
import { getUserState } from '@/redux/selectors/user';
import { removeUser } from '@/redux/slices/user';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { MenuLogoutIcon } from './components/components/menu-logout-icon';
import { MenuProfileIcon } from './components/components/menu-profile-icon';
import { MenuLink } from './components/menu-link';
import { menuLinksLogin, menuLinksLogout } from './constants';

export const MenuDropdown = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(getUserState);
    const [postLogout] = usePostLogoutMutation();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
            >
                <span className="sr-only">Open user menu</span>
                <picture>
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Tommy"
                    />
                </picture>
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
                    className="absolute right-0 mt-2 origin-top-right dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
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
                                            if (logout.success)
                                                dispatch(removeUser());
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
