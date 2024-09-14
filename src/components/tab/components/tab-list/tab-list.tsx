import { TBaseProps } from '@/types/t-base-props';

export const TabList = ({ children }: TBaseProps) => (
    <div role="tablist" className="tabs tabs-lifted">{children}</div>
);
