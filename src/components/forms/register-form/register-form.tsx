import { FormLink } from '../components/form-link/form-link';
import { Input } from '../components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegisterForm } from '../schemas/yup.schemas';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ListBox } from '../../list-box/list-box';
import { roles } from '../../list-box/constants';
import { useCallback } from 'react';
import { TRole } from '@/types/t-role';
import { SubmitBtn } from '../components/submit-btn/submit-btn';
import { usePostAdminUsersMutation } from '@/redux/api/admin';
import { usePostRegisterMutation } from '@/redux/api/client';
import { TError } from '@/types/t-error';
import { usePostLoginMutation } from '@/redux/api/auth';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user';
import { useGetAuthUserMutation } from '@/redux/api/common';
import { FormWrapper } from '../components/form-wrapper/form-wrapper';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAdmin = router.asPath.split('/').includes('admin');

    const [postRegister, { isLoading, isError, error }] =
        usePostRegisterMutation();

    const [
        postAdminUsers,
        { isLoading: isLoadingAdmin, isError: isErrorAdmin, error: errorAdmin },
    ] = usePostAdminUsersMutation();

    const [
        postLogin,
        { isLoading: isLoadingLogin, isError: isErrorLogin, error: errorLogin },
    ] = usePostLoginMutation();

    const [
        getAuthUser,
        { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser },
    ] = useGetAuthUserMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schemaRegisterForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: FieldValues) => {
        if (data) {
            if (isAdmin) {
                const user = await postAdminUsers(data).unwrap();
                if (user) {
                    const loginUser = await postLogin(data).unwrap();
                    if (loginUser) {
                        dispatch(setUser(await getAuthUser('').unwrap()));
                        router.push('/');
                    }
                }
            } else {
                const user = await postRegister(data).unwrap();
                if (user) {
                    const loginUser = await postLogin(data).unwrap();
                    if (loginUser) {
                        dispatch(setUser(await getAuthUser('').unwrap()));
                        router.push('/');
                    }
                }
            }
        }
    };

    const handlerSetRole = useCallback(
        (value: TRole) => {
            setValue('role', value);
        },
        [setValue]
    );

    return (
        <FormWrapper
            title="Регистрация"
            name="register"
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
                type="password"
                id="UserPassword"
                placeholder="Password"
                label="Пароль"
                name="password"
                error={!!errors.password}
                control={control}
                autoComplete="new-password"
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
            {isAdmin && (
                <>
                    <ListBox
                        id='RegisterListBox'
                        label='Роль'
                        items={roles}
                        handlerSetItem={handlerSetRole}
                        activeIdx={2}
                    />
                    <Input
                        hidden={true}
                        type="text"
                        id="UserRole"
                        placeholder="Role"
                        label="Роль"
                        name="role"
                        error={!!errors.role}
                        control={control}
                    />
                </>
            )}
            <SubmitBtn
                text={`Зарегистрировать${isAdmin ? '' : 'ся'}`}
                isLoading={
                    (isAdmin ? isLoadingAdmin : isLoading) ||
                    isLoadingLogin ||
                    isLoadingUser
                }
                isError={
                    (isAdmin ? isErrorAdmin : isError) ||
                    isErrorLogin ||
                    isErrorUser
                }
                error={
                    (isAdmin ? (errorAdmin as TError) : (error as TError)) ||
                    errorLogin ||
                    errorUser
                }
            />
            <FormLink
                label="Уже зарегистрированы?"
                href="/login"
                text="Войти"
            />
        </FormWrapper>
    );
};
