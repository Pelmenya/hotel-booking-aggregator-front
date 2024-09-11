import { TBaseProps } from '@/types/t-base-props';

export const TabContent = ({ children }: TBaseProps) => (
    <div className="grid grid-cols-5 grid-row-1 gap-4 h-full">{children}</div>
);
