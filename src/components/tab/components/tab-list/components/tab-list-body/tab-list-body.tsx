import { TBaseProps } from '@/types/t-base-props';

export const TabListBody = ({ children }: TBaseProps) => (
    <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-4 w-full"
    >
        <div className="flex min-h-[calc(100vh_-_11rem)] w-full min-w-[calc(100vw_-_3rem)] sm:min-w-full md:h-[calc(100vh_-_11rem)]">
            {children}
        </div>
    </div>
);
