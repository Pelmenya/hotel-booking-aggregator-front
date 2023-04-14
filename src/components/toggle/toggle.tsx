import { useCallback, useState } from 'react';

export type TToggleProps = {
    onChange?: (isChecked: boolean) => void;
    text?: string;
};

export const Toggle = ({ onChange, text }: TToggleProps) => {
    const [isChecked, setIsChecked] = useState(true);

    const handlerOnChanges = useCallback(() => {
        onChange && onChange(!isChecked);
        setIsChecked(!isChecked);
    }, [onChange, setIsChecked, isChecked]);

    return (
        <div className="form-control">
            <label htmlFor="CheckedAll" className="cursor-pointer label">
                <span className="text-neutral-content label-text mr-2">
                    {text}
                </span>
                <input
                    id="CheckedAll"
                    type="checkbox"
                    className="toggle toggle-primary toggle-sm"
                    onChange={handlerOnChanges}
                    checked={isChecked}
                />
            </label>
        </div>
    );
};
