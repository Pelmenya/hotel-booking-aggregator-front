import { TBaseProps } from '@/types/t-base-props';

export const Base = ({ children }: TBaseProps) => (
    <div className="border border-base-300 bg-base-100 rounded-box p-4 md:p-8 flex column items-center justify-center">
        {children}
    </div>
);
