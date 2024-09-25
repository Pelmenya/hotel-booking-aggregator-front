import { useEffect, useState } from 'react';
import {
    useGetProfileMutation,
    useGetProfileSettingsMutation,
} from '@/redux/api/common-api';
import { getUserState } from '@/redux/selectors/user';
import { setUser } from '@/redux/slices/user-slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Loading } from '@/components/loading/loading';
import { setUserSettings } from '@/redux/slices/user-settings-slice';
import { useTranslation } from 'react-i18next';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();
    const { user } = useAppSelector(getUserState);
    const [getProfile] = useGetProfileMutation();
    const [getProfileSettings] = useGetProfileSettingsMutation();
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false); // Флаг для отслеживания состояния монтирования

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile('').unwrap();
                const profileSettings = await getProfileSettings('').unwrap();
                if (isMounted) {
                    dispatch(setUser(profile));
                    dispatch(setUserSettings(profileSettings));
                    i18n.changeLanguage(profileSettings.language);
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
    }, [dispatch, getProfile, getProfileSettings, user, isMounted]);

    if (loading) {
        return (
            <Loading
                color="text-primary"
                size="loading-xs"
                type="loading-bars"
            />
        ); // Показ индикатора загрузки
    }

    return <>{children}</>;
};
