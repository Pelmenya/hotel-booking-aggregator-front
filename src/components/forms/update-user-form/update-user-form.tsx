import { Input } from '../components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaUpdateProfileForm } from '../schemas/yup.schemas';
import { FieldValues, useForm } from 'react-hook-form';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { TError } from '@/types/t-error';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserState } from '@/redux/selectors/user';
import { useUpdateProfileMutation } from '@/redux/api/common';
import { useEffect } from 'react';
import { TUser } from '@/types/t-user';
import { setUser } from '@/redux/slices/user';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const UpdateUserForm = () => {
    const { t } = useTranslation('form');
    const { user } = useAppSelector(getUserState);
    const dispatch = useAppDispatch();

    const [updateUser, { isLoading, isError, error }] =
        useUpdateProfileMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schemaUpdateProfileForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: FieldValues) => {
        if (data) {
            const formData = new FormData();
            user?.avatars?.forEach((file) => formData.append('avatars', file));
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('contactPhone', data.contactPhone);

            const newUser = await updateUser(
                formData as Partial<TUser>
            ).unwrap();
            if (newUser) {
                dispatch(setUser(newUser));
                toast.success('Профиль пользователя обновлен');
            }
        }
    };

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('contactPhone', user.contactPhone);
        }
    }, [user, setValue]);

    return (
        <FormWrapper
            title={t('TITLE_FORM_UPDATE_USER', 'Редактирование профиля')}
            name="profile"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="UserName"
                placeholder="Name"
                label={t('LABEL_INPUT_USER_NAME', 'Имя')}
                name="name"
                error={!!errors.name}
                control={control}
            />
            <Input
                type="email"
                id="UserEmail"
                placeholder="Email"
                label={t('LABEL_INPUT_EMAIL', 'Почта')}
                name="email"
                error={!!errors.email}
                control={control}
            />
            <Input
                type="tel"
                id="UserTel"
                placeholder="Phone"
                label={t('LABEL_INPUT_PHONE', 'Телефон')}
                name="contactPhone"
                error={!!errors.contactPhone}
                control={control}
            />
            <SubmitBtn
                text={'Редактировать'}
                isLoading={isLoading}
                isError={isError}
                error={error as TError}
            />
        </FormWrapper>
    );
};
