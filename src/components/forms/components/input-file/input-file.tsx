import { ChangeEvent, useState } from 'react';
import { Controller } from 'react-hook-form';
import { IInputProps } from '../input/input';
import cn from 'classnames';
import { MESSAGES_FORM } from '../../constants/messages-form';
import {
    maxFilesSizeValue,
    maxFilesValue,
    oneMB,
} from '../../constants/settings';

export const InputFile = ({
    id,
    placeholder,
    handlerOnChange,
    multiple,
    accept,
    name,
    control,
    className,
    maxFiles = maxFilesValue, // максимальное количество файлов
    maxFileSize = maxFilesSizeValue, // максимальный размер всех файлов в байтах (по умолчанию 1 МБ) за один раз
}: Partial<
    IInputProps & {
        handlerOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
        maxFiles?: number;
        maxFileSize?: number;
    }
>) => {
    const [display, setDisplay] = useState(
        MESSAGES_FORM.MESSAGE_FILE_NOT_SELECTED
    );
    const [error, setError] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            if (files.length > maxFiles) {
                setError(`Можно загрузить не более ${maxFiles} файла(ов).`);
                e.target.value = ''; // сбросить выбор
                setDisplay(MESSAGES_FORM.MESSAGE_FILE_NOT_SELECTED);
            }
            let sizeOfFilles = 0;
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > maxFileSize) {
                    setError(
                        `Размер файла ${
                            files[i].name
                        } превышает допустимый лимит в ${
                            maxFileSize / oneMB
                        } МБ.`
                    );
                    e.target.value = ''; // сбросить выбор
                    setDisplay(MESSAGES_FORM.MESSAGE_FILE_NOT_SELECTED);
                }
                if (files.length > 1) {
                    sizeOfFilles = sizeOfFilles + files[i].size;
                }
            }
            if (sizeOfFilles > maxFileSize) {
                setError(
                    `Размер всех файлов превышает допустимый лимит в ${
                        maxFileSize / oneMB
                    } МБ.`
                );
                e.target.value = ''; // сбросить выбор
                setDisplay(MESSAGES_FORM.MESSAGE_FILE_NOT_SELECTED);
            }

            if (files.length === 1) {
                setDisplay(files[0].name);
                setError('');
            } else if (files.length > 1) {
                setDisplay(`Число файлов: ${files.length}`);
                setError('');
            } else {
                setDisplay(MESSAGES_FORM.MESSAGE_FILE_NOT_SELECTED);
            }
        } else {
            setDisplay(MESSAGES_FORM.MESSAGE_FILE_NOT_SELECTED);
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
                    <></>
                    {error && (
                        <span className="absolute left-3 bottom-[-16px] text-xs text-error">
                            {error}
                        </span>
                    )}
                </div>
            )}
        />
    );
};
