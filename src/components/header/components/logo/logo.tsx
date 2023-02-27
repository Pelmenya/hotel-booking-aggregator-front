'use client'
import Image from 'next/image';
import logo from '../../../../../public/logo.svg';

export const Logo = () => {
    return (
        <div className="flex flex-shrink-0 items-center cursor-pointer">
            <Image src={logo} width={32} alt="Логотип" />
            <p className="ml-1 text-blue-700 text-xl uppercase font-bold">
                Hotel`s
            </p>
        </div>
    );
};
