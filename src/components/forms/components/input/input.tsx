import cn from 'classnames';
import { Control, FieldValues, Controller } from 'react-hook-form';
import { ERRORS_FORM } from '../../constants/errors-form';
import style from './input.module.css';

export interface IInputProps {
    id: string;
    name: 'name' | 'password' | 'email' | 'contactPhone' | 'role' | 'token';
    error: boolean;
    control: Control<FieldValues, any> | undefined;
    type: 'text' | 'password' | 'email' | 'tel';
    placeholder: string;
    hidden?: boolean;
    label: string;
    disabled?: boolean;
    defaultValue?: string;
    autoComplete?: string;
}

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
}: IInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={cn('relative', hidden && 'hidden')}>
                    <label
                        htmlFor={id}
                        className={cn(
                            'relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm',
                            error
                                ? 'focus-within:border-error focus-within:ring-1 focus-within:ring-error'
                                : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                        )}
                    >
                        <input
                            ref={ref}
                            type={type}
                            id={id}
                            placeholder={placeholder}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value ? value : ''}
                            autoComplete={autoComplete}
                        />
                        <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            {label}
                        </span>
                    </label>
                    {error && (
                        <span
                            className={cn(
                                'absolute left-3 text-xs text-error',
                                style.error
                            )}
                        >
                            {value
                                ? name === 'name'
                                    ? ERRORS_FORM.ERROR_NAME
                                    : name === 'token'
                                        ? ERRORS_FORM.ERROR_CODE
                                        : name === 'email'
                                            ? ERRORS_FORM.ERROR_EMAIL
                                            : name === 'password'
                                                ? ERRORS_FORM.ERROR_PASSWORD
                                                : name === 'contactPhone'
                                                    ? ERRORS_FORM.ERROR_TEL
                                                    : name === 'role'
                                                        ? ERRORS_FORM.ERROR_ROLE
                                                        : ''
                                : ERRORS_FORM.ERROR_REQUIRED_FIELD}
                        </span>
                    )}
                </div>
            )}
        />
    );
};
