import { TBaseProps } from '@/types/t-base-props';
import cn from 'classnames';

export type TTabBodyItemProps = TBaseProps & {
    active: boolean;
};
export const TabBodyItem = ({ children, active }: TTabBodyItemProps) => (
    <>
        {active ? (
            <div
                role="tabpanel"
                className={cn(
                    'border border-base-300 px-4 py-4 text-sm font-medium text-neutral-content shadow-xl mt-[-1px] rounded-[0_0_0.375rem_0.375rem]',
                    { block: active }
                )}
            >
                {children}
            </div>
        ) : null}
    </>
);
