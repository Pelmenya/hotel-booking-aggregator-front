import { TBaseProps } from '@/types/t-base-props';

export const TabListBody = ({ children }: TBaseProps) => (
    <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-4 w-full"
    >
        <div className="flex min-h-[calc(100vh_-_11rem)] w-full">
            {children}
        </div>
    </div>
);
