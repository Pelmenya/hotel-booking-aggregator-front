import { TBaseProps } from '@/types/t-base-props';
import { ReactNode } from 'react';
import cn from 'classnames';

export type TFormWrapperProps = TBaseProps & {
    title: ReactNode;
    name: string;
    className?: string;
    maxWidth?: string;
    onSubmit: () => void;
};

export const FormWrapper = ({
    title,
    name,
    className,
    maxWidth,
    onSubmit,
    children,
}: TFormWrapperProps) => (
    <div
        className={cn(
            'flex min-h-full w-full items-center justify-center py-8 text-base-content',
            className ? className : ''
        )}
    >
        <div className={cn('w-full space-y-8', maxWidth ? maxWidth : 'max-w-md')}>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                {title}
            </h2>
            <form
                name={name}
                className={cn(
                    'mt-8 space-y-6 w-full',
                )}
                onSubmit={onSubmit}
            >
                {children}
            </form>
        </div>
    </div>
);
