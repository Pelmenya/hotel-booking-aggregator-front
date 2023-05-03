import { ChangeEvent, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { IInputProps } from '../input/input';
import cn from 'classnames';

export const InputFile = ({
    id,
    placeholder,
    handlerOnChange,
    multiple,
    accept,
    name,
    control,
    reset,
    className,
}: Partial<
    IInputProps & {
        reset?: boolean;
        handlerOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    }
>) => {
    const [display, setDisplay] = useState('Файл не выбран');

    useEffect(() => {
        if (reset) {
            setDisplay('Файл не выбран');
        }
    }, [reset]);

    return (
        <Controller
            name={name || 'images'}
            control={control}
            render={({ field: { onBlur, value, ref } }) => (
                <div className={cn('relative', className)}>
                    <span className="bg-base-100 lg:max-w-[250px] sm:max-w-[48px] max-w-[48px] truncate absolute left-44 top-[50%] translate-y-[-50%]">
                        {display}
                    </span>
                    <input
                        ref={ref}
                        type="file"
                        className="file-input file-input-primary text-transparent w-full placeholder-transparent focus:outline-none focus:ring-0 sm:text-sm cursor-pointer"
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        title=""
                        onBlur={onBlur}
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                if (files.length === 1) {
                                    setDisplay(files[0].name);
                                } else if (files.length > 1) {
                                    setDisplay(`Число файлов: ${files.length}`);
                                } else {
                                    setDisplay('Файл не выбран');
                                }
                            } else {
                                setDisplay('Файл не выбран');
                            }
                            handlerOnChange && handlerOnChange(e);
                        }}
                        multiple={multiple}
                        accept={accept}
                    />
                </div>
            )}
        />
    );
};
