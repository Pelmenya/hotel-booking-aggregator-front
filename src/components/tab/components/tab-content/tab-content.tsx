import { TBaseProps } from '@/types/t-base-props';

export const TabContent = ({ children }: TBaseProps) => (
    <div className="flex flex-col md:grid md:grid-rows-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full w-full">{children}</div>
);
