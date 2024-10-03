import { TBaseProps } from '@/types/t-base-props';

export const TabContentMain = ({ children }: TBaseProps) => {
    return (
        <div className="md:row-span-1 md:col-span-2 lg:col-span-3 bg-base-100 py-4 rounded-md h-full w-full text-base-content">
            <div className="bg-base-100 py-4 h-full w-full rounded-md flex flex-col items-center justify-start text-base-content">
                {children}
            </div>
        </div>
    );
};
