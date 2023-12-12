import { TBaseProps } from '@/types/t-base-props';

export const TabHead = ({ children }: TBaseProps) => (
    <div role="tablist" className="tabs tabs-lifted">{children}</div>
);
