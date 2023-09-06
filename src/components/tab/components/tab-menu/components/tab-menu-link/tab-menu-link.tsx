import Link from 'next/link';
import cn from 'classnames';

export type TMenuTabLinkProps = {
    href: string;
    active: boolean;
    text: string;
    disabled?: boolean;
};

export const TabMenuLink = ({
    href,
    active,
    text,
    disabled = false,
}: TMenuTabLinkProps) => (
    <>
        {!disabled ? (
            <Link href={href} className={cn('btn', { ['btn-active']: active })}>
                {text}
            </Link>
        ) : (
            <button
                disabled={disabled}
                className={cn('btn', { ['btn-active']: active })}
            >
                {text}
            </button>
        )}
    </>
);
