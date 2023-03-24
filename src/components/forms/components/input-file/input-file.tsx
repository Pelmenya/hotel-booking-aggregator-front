import { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';
import { IInputProps } from '../input/input';

export const InputFile = ({
    id,
    placeholder,
    handlerOnChange,
    multiple,
    accept,
    name,
    control,
}: Partial<IInputProps & { handlerOnChange: (e: ChangeEvent<HTMLInputElement>) => void }>) => (
    <Controller
        name={name || 'images'}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
                ref={ref}
                type="file"
                className="file-input file-input-primary w-full placeholder-transparent focus:outline-none focus:ring-0 sm:text-sm cursor-pointer"
                id={id}
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                onChange={(e) => { 
                    onChange();
                    handlerOnChange && handlerOnChange(e);
                }}
                multiple={multiple}
                accept={accept}
            />
        )}
    />
);
