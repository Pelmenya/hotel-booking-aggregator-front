import { yupResolver } from '@hookform/resolvers/yup';
import { FormLink } from './components/form-link/form-link';
import { Input } from './components/input/input';
import { useForm } from 'react-hook-form';
import { schemaLoginForm } from './schemas/yup.schemas';
import { usePostLoginMutation } from '@/redux/api/auth';
import { useRouter } from 'next/router';
import { TError } from '@/types/t-error';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUser } from '@/redux/slices/user';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [errorApi, setErrorApi] = useState<TError>();

    const [postLogin, { isLoading, isError, error }] = usePostLoginMutation();

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
            const user = await postLogin(dto).unwrap();
            dispatch(setUser(user));
            router.push('/');
        }
    };

    useEffect(() => {
        if (error) {
            setErrorApi(error as TError);
        }
    }, [error]);

    return (
        <div className="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                    Вход
                </h2>
                <form
                    name="login"
                    className="mt-8 space-y-6"
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
                    <button
                        className={cn(
                            'group relative flex w-full justify-center btn btn-primary',
                            { ['loading']: isLoading }
                        )}
                    >
                        {isError && (
                            <span className="absolute w-full text-xs text-error top-[-20px]">
                                {errorApi?.data?.message}
                            </span>
                        )}
                        Войти
                    </button>
                    <FormLink
                        label="Вы — новый пользователь?"
                        href="/client/register"
                        text="Зарегистрироваться"
                    />
                </form>
            </div>
        </div>
    );
};
