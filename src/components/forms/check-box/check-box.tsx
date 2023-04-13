import { ChangeEvent, useEffect, useState } from 'react';

export type TCheckBoxProps = {
    id: string;
    isChecked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBox = ({ id, isChecked, onChange }: TCheckBoxProps) => {
    const [checked, setChecked] = useState(isChecked);
    
    useEffect(() => {
        setChecked(isChecked)
    }, [isChecked])

    return (
        <div className="form-control absolute">
            <label className="label cursor-pointer">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    className="checkbox checkbox-sm checkbox-primary bg-base-content"
                    onChange={(e) => {
                        onChange && onChange(e);
                        setChecked(!checked);
                    }}
                />
            </label>
        </div>
    );
};
