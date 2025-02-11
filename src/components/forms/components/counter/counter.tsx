import React, { ChangeEvent } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { Input, TNameInput } from '../input/input';

export type TCounterProps = {
    error: boolean;
    control: Control<FieldValues, any> | undefined;
    label: string;
    name: TNameInput;
};

export const Counter: React.FC<TCounterProps> = ({
    error,
    control,
    label,
    name,
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <>
                        <button
                            className="btn btn-circle btn-sm btn-outline btn-primary"
                            type="button"
                            onClick={() =>
                                onChange(Math.max(0, (parseInt(value) || 0) - 1))
                            }
                        >
                            -
                        </button>
                        <Input
                            type="counter"
                            id={`ID-${name}`}
                            placeholder={label}
                            label={label}
                            name={name}
                            error={error}
                            control={control}
                            value={value || 0}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                let inputValue = e.target.value;
                                onChange(
                                    inputValue === ''
                                        ? 0
                                        : parseInt(inputValue, 10)
                                );
                            }}
                        />
                        <button
                            className="btn btn-circle btn-sm btn-outline btn-primary"
                            type="button"
                            onClick={() => onChange((parseInt(value) || 0) + 1)}
                        >
                            +
                        </button>
                    </>
                )}
            />
        </div>
    );
};
