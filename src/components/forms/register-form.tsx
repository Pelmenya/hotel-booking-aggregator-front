import { FormLink } from './components/form-link/form-link';
import { Input } from './components/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegisterForm } from './schemas/yup.schemas';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ListBox } from '../list-box/list-box';
import { roles } from '../list-box/constants';
import { useCallback } from 'react';
import { TRole } from '@/redux/types/t-role';

export const RegisterForm = () => {
    const router = useRouter();
    const isAdmin = router.asPath.split('/').includes('admin');
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schemaRegisterForm),
        reValidateMode: 'onChange',
    });

    const onSubmit = (data: any) => {
        if (data) {
            console.log(data);
        }
    };

    const handlerSetRole = useCallback(
        (value: TRole) => {
            setValue('role', value);
        },
        [setValue]
    );

    return (
        <div className="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                    Регистрация
                </h2>
                <form
                    name="register"
                    className="mt-8 space-y-6"
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
                    <button className="group relative flex w-full justify-center py-2 px-4 font-medium btn btn-primary">
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
