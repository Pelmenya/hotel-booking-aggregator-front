import Link from 'next/link';
import { TBaseProps } from '@/types/t-base-props';

import cn from 'classnames';

export type TTabHeadLinkProps = TBaseProps & {
    href: string;
    active: boolean;
};

export const TabHeadLink = ({ href, children, active }: TTabHeadLinkProps) => (
    <Link
        role="tab"
        href={href}
        className={cn('tab uppercase', {
            ['tab-active font-bold']: active,
        })}
    >
        {children}
    </Link>
);
