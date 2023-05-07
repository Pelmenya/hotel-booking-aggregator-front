import { TBaseProps } from '@/types/t-base-props';

export const TabBody = ({ children }: TBaseProps) => (
    <div className="grid grid-cols-1 grid-rows-1 min-h-[calc(100vh_-_10rem)] mt-[-1px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]">
        {children}
    </div>
);
