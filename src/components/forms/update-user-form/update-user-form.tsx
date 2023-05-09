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

export const UpdateUserForm = () => {
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
            user?.avatars?.forEach(file => formData.append('avatars', file));
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('contactPhone', data.contactPhone);
            
            const newUser = await updateUser(formData as Partial<TUser>).unwrap()
            dispatch(setUser(newUser));
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
            title="Редактирование профиля"
            name="profile"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="text"
                id="UserName"
                placeholder="Name"
                label="Имя"
                name="name"
                error={!!errors.name}
                control={control}
            />
            <Input
                type="email"
                id="UserEmail"
                placeholder="Email"
                label="Почта"
                name="email"
                error={!!errors.email}
                control={control}
            />
            <Input
                type="tel"
                id="UserTel"
                placeholder="Phone"
                label="Телефон"
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
