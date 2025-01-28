import { IInputProps, Input } from '../components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaUpdatePasswordForm } from '../schemas/yup.schemas';
import { FieldValues, useForm } from 'react-hook-form';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { TError } from '@/types/t-error';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { useState } from 'react';
import EyeIcon from '@/icons/eye.svg';
import EyeSlashIcon from '@/icons/eye-slash.svg';
import { useUpdatePasswordMutation } from '@/redux/api/auth-api';
import { TUpdatePasswordDto } from '@/types/t-update-password-dto';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

export const UpdatePasswordForm = () => {
    const { t } = useTranslation('form');
    const [typeInput, setTypeInput] = useState<IInputProps['type']>('password');
    const [updatePassword, { isLoading, isError, error }] = useUpdatePasswordMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaUpdatePasswordForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: FieldValues) => {
        if (data) {
            try {
                const res = await updatePassword(data as TUpdatePasswordDto).unwrap();
                if (res.success)
                    toast.success(
                        t('TOAST_SUCCESS_PASSWORD_UPDATED', 'Пароль пользователя обновлен')
                    );
            } catch (err) {
                // Обработка ошибок
            }
        }
    };

    // Генерация уникального суффикса для id
    const uniqueSuffix = _.uniqueId();

    return (
        <FormWrapper
            maxWidth="max-w-lg"
            title={
                <div className="flex items-center justify-center gap-2 w-full">
                    <span>
                        {t('TITLE_FORM_PASSWORD_CHANGE', 'Смена пароля')}
                    </span>
                    <button
                        type="button" // Добавьте type="button", чтобы предотвратить отправку формы при нажатии
                        className="text-primary cursor-pointer"
                        onClick={() => {
                            setTypeInput(prevType => (prevType === 'password' ? 'text' : 'password'));
                        }}
                    >
                        {typeInput === 'password' ? <EyeIcon /> : <EyeSlashIcon />}
                    </button>
                </div>
            }
            name="updatePassword"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col w-full gap-4">
                <Input
                    type={typeInput}
                    id={`OldPassword-${uniqueSuffix}`}
                    placeholder="Old Password"
                    label={t('LABEL_INPUT_OLD_PASSWORD', 'Старый пароль')}
                    name="oldPassword"
                    error={!!errors.oldPassword}
                    control={control}
                />
                <Input
                    type={typeInput}
                    id={`NewPassword-${uniqueSuffix}`}
                    placeholder="New Password"
                    label={t('LABEL_INPUT_NEW_PASSWORD', 'Новый пароль')}
                    name="newPassword"
                    error={!!errors.newPassword}
                    control={control}
                />
                <Input
                    type={typeInput}
                    id={`ConfirmPassword-${uniqueSuffix}`}
                    placeholder="Confirm Password"
                    label={t('LABEL_INPUT_CONFIRM_NEW_PASSWORD', 'Повторите новый пароль')}
                    name="confirmPassword"
                    error={!!errors.confirmPassword}
                    control={control}
                />
                <SubmitBtn
                    text={t('CAPTION_SUBMIT_BTN_SAVE', 'Сохранить')}
                    isLoading={isLoading}
                    isError={isError}
                    error={error as TError}
                />
            </div>
        </FormWrapper>
    );
};
