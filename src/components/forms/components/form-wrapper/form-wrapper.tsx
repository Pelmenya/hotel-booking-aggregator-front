import { TBaseProps } from '@/types/t-base-props';
import { ReactNode } from 'react';
import cn from 'classnames';

export type TFormWrapperProps = TBaseProps & {
    title: ReactNode;
    name: string;
    className?: string;
    onSubmit: () => void;
};

export const FormWrapper = ({ title, name, className, onSubmit, children }: TFormWrapperProps) => (
    <div className={cn('flex min-h-full w-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8 text-base-content', className ? className :'')}>
        <div className="w-full max-w-md space-y-8">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                {title}
            </h2>
            <form
                name={name}
                className="mt-8 space-y-6"
                onSubmit={onSubmit}
            >
                {children}
            </form>
        </div>
    </div>
);
