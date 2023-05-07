import Link from 'next/link';
import { TBaseProps } from '@/types/t-base-props';

import cn from 'classnames';

export type TTabHeadLinkProps = TBaseProps & {
    href: string;
    active: boolean;
};

export const TabHeadLink = ({ href, children, active }: TTabHeadLinkProps) => (
    <Link
        href={href}
        className={cn('tab tab-lifted', {
            ['tab-active [--tab-bg:hsl(var(--n))] [--tab-color:hsl(var(--nc))] [--tab-border-color:hsl(var(--n))] font-bold']:
                active,
        })}
    >
        {children}
    </Link>
);
