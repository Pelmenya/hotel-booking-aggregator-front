import { TBaseProps } from '@/types/t-base-props';

export const Base = ({ children }: TBaseProps) => (
    <div className="border border-base-300 rounded-box shadow-md p-4 flex column items-center justify-center">
        {children}
    </div>
);
