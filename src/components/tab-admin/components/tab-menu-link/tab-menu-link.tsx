import Link from 'next/link';
import cn from 'classnames';

export type TMenuTabLinkProps = {
    href: string;
    active: boolean;
    text: string;
};

export const TabMenuLink = ({ href, active, text }: TMenuTabLinkProps) => (
    <Link href={href} className={cn('btn', { ['btn-active']: active })}>
        {text}
    </Link>
);
