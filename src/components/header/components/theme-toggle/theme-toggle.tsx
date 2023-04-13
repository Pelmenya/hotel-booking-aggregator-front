import { useCallback, useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

export const ThemeToggle = () => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        themeChange(false);
        const localStorageTheme = localStorage.getItem('theme');
        if (localStorageTheme) {
            if (localStorageTheme === 'dark') {
                setIsChecked(true);
            }
            if (localStorageTheme === 'light') {
                setIsChecked(false);
            }
        } else setIsChecked(false);
    }, []);

    const handlerSetIsChecked = useCallback(
        () => setIsChecked(!isChecked),
        [isChecked]
    );

    return (
        <div className="form-control items-end">
            <label className="cursor-pointer label">
                <span className="label-text rounded-full bg-neutral p-1 text-neutral-content hover:text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                    </svg>
                </span>
                <input
                    id="ToggleTheme"
                    type="checkbox"
                    className="toggle toggle-primary toggle-sm hidden"
                    checked={isChecked}
                    data-toggle-theme="dark,light"
                    data-act-class="ACTIVECLASS"
                    onChange={handlerSetIsChecked}
                />
            </label>
        </div>
    );
};
