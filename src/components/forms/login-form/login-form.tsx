import { yupResolver } from '@hookform/resolvers/yup';
import { FormLink } from '../components/form-link/form-link';
import { Input } from '../components/input/input';
import { useForm } from 'react-hook-form';
import { schemaLoginForm } from '../schemas/yup.schemas';
import { usePostLoginMutation } from '@/redux/api/auth';
import { useRouter } from 'next/router';
import { TError } from '@/types/t-error';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user';
import { useGetAuthUserMutation } from '@/redux/api/common';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [postLogin, { isLoading, isError, error }] = usePostLoginMutation();
    const [getAuthUser] = useGetAuthUserMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaLoginForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (dto: any) => {
        if (dto) {
            const postUser = await postLogin(dto).unwrap();
            if (postUser) {
                dispatch(setUser(await getAuthUser('').unwrap()));
                router.push('/profile');
            }
        }
    };

    return (
        <FormWrapper
            title="Вход"
            name="login"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                type="email"
                id="UserEmail"
                placeholder="Email"
                label="Почта"
                control={control}
                error={!!errors.email}
                name="email"
            />
            <Input
                type="password"
                id="UserPassword"
                placeholder="Password"
                label="Пароль"
                control={control}
                error={!!errors.password}
                name="password"
                autoComplete="new-password"
            />
            <SubmitBtn
                text="Войти"
                error={error as TError}
                isError={isError}
                isLoading={isLoading}
            />

            <FormLink
                label="Вы — новый пользователь?"
                href="/client/register"
                text="Зарегистрироваться"
            />
        </FormWrapper>
    );
};
