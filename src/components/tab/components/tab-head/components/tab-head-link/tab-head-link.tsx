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
        className={cn('tab tab-lifted border-transparent uppercase', {
            ['tab-active [--tab-bg:hsl(var(--b3))] [--tab-color:hsl(var(--bc))] [--tab-border-color:hsl(var(--b3))] font-bold']:
                active,
        })}
    >
        {children}
    </Link>
);
