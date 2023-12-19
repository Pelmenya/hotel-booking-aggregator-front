import { useCallback, useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import SunIcon from '@/icons/sun.svg';
import MoonIcon from '@/icons/moon.svg';

export const ThemeToggle = () => {
    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        themeChange(false);
        const localStorageTheme = localStorage.getItem('theme');
        if (localStorageTheme) {
            if (localStorageTheme === 'dark') {
                setIsChecked(false);
            }
            if (localStorageTheme === 'light') {
                setIsChecked(true);
            }
        } else setIsChecked(true);
    }, []);

    const handlerSetIsChecked = useCallback(
        () => setIsChecked(!isChecked),
        [isChecked]
    );

    return (
        <div className="form-control items-end text-neutral-content hover:text-white">
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    className="theme-controller"
                    value="light"
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
