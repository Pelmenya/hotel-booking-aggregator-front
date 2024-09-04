import { useEffect, useState } from 'react';
import { useGetProfileMutation } from '@/redux/api/common';
import { getUserState } from '@/redux/selectors/user';
import { setUser } from '@/redux/slices/user';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Loading } from '@/components/loading/loading';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(getUserState);
    const [getProfile] = useGetProfileMutation();
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile('').unwrap();
                dispatch(setUser(profile));
            } catch {
                dispatch(setUser(null));
            } finally {
                setLoading(false); // Устанавливаем загрузку в false после завершения запроса
            }
        };

        if (!user) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [dispatch, getProfile, user]);

    if (loading) {
        return <Loading color="text-primary" size="loading-xs" type="loading-bars" />; // Показ индикатора загрузки
    }

    return <>{children}</>;
};
