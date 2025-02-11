import React, { useState, useRef, useMemo, FocusEvent } from 'react';
import cn from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Control, FieldValues, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enUS, ru } from 'date-fns/locale';
import { format, isValid } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('en', enUS);
registerLocale('ru', ru);

export type TNameInput =
    | 'name'
    | 'password'
    | 'newPassword'
    | 'oldPassword'
    | 'confirmPassword'
    | 'email'
    | 'contactPhone'
    | 'role'
    | 'token'
    | 'title'
    | 'images'
    | 'description'
    | 'avatars'
    | 'coordinates'
    | 'code'
    | 'codeSms'
    | 'gender'
    | 'address'
    | 'company'
    | 'birthday'
    | 'area'
    | 'countRooms'
    | 'countBeds';

export interface IInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    id: string;
    name: TNameInput;
    error: boolean;
    control: Control<FieldValues, any> | undefined;
    type:
        | 'text'
        | 'password'
        | 'email'
        | 'tel'
        | 'textarea'
        | 'date'
        | 'digital';
    placeholder: string;
    hidden?: boolean;
    label: string;
    disabled?: boolean;
    defaultValue?: string;
    autoComplete?: string;
}

const errorMessages = {
    name: 'ERROR_INPUT_NAME',
    token: 'ERROR_INPUT_CODE',
    email: 'ERROR_INPUT_EMAIL',
    password: 'ERROR_INPUT_PASSWORD',
    oldPassword: 'ERROR_INPUT_PASSWORD',
    newPassword: 'ERROR_INPUT_PASSWORD',
    confirmPassword: 'ERROR_INPUT_CONFIRM_PASSWORD',
    contactPhone: 'ERROR_INPUT_TEL',
    role: 'ERROR_INPUT_ROLE',
    title: 'ERROR_INPUT_TITLE',
    description: 'ERROR_INPUT_DESCRIPTION',
    coordinates: 'ERROR_INPUT_COORDINATES',
    code: 'ERROR_INPUT_CONFIRM_EMAIL',
    codeSms: 'ERROR_INPUT_CONFIRM_PHONE',
    address: 'ERROR_INPUT_ADDRESS',
    gender: 'ERROR_INPUT_GENDER',
    default: 'ERROR_INPUT_REQUIRED_FIELD',
    birthday: 'ERROR_INPUT_BIRTHDAY',
    area: 'ERROR_INPUT_NUMBER',
};

export const Input = ({
    type,
    id,
    placeholder,
    hidden = false,
    label,
    name,
    control,
    error,
    autoComplete = 'off',
    disabled,
}: IInputProps) => {
    const { t, i18n } = useTranslation('form');

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const datePickerRef = useRef<DatePicker>(null);

    const commonClasses = useMemo(
        () =>
            'peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm',
        []
    );

    const labelClasses = useMemo(
        () =>
            cn(
                'relative block overflow-hidden rounded-lg border border-gray-200 px-3 pt-3 shadow-sm w-full transition duration-300 ease-in-out',
                error
                    ? 'focus-within:border-error focus-within:ring-1 focus-within:ring-error'
                    : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
            ),
        [error]
    );

    const handleFocus = () => {
        setIsDatePickerVisible(true);
        setTimeout(() => {
            datePickerRef.current?.setFocus?.();
        }, 0);
    };

    const handleBlur = (e: FocusEvent<HTMLLabelElement>) => {
        if (e.relatedTarget?.className.includes('react-datepicker')) {
            return;
        }
        setTimeout(() => {
            setIsDatePickerVisible(false);
        }, 0);
    };

    const renderInputField = (
        onChange: (value: any) => void,
        onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        value: any,
        ref: React.Ref<any>
    ) => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        ref={ref}
                        id={id}
                        placeholder={placeholder}
                        className={commonClasses.replace('h-8', 'h-32 pt-2')}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        autoComplete={autoComplete}
                    />
                );
            case 'date':
                return isDatePickerVisible ? (
                    <DatePicker
                        ref={datePickerRef}
                        id={id}
                        selected={
                            value && isValid(new Date(value))
                                ? new Date(value)
                                : null
                        }
                        onChange={(date) => onChange(date)}
                        onBlur={onBlur}
                        placeholderText={placeholder}
                        className={commonClasses + ' min-w-[222px]'}
                        autoComplete={autoComplete}
                        disabled={disabled}
                        dateFormat="ddMMyyyy"
                        locale={i18n.language === 'ru' ? 'ru' : 'en'}
                        portalId="root-portal"
                        showYearDropdown
                        showMonthDropdown
                        yearDropdownItemNumber={100}
                        scrollableYearDropdown
                    />
                ) : (
                    <input
                        ref={ref}
                        type="text"
                        id={id}
                        placeholder={placeholder}
                        className={commonClasses + ' react-datepicker'}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={
                            value && isValid(new Date(value))
                                ? format(new Date(value), 'dd-MM-yyyy')
                                : value || ''
                        }
                        disabled={disabled}
                        autoComplete={autoComplete}
                        inputMode="numeric"
                        maxLength={10} // Ограничение максимальной длины ввода
                    />
                );
            case 'digital':
                return (
                    <>
                        <input
                            ref={ref}
                            type="text"
                            id={id}
                            placeholder={placeholder}
                            className={cn(commonClasses, 'pr-8')} // Добавление правого отступа для размещения текста "м2"
                            onChange={(e) => {
                                let value = e.target.value;
                                value = value.replace(',', '.');
                                const numericValue = value.match(/^\d*\.?\d*$/)
                                    ? value
                                    : value.slice(0, -1);
                                onChange(numericValue);
                            }}
                            onBlur={onBlur}
                            value={value || ''}
                            autoComplete={autoComplete}
                            disabled={disabled}
                            inputMode="decimal"
                        />
                        {name === 'area' && (
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                                {i18n.language === 'ru' ? 'м' : 'm'}
                                <span
                                    style={{
                                        fontSize: '0.6em',
                                        position: 'relative',
                                        top: '-0.3em',
                                    }}
                                >
                                    2
                                </span>
                            </span>
                        )}
                    </>
                );

            default:
                return (
                    <input
                        ref={ref}
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        className={commonClasses}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        autoComplete={autoComplete}
                        disabled={disabled}
                    />
                );
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <div
                    className={cn('relative', hidden && 'hidden', 'container')}
                >
                    <label
                        htmlFor={id}
                        className={labelClasses}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {renderInputField(onChange, onBlur, value, ref)}
                        <span
                            className={cn(
                                'absolute left-3 top-3 -translate-y-1/2 text-xs transition-all duration-100 ease-in-out',
                                {
                                    'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs':
                                        !value,
                                    'top-3 text-xs': value,
                                }
                            )}
                        >
                            {label}
                        </span>
                    </label>
                    {error && (
                        <span className="absolute left-3 text-xs text-error">
                            {t(errorMessages[name] || errorMessages.default)}
                        </span>
                    )}
                </div>
            )}
        />
    );
};
