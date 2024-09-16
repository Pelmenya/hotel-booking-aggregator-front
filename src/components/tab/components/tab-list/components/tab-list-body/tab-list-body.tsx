import { TBaseProps } from '@/types/t-base-props';

export const TabListBody = ({ children }: TBaseProps) => (
    <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box shadow-lg p-4"
    >
        <div className="grid grid-cols-1 grid-rows-1 min-h-[calc(100vh_-_11rem)]">
            {children}
        </div>
    </div>
);
