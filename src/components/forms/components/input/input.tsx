import cn from 'classnames';

export interface IInputProps {
    type: 'text' | 'password' | 'email';
    id: string;
    placeholder: string;
    className?: string;
    label: string;
}

export const Input = ({
    type,
    id,
    placeholder,
    className,
    label,
}: IInputProps) => {
    return (
        <label
            htmlFor={id}
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={cn(
                    'peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm',
                    className
                )}
            />
            <span className="absolute left-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                {label}
            </span>
        </label>
    );
};
