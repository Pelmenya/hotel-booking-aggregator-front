import {
    ChangeEvent,
    Fragment,
    useCallback,
    useDeferredValue,
    useEffect,
    useState,
} from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { TListBoxProps } from '../list-box/list-box';
import { TNullable } from '@/types/t-nullable';

export const ComboBox = ({
    id,
    label,
    items,
    handlerSetItem,
    handlerSearchItem,
    activeIdx,
}: TListBoxProps & { handlerSearchItem: (v: string) => void }) => {
    const [selected, setSelected] = useState<TNullable<string>>(null);

    const [query, setQuery] = useState('');
    const defferedValue = useDeferredValue(query);

    useEffect(() => {
        handlerSearchItem(defferedValue);
    }, [defferedValue, handlerSearchItem]);

    useEffect(() => {
        handlerSetItem(selected);
    }, [selected, handlerSetItem]);

    // инициализация
    useEffect(() => {
        if (activeIdx !== null)
            if (items[activeIdx]) {
                setSelected(items[activeIdx]);
            }
    }, [activeIdx, items]);

    const handlerOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 text-base-content">
                <div className="text-left relative w-full block overflow-hidden rounded-lg bg-transparent border border-gray-200 shadow-sm px-3 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        {label}
                    </span>
                    <Combobox.Input
                        id={id}
                        className="peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        displayValue={(item: string) => item}
                        onChange={handlerOnChange}
                        autoComplete="off"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-base-100 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {items.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4">
                                Ничего не найдено.
                            </div>
                        ) : (
                            items.map((item, idx) => (
                                <Combobox.Option
                                    key={item + idx}
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
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600
                                                        }`}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};
