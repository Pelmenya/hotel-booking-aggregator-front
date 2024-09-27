import { useCallback, useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import SunIcon from '@/icons/sun.svg';
import MoonIcon from '@/icons/moon.svg';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserSettingsState } from '@/redux/selectors/user-settings';
import { usePutUserSettingsMutation } from '@/redux/api/common-api';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { setUserSettings } from '@/redux/slices/user-settings-slice';

export const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const { userSettings } = useAppSelector(getUserSettingsState);
    const [putUserSettings] = usePutUserSettingsMutation();

    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        themeChange(false);

        const localStorageTheme = localStorage.getItem('theme');
        if (localStorageTheme) {
            setIsChecked(localStorageTheme === 'light');
        } else if (userSettings.theme) {
            setIsChecked(userSettings.theme === 'light');
        }

        if (userSettings.id) {
            localStorage.setItem('theme', userSettings.theme);
            setIsChecked(userSettings.theme === 'light' ? true : false)
        }
    }, [userSettings.id, userSettings.theme]);

    const handlerSetIsChecked = useCallback(async () => {
        const newTheme = isChecked ? 'dark' : 'light';
        if (userSettings.id) {
            await putUserSettings({
                ...userSettings,
                theme: newTheme,
            }).unwrap();
        }
        dispatch(
            setUserSettings({
                ...userSettings,
                theme: newTheme,
            })
        );
        localStorage.setItem('theme', newTheme);
        setIsChecked(!isChecked);
    }, [isChecked, putUserSettings, userSettings, dispatch]);

    return (
        <div className="form-control items-end text-neutral-content hover:text-white">
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    className="theme-controller"
                    id="ToggleTheme"
                    checked={isChecked}
                    data-toggle-theme="dark,light"
                    data-act-class="ACTIVECLASS"
                    onChange={handlerSetIsChecked}
                />
                <SunIcon />
                <MoonIcon />
            </label>
        </div>
    );
};
