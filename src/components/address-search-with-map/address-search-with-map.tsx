import { useState, useMemo, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import {
    TPoint,
    useGetAddressSuggestionsQuery,
    useGetCoordinatesQuery,
} from '@/redux/api/address-api';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Map } from '../map/map';

export const AddressSearchWithMap = () => {
    const { t } = useTranslation('form');
    const [query, setQuery] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [coordinates, setCoordinates] = useState<TPoint| null>(null);

    const { data: suggestionsData } = useGetAddressSuggestionsQuery(query);
    const { data: coordinatesData } = useGetCoordinatesQuery(
        selectedAddress || '',
        {
            skip: !selectedAddress,
        }
    );

    const suggestions = suggestionsData?.suggestions || [];

    const debouncedSetQuery = useMemo(() => _.debounce(setQuery, 300), []);

    useEffect(() => {
        if (coordinatesData?.coordinates) {
            setCoordinates(coordinatesData.coordinates);

        }
    }, [coordinatesData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetQuery(event.target.value);
    };

    const handleSelect = (value: string) => {
        setQuery(value);
        setSelectedAddress(value);
    };

    const commonClasses =
        'peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm';
    const labelClasses = cn(
        'block relative overflow-hidden rounded-lg border border-gray-200 px-3 pt-3 shadow-sm w-full transition duration-300 ease-in-out',
        'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
    );

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative container">
                <Combobox value={query} onChange={handleSelect}>
                    <div className={labelClasses}>
                        <Combobox.Input
                            onChange={handleChange}
                            className={commonClasses}
                            placeholder={t('LABEL_INPUT_ADDRESS')}
                        />
                        <span
                            className={cn(
                                'absolute left-3 text-sm transition-all duration-100 ease-in-out pointer-events-none',
                                {
                                    'top-3 text-xs': query,
                                    'top-1/2 transform -translate-y-1/2 peer-focus:top-3 peer-focus:text-xs':
                                        query != '' || !query,
                                }
                            )}
                        >
                            {t('LABEL_INPUT_ADDRESS')}
                        </span>
                    </div>
                    {query && suggestions.length === 0 && (
                        <Combobox.Options className="absolute z-10 bg-base-100 border border-primary rounded-md shadow-lg max-h-60 mt-1 w-full overflow-auto">
                            <div className="p-2">
                                {t(
                                    'NOT_COMBOBOX_OPTIONS',
                                    'Нет подходящей подсказки'
                                )}
                            </div>
                        </Combobox.Options>
                    )}
                    {suggestions.length > 0 && (
                        <Combobox.Options className="absolute z-10 bg-base-100 border border-primary rounded-md shadow-lg max-h-60 mt-1 w-full overflow-auto">
                            {suggestions.map((suggestion) => (
                                <Combobox.Option
                                    key={suggestion.sign}
                                    value={suggestion.value}
                                    className="cursor-pointer select-none relative py-2 pl-3 pr-4 hover:bg-blue-100"
                                >
                                    {({ active }) => (
                                        <span
                                            className={`block ${
                                                active
                                                    ? 'font-medium'
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
            {coordinates && (
                <div className="mt-4">
                    <Map coordinates={[coordinates.latitude, coordinates.longitude]} />
                </div>
            )}
        </div>
    );
}
