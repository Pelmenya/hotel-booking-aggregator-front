// components/auth-router.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserState } from '@/redux/selectors/user';
import Home from '@/pages';
import { useAppSelector } from '@/hooks/use-app-selector';
import { TRole } from '@/types/t-role';
import { Loading } from '@/components/loading/loading';

type TAuthRouterProps = {
    children: React.ReactNode;
    protectedAuth?: boolean;
    protectedFromUser?: boolean;
    roles?: TRole[];
};

export const AuthRouter = ({
    children,
    protectedAuth,
    protectedFromUser,
    roles,
}: TAuthRouterProps) => {
    const { user } = useAppSelector(getUserState);
    const router = useRouter();
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        if (protectedAuth && !user) {
            if (!initialRoute) {
                setInitialRoute(router.asPath); // запоминаем страницу входа
            }
            router.push('/login');
        } else if (user && initialRoute && !protectedAuth) {
            router.push(initialRoute); // Redirect to the initially requested route
            setInitialRoute(null); // Clear the initial route after redirect
        }
    }, [protectedAuth, user, initialRoute, router]);

    if (protectedAuth && !user) {
        return  <Loading color="text-primary" size="loading-xs" type="loading-bars" />; // Загрузка, пока идет проверка аутентификации
    }

    if (protectedFromUser && user) {
        return <Home />; // Перенаправляем на домашнюю страницу, если пользователь аутентифицирован
    }

    if (protectedAuth && user && user.role && roles && !roles.includes(user.role)) {
        return <Home />; // Перенаправляем на домашнюю страницу, если роль пользователя не соответствует требуемой
    }

    return <>{children}</>;
};
