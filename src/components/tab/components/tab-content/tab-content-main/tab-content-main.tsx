import { TBaseProps } from '@/types/t-base-props';

export const TabContentMain = ({ children }: TBaseProps) => {
    return (
        <div className="col-span-4 bg-base-100 px-4 py-4 rounded-md h-full w-full flex flex-col items-center justify-center text-base-content">
            <div className="bg-base-100 px-4 py-4 h-full w-full rounded-md flex flex-col items-center justify-center text-base-content">
                {children}
            </div>
        </div>
    );
};
