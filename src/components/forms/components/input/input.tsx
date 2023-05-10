import cn from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Control, FieldValues, Controller } from 'react-hook-form';
import { ERRORS_FORM } from '../../constants/errors-form';

export interface IInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    id: string;
    name:
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
        | 'avatars';
    error: boolean;
    control: Control<FieldValues, any> | undefined;
    type: 'text' | 'password' | 'email' | 'tel' | 'textarea';
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
    disabled,
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
                            'relative block overflow-hidden rounded-lg border border-gray-200 px-3 pt-3 shadow-sm',
                            error
                                ? 'focus-within:border-error focus-within:ring-1 focus-within:ring-error'
                                : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                        )}
                    >
                        {type === 'textarea' ? (
                            <textarea
                                ref={ref}
                                id={id}
                                placeholder={placeholder}
                                className="peer h-7 pt-2 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value ? value : ''}
                                autoComplete={autoComplete}
                            />
                        ) : (
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
                                disabled={disabled}
                            />
                        )}
                        <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            {label}
                        </span>
                    </label>
                    {error && (
                        <span className="absolute left-3 text-xs text-error">
                            {value
                                ? name === 'name'
                                    ? ERRORS_FORM.ERROR_NAME
                                    : name === 'token'
                                        ? ERRORS_FORM.ERROR_CODE
                                        : name === 'email'
                                            ? ERRORS_FORM.ERROR_EMAIL
                                            : name === 'password'
                                                ? ERRORS_FORM.ERROR_PASSWORD
                                                : name === 'oldPassword'
                                                    ? ERRORS_FORM.ERROR_PASSWORD
                                                    : name === 'newPassword'
                                                        ? ERRORS_FORM.ERROR_PASSWORD
                                                        : name === 'confirmPassword'
                                                            ? ERRORS_FORM.ERROR_CONFIRM_PASSWORD
                                                            : name === 'contactPhone'
                                                                ? ERRORS_FORM.ERROR_TEL
                                                                : name === 'role'
                                                                    ? ERRORS_FORM.ERROR_ROLE
                                                                    : name === 'title'
                                                                        ? ERRORS_FORM.ERROR_TITLE
                                                                        : name === 'description'
                                                                            ? ERRORS_FORM.ERROR_DESCRIPTION
                                                                            : ''
                                : ERRORS_FORM.ERROR_REQUIRED_FIELD}
                        </span>
                    )}
                </div>
            )}
        />
    );
};
