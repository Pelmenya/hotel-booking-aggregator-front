import { TTabContentProps } from '../tab-content/tab-content';
import cn from 'classnames';

export const TabMenu = ({ children, isMdRow = true }: TTabContentProps) => (
    <div
        className={cn(
            'join bg-primary-content p-4 rounded-lg gap-2 border border-base-300 rounded-[0.375rem] min-w-max flex-1',
            { ['md:join-vertical']: isMdRow },
            { ['gap-1']: !isMdRow },

        )}
    >
        {children}
    </div>
);
