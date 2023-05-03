import { Modal } from '@/components/modal/modal';
import styles from './avatar.module.css';
import cn from 'classnames';
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputFile } from '@/components/forms/components/input-file/input-file';
import { TNullable } from '@/types/t-nullable';

export const Avatar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [path, setPath] = useState<TNullable<string>>(null);
    const [file, setFile] = useState<FileList>();

    const { handleSubmit, control } = useForm();

    const handlerCloseModal = useCallback(() => {
        setPath(null);
        setIsOpen(false);
    }, [setIsOpen]);

    const handlerOnSubmitAvatar = useCallback(() => {
        console.log(file);
    }, [file]);

    const handlerOnChangeAvatar = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const paths = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                );
                console.log(files);
                setPath(paths[0]);
                setFile(files);
            }
        },
        []
    );
    return (
        <>
            <Modal isOpen={isOpen} handlerClose={handlerCloseModal} sizeCloseBtn='sm'>
                <form
                    name="AvatarForm"
                    className="flex flex-col items-center gap-8 pt-8 min-w-[280px]"
                    onSubmit={handleSubmit(handlerOnSubmitAvatar)}
                >
                    <label
                        htmlFor="avatar"
                        className="text-primary underline underline-offset-4 cursor-pointer max-w-[120px]"
                    >
                        {!path ? (
                            <span>Выбрать файл на компьютере</span>
                        ) : (
                            <div
                                style={
                                    path
                                        ? { backgroundImage: `url(${path})` }
                                        : {}
                                }
                                className={cn(
                                    'w-32 h-32 rounded-full bg-base-300',
                                    styles.avatar
                                )}
                            />
                        )}
                    </label>
                    <InputFile
                        handlerOnChange={handlerOnChangeAvatar}
                        control={control}
                        id="avatar"
                        name="avatar"
                        className="hidden"
                        accept="image/*"
                    />
                    <button className="btn btn-primary w-full">Поменять</button>
                </form>
            </Modal>
            <div
                onClick={() => setIsOpen(true)}
                className={cn(
                    'block relative w-32 h-32 rounded-full bg-base-300 cursor-pointer',
                    styles.avatar
                )}
                style={path ? { backgroundImage: `url(${path})` } : {}}
            >
                <div className="absolute w-full h-full flex items-center justify-center opacity-0 bg-black hover:opacity-50 rounded-full">
                    <span className="absolute text-center text-white">
                        Поменять аватар
                    </span>
                </div>
            </div>
        </>
    );
};
