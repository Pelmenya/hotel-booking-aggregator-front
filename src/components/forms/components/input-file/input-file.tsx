import { ChangeEvent, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { IInputProps } from '../input/input';
import cn from 'classnames';

const maxFilesValue = Number(process.env.NEXT_PUBLIC_MAX_FILES) || 4;
const maxFilesSizeValue = Number(process.env.NEXT_PUBLIC_MAX_FILES_SIZE) || 1048576;

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
    maxFiles = maxFilesValue , // максимальное количество файлов
    maxFileSize = maxFilesSizeValue, // максимальный размер всех файлов в байтах (по умолчанию 1 МБ) за один раз
}: Partial<
    IInputProps & {
        reset?: boolean;
        handlerOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
        maxFiles?: number;
        maxFileSize?: number;
    }
>) => {
    const fileNotSelected = 'Файл не выбран'
    const [display, setDisplay] = useState(fileNotSelected);
    const [error, setError] = useState('')

    useEffect(() => {
        if (reset) {
            setDisplay(fileNotSelected);
        }
    }, [reset]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            if (files.length > maxFiles) {
                alert(`Можно загрузить не более ${maxFiles} файла(ов).`);
                e.target.value = ''; // сбросить выбор
                setDisplay(fileNotSelected);
                return;
            }
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > maxFileSize) {
                    alert(`Размер файла ${files[i].name} превышает допустимый лимит в ${maxFileSize / 1048576} МБ.`);
                    e.target.value = ''; // сбросить выбор
                    setDisplay(fileNotSelected);
                    return;
                }
            }
            if (files.length === 1) {
                setDisplay(files[0].name);
            } else if (files.length > 1) {
                setDisplay(`Число файлов: ${files.length}`);
            } else {
                setDisplay(fileNotSelected);
            }
        } else {
            setDisplay(fileNotSelected);
        }
        handlerOnChange && handlerOnChange(e);
    };

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
                        onChange={handleFileChange}
                        multiple={multiple}
                        accept={accept}
                    />
                </div>
            )}
        />
    );
};
