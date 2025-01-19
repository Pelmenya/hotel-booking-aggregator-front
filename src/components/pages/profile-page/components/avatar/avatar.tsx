import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputFile } from '@/components/forms/components/input-file/input-file';
import { TNullable } from '@/types/t-nullable';
import { Modal } from '@/components/modal/modal';
import cn from 'classnames';

import styles from './avatar.module.css';
import { useUpdateProfileMutation } from '@/redux/api/common-api';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user-slice';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { getImageUrl } from 'utils/getImageUrl';
import { TUser } from '@/types/t-user';
import { useTranslation } from 'react-i18next';

export const Avatar = () => {
    const { t } = useTranslation('form')
    const { user } = useAppSelector(getUserState);
    const picture =  user?.avatars?.length ? getImageUrl(user.avatars[0], 'server') : null;
    
    const dispatch = useAppDispatch();

    const [updateUser] = useUpdateProfileMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [basePicture, setBasePicture] = useState<TNullable<string>>(picture);
    const [files, setFiles] = useState<FileList>();

    const { handleSubmit, control } = useForm();

    const handlerCloseModal = useCallback(() => {
        setBasePicture(picture);
        setIsOpen(false);
    }, [setIsOpen, picture]);
    
    const handlerOpenModal = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const handlerOnSubmitAvatar = useCallback(async () => {
        const formData = new FormData();

        if (files) {
            formData.append('avatars', files[0]);

            const user = await updateUser(formData as Partial<TUser>).unwrap();
            dispatch(setUser(user));
            if (user){
                setIsOpen(false)
            }
        }
    }, [files, updateUser, dispatch]);

    const handlerOnChangeAvatar = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const paths = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                );
                setBasePicture(paths[0]);
                setFiles(files);
            }
        },
        []
    );
    return (
        <>
            <Modal
                isOpen={isOpen}
                handlerClose={handlerCloseModal}
                sizeCloseBtn="sm"
            >
                <form
                    name="AvatarForm"
                    title="Загрузите файл"
                    className="flex flex-col items-center gap-8 min-w-[280px]"
                    onSubmit={handleSubmit(handlerOnSubmitAvatar)}
                >
                    <p className="font-bold text-xl">{t('TITLE_UPLOAD_FILE','Загрузите файл')}</p>
                    <label
                        htmlFor="avatars"
                        className="text-primary underline underline-offset-4 cursor-pointer max-w-[140px] text-center"
                    >
                        {!basePicture ? (
                            <span>{t('CAPTION_BTN_UPLOAD_FILE','Выбрать файл на компьютере')}</span>
                        ) : (
                            <div
                                style={
                                    basePicture
                                        ? {
                                            backgroundImage: `url(${basePicture})`,
                                        }
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
                        id="avatars"
                        name="avatars"
                        className="hidden"
                        accept="image/*"
                    />
                    <button className="btn btn-primary w-full">{t('CAPTION_SUBMIT_BTN_CHANGE','Поменять')}</button>
                </form>
            </Modal>
            <div
                onClick={handlerOpenModal}
                style={
                    basePicture
                        ? { backgroundImage: `url(${basePicture})` }
                        : {}
                }
                className={cn(
                    'relative w-36 h-36 rounded-full bg-base-300 cursor-pointer flex items-center justify-center',
                    styles.avatar
                )}
            >
                <div
                    className={cn(
                        'absolute w-full h-full opacity-0 bg-black hover:opacity-50 rounded-full',
                        styles.overlay
                    )}
                />
                <span
                    className={cn(
                        'absolute w-full h-full text-center text-white hidden',
                        styles.text
                    )}
                >
                    {t('MESSAGE_CHANGE_AVATAR','Поменять фото')}
                </span>
            </div>
        </>
    );
};
