import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export type TModalProps = {
    title?: string;
    isOpen: boolean;
    handlerClose: () => void;
    children?: JSX.Element;
};

export const Modal = ({
    title,
    isOpen,
    handlerClose,
    children,
}: TModalProps) => {

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handlerClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-8 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="transform overflow-hidden rounded-3xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all max-w-full max-h-full">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-3xl font-bold leading-6"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">{children}</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
