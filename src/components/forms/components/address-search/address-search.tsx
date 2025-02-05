import { useState, useMemo, ChangeEvent } from 'react';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import { useGetAddressSuggestionsQuery } from '@/redux/api/address-api';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

export default function AddressSearch() {
    const { t } = useTranslation('form')
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const { data } = useGetAddressSuggestionsQuery(query);

    const suggestions = data?.suggestions || [];

    const debouncedSetQuery = useMemo(() => _.debounce(setQuery, 300), []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSetQuery(event.target.value);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const commonClasses =
        'peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm';
    const labelClasses = cn(
        'block relative overflow-hidden rounded-lg border border-gray-200 px-3 pt-3 shadow-sm w-full transition duration-300 ease-in-out',
        'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
    );

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative container">
                <Combobox value={query} onChange={setQuery}>
                    <div className={labelClasses}>
                        <Combobox.Input
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            className={commonClasses}
                        />
                        <span
                            className={cn(
                                'absolute left-3 text-sm transition-all duration-100 ease-in-out pointer-events-none',
                                {
                                    'top-3 text-xs': query,
                                    'top-1/2 transform -translate-y-1/2 peer-focus:top-3 peer-focus:text-xs':
                                        query != '' || !query || !isFocused,
                                }
                            )}
                        >
                            {t('LABEL_INPUT_ADDRESS')}
                        </span>
                    </div>
                    {query && suggestions.length === 0 && (
                        <Combobox.Options className="absolute z-10 bg-base-100 border border-primary rounded-md shadow-lg max-h-60 mt-1 w-full overflow-auto">
                            <div className="p-2">{t('NOT_COMBOBOX_OPTIONS', 'Нет подходящей подсказки')}</div>
                        </Combobox.Options>
                    )}
                    {suggestions.length > 0 && (
                        <Combobox.Options className="absolute z-10 bg-base-100 border border-primary rounded-md shadow-lg max-h-60 mt-1 w-full overflow-auto">
                            {suggestions.map((suggestion) => (
                                <Combobox.Option
                                    key={suggestion.sign}
                                    value={suggestion.value}
                                    className="cursor-pointer select-none relative hover:bg-blue-100"
                                >
                                    {({ active }) => (
                                        <span
                                            className={`block py-2 pl-3 pr-4 ${
                                                active
                                                    ? 'font-bold bg-blue-100'
                                                    : 'font-normal'
                                            } whitespace-normal break-words`}
                                        >
                                            {suggestion.value}
                                        </span>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </Combobox>
            </div>
        </div>
    );
}
