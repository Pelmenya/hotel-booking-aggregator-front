import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { IInputProps } from '../input/input';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { maxFilesSizeValue, maxFilesValue, oneMB } from '../../constants/settings';

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
    const { t, i18n } = useTranslation('input_file');
    const [display, setDisplay] = useState(t('MESSAGE_FILE_NOT_SELECTED'));
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState('');
    const [displayType, setDisplayType] = useState('MESSAGE_FILE_NOT_SELECTED');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            if (files.length > maxFiles) {
                setError(t('TOO_MANY_FILES', { maxFiles }));
                setErrorType('TOO_MANY_FILES');
                e.target.value = ''; // сбросить выбор
                setDisplay(t('MESSAGE_FILE_NOT_SELECTED'));
                setDisplayType('MESSAGE_FILE_NOT_SELECTED');
                return;
            }
            let sizeOfFiles = 0;
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > maxFileSize) {
                    setError(
                        t('FILE_TOO_LARGE', {
                            fileName: files[i].name,
                            maxFileSize: maxFileSize / oneMB,
                        })
                    );
                    setErrorType('FILE_TOO_LARGE');
                    e.target.value = ''; // сбросить выбор
                    setDisplay(t('MESSAGE_FILE_NOT_SELECTED'));
                    setDisplayType('MESSAGE_FILE_NOT_SELECTED');
                    return;
                }
                sizeOfFiles += files[i].size;
            }
            if (sizeOfFiles > maxFileSize) {
                setError(
                    t('TOTAL_SIZE_EXCEEDED', {
                        maxFileSize: maxFileSize / oneMB,
                    })
                );
                setErrorType('TOTAL_SIZE_EXCEEDED');
                e.target.value = ''; // сбросить выбор
                setDisplay(t('MESSAGE_FILE_NOT_SELECTED'));
                setDisplayType('MESSAGE_FILE_NOT_SELECTED');
                return;
            }

            if (files.length === 1) {
                setDisplay(files[0].name);
                setDisplayType('SINGLE_FILE');
                setError('');
                setErrorType('');
            } else if (files.length > 1) {
                setDisplay(t('NUMBER_OF_FILES', { count: files.length }));
                setDisplayType('MULTIPLE_FILES');
                setError('');
                setErrorType('');
            } else {
                setDisplay(t('MESSAGE_FILE_NOT_SELECTED'));
                setDisplayType('MESSAGE_FILE_NOT_SELECTED');
            }
        } else {
            setDisplay(t('MESSAGE_FILE_NOT_SELECTED'));
            setDisplayType('MESSAGE_FILE_NOT_SELECTED');
        }

        handlerOnChange && handlerOnChange(e);
    };

    useEffect(() => {
        // Обновляем состояния при изменении языка
        if (errorType) {
            // Пробуем обновить ошибку при изменении языка
            switch (errorType) {
                case 'TOO_MANY_FILES':
                    setError(t('TOO_MANY_FILES', { maxFiles }));
                    break;
                case 'FILE_TOO_LARGE':
                    setError(
                        t('FILE_TOO_LARGE', {
                            fileName: '', // Можно сохранить имя файла в состоянии, если нужно
                            maxFileSize: maxFileSize / oneMB,
                        })
                    );
                    break;
                case 'TOTAL_SIZE_EXCEEDED':
                    setError(
                        t('TOTAL_SIZE_EXCEEDED', {
                            maxFileSize: maxFileSize / oneMB,
                        })
                    );
                    break;
                default:
                    setError('');
                    break;
            }
        }

        switch (displayType) {
            case 'MESSAGE_FILE_NOT_SELECTED':
                setDisplay(t('MESSAGE_FILE_NOT_SELECTED'));
                break;
            case 'SINGLE_FILE':
                // Здесь можно сохранить имя файла в состоянии, если нужно
                break;
            case 'MULTIPLE_FILES':
                setDisplay(t('NUMBER_OF_FILES', { count: fileInputRef.current?.files?.length || 0 }));
                break;
            default:
                setDisplay(t('MESSAGE_FILE_NOT_SELECTED'));
                break;
        }
    }, [i18n.language, displayType, errorType, maxFileSize, maxFiles, t]);

    return (
        <Controller
            name={name || 'images'}
            control={control}
            render={({ field: { onBlur, value, ref } }) => (
                <div className={cn('relative', className, 'border', 'border-gray-200', 'rounded-lg')}>
                    <span className="bg-base-100 lg:max-w-[250px] sm:max-w-[48px] max-w-[48px] truncate absolute left-44 top-[50%] translate-y-[-50%]">
                        {display}
                    </span>
                    <input
                        ref={(el) => {
                            ref(el);
                            fileInputRef.current = el;
                        }}
                        type="file"
                        className="hidden"
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        title=""
                        onBlur={onBlur}
                        onChange={handleFileChange}
                        multiple={multiple}
                        accept={accept}
                    />
                    <button
                        type="button"
                        className="btn btn-primary rounded-lg"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {t('SELECT_FILE')}
                    </button>
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
