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

export const UpdatePasswordForm = () => {
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
            await updatePassword(data as TUpdatePasswordDto).unwrap();
        }
    };

    return (
        <FormWrapper
            title={
                <div className="flex items-center justify-center gap-2">
                    <span>Смена пароля</span>
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
                label="Старый пароль"
                name="oldPassword"
                error={!!errors.oldPassword}
                control={control}
            />
            <Input
                type={typeInput}
                id="NewPassword"
                placeholder="NewPassword"
                label="Новый пароль"
                name="newPassword"
                error={!!errors.password}
                control={control}
            />
            <Input
                type={typeInput}
                id="confirmPassword"
                placeholder="ConfirmPassword"
                label="Повторите новый пароль"
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
