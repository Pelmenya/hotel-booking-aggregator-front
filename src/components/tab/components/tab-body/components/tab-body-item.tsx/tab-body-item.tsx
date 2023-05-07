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
                className={cn(
                    'px-4 py-4 rounded text-sm font-medium text-neutral-content bg-neutral',
                    { ['rounded-[0_0.375rem_0.375rem]']: firstInTab }
                )}
            >
                {children}
            </div>
        ) : null}
    </>
);
