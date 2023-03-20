import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useGetAuthUserMutation } from '@/redux/api/common';
import { getUserState } from '@/redux/selectors/user';
import { setUser } from '@/redux/slices/user';
import { TBaseProps } from '@/types/t-base-props';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type TAuthProviderProps = TBaseProps & {
    pageProps: any;
};

export const AuthProvider = ({ children, pageProps }: TAuthProviderProps) => {
    const router = useRouter();
    const  dispatch = useAppDispatch();    
    const { user } = useAppSelector(getUserState);
    const { protectedFromUser, protectedAuth, role } = pageProps;
    const [getAuthUser, { data, isLoading }] = useGetAuthUserMutation();

    useEffect(() => {
        if (!user) {
            const handler = async () => {
                dispatch(setUser(await getAuthUser('').unwrap()));
            };
            handler().catch(() => dispatch(setUser(null)));
        }
    }, [data, getAuthUser, dispatch, user]);
    
    if (protectedFromUser && user) {
        router.push('/');
        return <></>;
    }

    if (
        protectedAuth &&
        user &&
        role &&
        !role.includes(user.role)
    ) {
        router.push('/');
        return null;
    }

    return <>{children}</>;
};
