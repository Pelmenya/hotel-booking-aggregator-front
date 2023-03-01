import { FormLink } from './components/form-link/form-link';
import { Input } from './components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegisterForm } from './schemas/yup.schemas';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaRegisterForm),
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
                    Регистрация
                </h2>
                <form name="register" className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                    />
                    <button
                        className="group relative flex w-full justify-center py-2 px-4 font-medium btn btn-primary"
                    >
                        Войти
                    </button>
                    <FormLink
                        label="Уже зарегистрированы?"
                        href="/login"
                        text="Войти"
                    />
                </form>
            </div>
        </div>
    );
};
