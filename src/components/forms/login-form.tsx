import { yupResolver } from '@hookform/resolvers/yup';
import { FormLink } from './components/form-link/form-link';
import { Input } from './components/input/input';
import { useForm } from 'react-hook-form';
import { schemaLoginForm } from './schemas/yup.sсhemas';

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
                        onClick={() => console.log(errors)}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium btn btn-primary"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
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
