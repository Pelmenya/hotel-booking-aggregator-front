import { useState } from 'react';

export type TToggleProps = {
    onChange?: (isChecked: boolean) => void;
    text?: string;
};

export const Toggle = ({ onChange, text }: TToggleProps) => {
    const [isChecked, setIsChecked] = useState(true);
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
                    onChange={() => {
                        onChange && onChange(!isChecked);
                        setIsChecked(!isChecked);
                    }}
                    checked={isChecked}
                />
            </label>
        </div>
    );
};
