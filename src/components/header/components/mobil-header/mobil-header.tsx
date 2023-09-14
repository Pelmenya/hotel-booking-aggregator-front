
import { TUserProps } from '@/types/t-user-props';
import cn from 'classnames';
import Link from 'next/link';
import { Logo } from '../../../logo/logo';

export type TMobileHeaderProps = TUserProps & {
    isOpen: boolean;
    onClick?: () => void;
}
 
export const MobileHeader = ({ isOpen, onClick }: TMobileHeaderProps) => (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
            type="button"
            className="mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={onClick}
        >
            <span className="sr-only">Open main menu</span>
            <svg
                className={cn({['hidden']: isOpen}, 'block h-6 w-6')}
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
                className={cn({['hidden']: !isOpen}, 'block h-6 w-6')}
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
);
