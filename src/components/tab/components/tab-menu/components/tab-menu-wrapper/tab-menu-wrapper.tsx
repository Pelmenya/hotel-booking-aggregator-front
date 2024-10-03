import { TBaseProps } from '@/types/t-base-props';

export const TabMenuWrapper = ({ children }: TBaseProps) => (
    <div className="col-span-1 row-span-1 border border-base-300 rounded-[0.375rem] shadow-md flex flex-col justify-between">
        {children}
    </div>
);
