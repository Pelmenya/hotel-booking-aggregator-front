import { TBaseProps } from '@/types/t-base-props';

export const TabBody = ({ children }: TBaseProps) => (
    <div role="tabpanel" className="grid grid-cols-1 grid-rows-1 min-h-[calc(100vh_-_10rem)]">
        {children}
    </div>
);
