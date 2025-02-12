import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { TNullable } from '@/types/t-nullable';

export type TListBoxProps = {
    id: string;
    label: string;
    items: string[];
    handlerSetItem: (value: any) => void;
    activeIdx: TNullable<number>;
    tooltips?: string[]; // Массив подсказок для каждого элемента
};

export const ListBox = ({
    label,
    items,
    handlerSetItem,
    activeIdx,
    tooltips,
}: TListBoxProps) => {
    const initialSelect =
        activeIdx !== null && activeIdx >= 0 && activeIdx < items.length
            ? items[activeIdx]
            : null;
    const [selected, setSelected] = useState(initialSelect);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (
            items &&
            activeIdx !== null &&
            activeIdx >= 0 &&
            activeIdx < items.length
        ) {
            setSelected(items[activeIdx]);
        } else {
            setSelected(null);
        }
    }, [items, activeIdx]);

    useEffect(() => {
        handlerSetItem(selected);
    }, [selected, handlerSetItem]);

    return (
        <div className="w-full h-full min-h-[46px] max-h-[46px]">
            <Listbox
                value={selected}
                onChange={(value) => {
                    setSelected(value);
                    setIsOpen(false); // Закрываем список после выбора
                }}
            >
                <div className="relative h-full">
                    <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        {selected && label}
                    </span>
                    <Listbox.Button
                        className="text-left h-full relative w-full block overflow-hidden rounded-md border border-gray-200 px-3 pt-5 pb-1 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {selected ? (
                            <span className="absolute left-3 top-5 text-sm">
                                {selected}
                            </span>
                        ) : (
                            <span className="absolute left-3 top-3 text-sm">
                                {label}
                            </span>
                        )}
                        <span
                            className={`pointer-events-none absolute inset-y-0 right-3 flex items-center transition-transform duration-200 transform ${
                                isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        >
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        show={isOpen} // Используем show для управления видимостью
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-base-100 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {items.map((item, itemIdx) => (
                                <Listbox.Option
                                    key={itemIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none mx-2 py-2 pl-10 rounded-md ${
                                            active && 'bg-base-300'
                                        }`
                                    }
                                    value={item}
                                    data-tip={tooltips ? tooltips[itemIdx] : ''}
                                >
                                    {({ selected }) => (
                                        <div className='tooltip tooltip-bottom w-full text-left' data-tip={tooltips ? tooltips[itemIdx] : null}>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {item}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-[-40px] flex items-center pl-3 text-amber-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};
