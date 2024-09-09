import cn from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Control, FieldValues, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
        | 'avatars'
        | 'coordinates'
        | 'code'
        | 'codeSms';
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
    default: 'ERROR_INPUT_REQUIRED_FIELD',
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
    const { t } = useTranslation('form');
    const commonClasses = 'peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm';
    const labelClasses = cn(
        'relative block overflow-hidden rounded-lg border border-gray-200 px-3 pt-3 shadow-sm',
        error
            ? 'focus-within:border-error focus-within:ring-1 focus-within:ring-error'
            : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={cn('relative', hidden && 'hidden')}>
                    <label htmlFor={id} className={labelClasses}>
                        {type === 'textarea' ? (
                            <textarea
                                ref={ref}
                                id={id}
                                placeholder={placeholder}
                                className={commonClasses.replace('h-8', 'h-7 pt-2')}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value || ''}
                                autoComplete={autoComplete}
                            />
                        ) : (
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
                        )}
                        <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            {t(label)}
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
