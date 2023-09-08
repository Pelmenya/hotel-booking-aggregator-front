import Home from '@/pages';
import Login from '@/pages/login';

import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useGetProfileMutation } from '@/redux/api/common';
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
    const [getProfile] = useGetProfileMutation();

    useEffect(() => {
        if (!user) {
            const handler = async () => {
                dispatch(setUser(await getProfile('').unwrap()));
            };
            handler().catch(() => dispatch(setUser(null)));
        }
    }, [getProfile, dispatch, user]);

    
    if (protectedAuth && !user) {
        return <Login />;
    }

    if (protectedFromUser && user) {
        return <Home />;
    }

    if (protectedAuth && user && roles && !roles.includes(user.role)) {
        return <Home />;
    }


    return <>{children}</>;
};
