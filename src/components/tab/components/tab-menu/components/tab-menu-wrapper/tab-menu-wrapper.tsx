import { TBaseProps } from '@/types/t-base-props';

export const TabMenuWrapper = ({ children }: TBaseProps) => (
    <div className="col-span-1 border border-base-300 rounded-[0.375rem] flex flex-col justify-between">
        {children}
    </div>
);
