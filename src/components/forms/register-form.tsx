import Link from 'next/link';
import { FormLink } from './components/form-link/form-link';
import { Input } from './components/input/input';

export const RegisterForm = () => {
    return (
        <div className="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                    Регистрация
                </h2>
                <form name="register" className="mt-8 space-y-6">
                    <Input
                        type="text"
                        id="UserName"
                        placeholder="Name"
                        label="Имя"
                    />
                    <Input
                        type="email"
                        id="UserEmail"
                        placeholder="Email"
                        label="Почта"
                    />
                    <Input
                        type="password"
                        id="UserPassword"
                        placeholder="Password"
                        label="Пароль"
                    />
                    <button
                        className="group relative flex w-full justify-center  py-2 px-4 font-medium btn btn-primary"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                                className="h-5 w-5 group-hover:text-indigo-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
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
