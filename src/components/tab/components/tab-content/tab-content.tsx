import { TBaseProps } from '@/types/t-base-props';

export const TabContent = ({ children }: TBaseProps) => (
    <div className="grid grid-cols-1 grid-rows-4 md:grid-rows-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">{children}</div>
);
