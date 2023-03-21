import Home from '@/pages';
import Login from '@/pages/login';

import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useGetAuthUserMutation } from '@/redux/api/common';
import { getUserState } from '@/redux/selectors/user';
import { setUser } from '@/redux/slices/user';
import { TBaseProps } from '@/types/t-base-props';
import { useEffect } from 'react';

export type TAuthProviderProps = TBaseProps & {
    pageProps: any;
};

export const AuthProvider = ({ children, pageProps }: TAuthProviderProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(getUserState);
    const { protectedFromUser, protectedAuth, roles } = pageProps;
    const [getAuthUser] = useGetAuthUserMutation();

    useEffect(() => {
        if (!user) {
            const handler = async () => {
                dispatch(setUser(await getAuthUser('').unwrap()));
            };
            handler().catch(() => dispatch(setUser(null)));
        }
    }, [getAuthUser, dispatch, user]);

    if (protectedFromUser && user) {
        return <Home />;
    }

    if (protectedAuth && user && roles && !roles.includes(user.role)) {
        return <Home />;
    }

    if (protectedAuth && !user) {
        return <Login />;
    }

    return <>{children}</>;
};
