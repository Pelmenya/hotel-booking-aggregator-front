import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { TNullable } from '@/types/t-nullable';

export type TListBoxProps = {
    id: string;
    label: string;
    items: string[];
    handlerSetItem: (value: any) => void;
    activeIdx: TNullable<number>;
};

export const ListBox = ({
    label,
    items,
    handlerSetItem,
    activeIdx,
}: TListBoxProps) => {
    // Инициализация selected с учетом activeIdx
    const initialSelect = activeIdx !== null && activeIdx >= 0 && activeIdx < items.length ? items[activeIdx] : null;
    const [selected, setSelected] = useState(initialSelect);

    // Обновление selected при изменении items или activeIdx
    useEffect(() => {
        if (items && activeIdx !== null && activeIdx >= 0 && activeIdx < items.length) {
            setSelected(items[activeIdx]);
        } else {
            setSelected(null);
        }
    }, [items, activeIdx]);

    // Вызов handlerSetItem при изменении selected
    useEffect(() => {
        handlerSetItem(selected);
    }, [selected, handlerSetItem]);

    return (
        <div className="w-full">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        {label}
                    </span>
                    <Listbox.Button className="text-left relative w-full block overflow-hidden rounded-md border border-gray-200 px-3 pt-5 pb-1 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary min-h-[46px]">
                        <span className="block truncate">{selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
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
                                >
                                    {({ selected }) => (
                                        <>
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
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
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
