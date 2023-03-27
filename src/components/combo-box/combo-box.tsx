import {
    ChangeEvent,
    Fragment,
    SetStateAction,
    useCallback,
    useDeferredValue,
    useEffect,
    useState,
} from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { TListBoxProps } from '../list-box/list-box';

export const ComboBox = ({
    id,
    label,
    items,
    handlerSetItem,
    activeIdx,
}: TListBoxProps) => {
    const [selected, setSelected] = useState(items[activeIdx]);

    const [query, setQuery] = useState('');
    const defferedValue = useDeferredValue(query);

    useEffect(() => {
        handlerSetItem(defferedValue);
    }, [defferedValue, handlerSetItem]);

    const handlerOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 text-base-content">
                <div className="text-left relative w-full block overflow-hidden rounded-md bg-transparent border border-gray-200 pt-1 pb-1 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary">
                    <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        {label}
                    </span>
                    <Combobox.Input
                        id={id}
                        className="w-full border-none text-sm leading-5 bg-base-100 focus:ring-0"
                        displayValue={(item: string) => item}
                        onChange={handlerOnChange}
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
                            items.map((item) => (
                                <Combobox.Option
                                    key={item}
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
