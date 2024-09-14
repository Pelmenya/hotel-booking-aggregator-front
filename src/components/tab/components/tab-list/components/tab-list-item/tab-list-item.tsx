import { ReactNode } from 'react';
import { TabListBody } from '../tab-list-body/tab-list-body';
import { TabListHeadLink, TTabListHeadLinkProps } from '../tab-list-head-link/tab-list-head-link';

export type TTabListItemProps = TTabListHeadLinkProps & {
    tab: ReactNode;
};

export const TabListItem = ({
    href,
    children,
    active,
    tab,
}: TTabListItemProps) => (
    <>
        <TabListHeadLink href={href} active={active}>
            {tab}
        </TabListHeadLink>
        {active && <TabListBody>{children}</TabListBody>}
    </>
);
