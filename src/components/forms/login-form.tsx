import { yupResolver } from '@hookform/resolvers/yup';
import { FormLink } from './components/form-link/form-link';
import { Input } from './components/input/input';
import { useForm } from 'react-hook-form';
import { schemaLoginForm } from './schemas/yup.schemas';

export const LoginForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaLoginForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = (data: any) => {
        if (data) {
        }
    };

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
                    />
                    <button
                        className="group relative flex w-full justify-center btn btn-primary"
                    >
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
