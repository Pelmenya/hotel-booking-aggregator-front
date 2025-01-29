import { TBaseProps } from '@/types/t-base-props';
import cn from 'classnames';

export type TTabContentProps = TBaseProps & {
    isMdRow?: boolean; 
}

export const TabContent = ({ children, isMdRow = true }: TTabContentProps) => (
    <div className={cn('flex flex-col gap-4 h-full w-full', {['md:flex-row']: isMdRow})}>{children}</div>
);
