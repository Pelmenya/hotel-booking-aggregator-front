import { useTranslation } from 'react-i18next';
import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

export const LanguageToggle = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                className="flex items-center justify-center rounded-full h-8 w-8 bg-neutral text-sm text-neutral-content hover:text-white focus:outline-none active:ring-2 active:ring-white active:ring-offset-2 active:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
            >
                <span className="sr-only">Open languages menu</span>
                <span className='font-medium'>{language.toUpperCase()}</span>
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
                    className="absolute z-50 right-0 mt-2 menu p-2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] bg-base-100 rounded-box"
                >
                    <Menu.Item as="li">
                        {({ active }) => (
                            <button
                                className={`${
                                    active ? 'bg-gray-100' : ''
                                } flex items-center justify-between w-full text-left px-2 py-2 text-sm`}
                                onClick={() => changeLanguage('en')}
                            >
                                EN
                                {language === 'en' && (
                                    <CheckIcon
                                        className="h-3 w-3"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item as="li">
                        {({ active }) => (
                            <button
                                className={`${
                                    active ? 'bg-gray-100' : ''
                                } flex items-center justify-between w-full text-left px-2 py-2 text-sm`}
                                onClick={() => changeLanguage('ru')}
                            >
                                RU
                                {language === 'ru' && (
                                    <CheckIcon
                                        className="h-3 w-3"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
