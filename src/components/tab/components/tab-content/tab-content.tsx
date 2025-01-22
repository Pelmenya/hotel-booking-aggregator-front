import { TBaseProps } from '@/types/t-base-props';

export const TabContent = ({ children }: TBaseProps) => (
    <div className="flex flex-col md:flex-row gap-4 h-full w-full">{children}</div>
);
