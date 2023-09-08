import { TBaseProps } from '@/types/t-base-props';

export const TabMenu = ({ children }: TBaseProps) => (
    <div className="join join-vertical bg-base-100 px-2 py-2 rounded-md w-full">
        {children}
    </div>
);
