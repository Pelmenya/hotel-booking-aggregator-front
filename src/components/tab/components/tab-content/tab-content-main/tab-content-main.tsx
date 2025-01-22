import { TBaseProps } from '@/types/t-base-props';

export const TabContentMain = ({ children }: TBaseProps) => {
    return (
        <div className="bg-base-100 py-4 h-full w-full rounded-md flex flex-col items-center justify-start text-base-content">
            {children}
        </div>
    );
};
