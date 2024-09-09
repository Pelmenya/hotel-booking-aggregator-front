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
import { useUpdatePasswordMutation } from '@/redux/api/auth';
import { TUpdatePasswordDto } from '@/types/t-update-password-dto';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const UpdatePasswordForm = () => {
    const { t } = useTranslation('form');

    const [typeInput, setTypeInput] = useState<IInputProps['type']>('password');
    const [updatePassword, { isLoading, isError, error }] =
        useUpdatePasswordMutation();

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
            const res = await updatePassword(
                data as TUpdatePasswordDto
            ).unwrap();
            if (res.success) toast.success('Пароль пользователя обновлен');
        }
    };

    return (
        <FormWrapper
            title={
                <div className="flex items-center justify-center gap-2">
                    <span>{t('TITLE_PASWWORD_CHANGE', 'Смена пароля')}</span>
                    <button
                        className="text-primary cursor-pointer"
                        onClick={() => {
                            if (typeInput === 'password') setTypeInput('text');
                            else setTypeInput('password');
                        }}
                    >
                        {typeInput === 'password' ? (
                            <EyeIcon />
                        ) : (
                            <EyeSlashIcon />
                        )}
                    </button>
                </div>
            }
            name="updatePassword"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type={typeInput}
                id="OldPassword"
                placeholder="Old Password"
                label={t('LABEL_INPUT_OLD_PASSWORD', 'Старый пароль')}
                name="oldPassword"
                error={!!errors.oldPassword}
                control={control}
            />
            <Input
                type={typeInput}
                id="NewPassword"
                placeholder="NewPassword"
                label={t('LABEL_INPUT_NEW_PASSWORD', 'Новый пароль')}
                name="newPassword"
                error={!!errors.password}
                control={control}
            />
            <Input
                type={typeInput}
                id="confirmPassword"
                placeholder="ConfirmPassword"
                label={t('LABEL_INPUT_CONFIRM_NEW_PASSWORD', 'Повторите новый пароль')}
                name="confirmPassword"
                error={!!errors.confirmPassword}
                control={control}
            />
            <SubmitBtn
                text={'Сохранить'}
                isLoading={isLoading}
                isError={isError}
                error={error as TError}
            />
        </FormWrapper>
    );
};
