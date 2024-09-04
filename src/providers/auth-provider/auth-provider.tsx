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
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false); // Флаг для отслеживания состояния монтирования

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile('').unwrap();
                if (isMounted) {
                    dispatch(setUser(profile));
                }
            } catch {
                if (isMounted) {
                    dispatch(setUser(null));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (!user) {
            fetchProfile();
        } else {
            setLoading(false);
        }

        setIsMounted(true); // Устанавливаем флаг монтирования

        return () => {
            setIsMounted(false); // Сбрасываем флаг монтирования при размонтировании компонента
        };
    }, [dispatch, getProfile, user, isMounted]);

    if (loading) {
        return <Loading color="text-primary" size="loading-xs" type="loading-bars" />; // Показ индикатора загрузки
    }

    return <>{children}</>;
};

