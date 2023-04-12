import { ChangeEvent, useState } from 'react';

export type TCheckBoxProps = {
    id: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBox = ({ id, onChange }: TCheckBoxProps) => {
    const  [checked, setChecked ] = useState(true);
    return (
        <div className="form-control absolute">
            <label className="label cursor-pointer">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                    className="checkbox checkbox-sm checkbox-primary focus:border-transparent focus:outline-none focus:ring-0"
                    onChange={onChange}
                />
            </label>
        </div>
    );
};
