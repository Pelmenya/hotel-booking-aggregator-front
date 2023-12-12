import { TBaseProps } from '@/types/t-base-props';
import cn from 'classnames';

export type TTabBodyItemProps = TBaseProps & {
    firstInTab?: boolean;
    active: boolean;
};
export const TabBodyItem = ({
    children,
    active,
    firstInTab = false,
}: TTabBodyItemProps) => (
    <>
        {active ? (
            <div
                role=''
                className={cn(
                    'border border-orange-300 px-4 py-4 text-sm font-medium text-neutral-content shadow-xl mt-[-1px] rounded-[0_0_0.375rem_0.375rem]',
                    {'block': active }
                )}
            >
                {children}
            </div>
        ) : null}
    </>
);
