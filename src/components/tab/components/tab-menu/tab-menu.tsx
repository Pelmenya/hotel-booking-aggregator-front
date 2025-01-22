import { TBaseProps } from '@/types/t-base-props';

export const TabMenu = ({ children }: TBaseProps) => (
    <div className="join md:join-vertical bg-base-100 px-2 py-2 rounded-md border border-base-300 rounded-[0.375rem] min-w-max h-full">
        {children}
    </div>
);
