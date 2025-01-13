import { useCallback, useState } from 'react';
import cn from 'classnames';

export type TCollapseProps = {
    title: string;
    children: JSX.Element | string;
    type: 'arrow' | 'default';
    fullView: boolean;
}
export const Collapse = ({ 
    title,
    children,
    type = 'default',
    fullView = true,
}: TCollapseProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(fullView)

    const handlerSetIsOpen = useCallback(() => setIsOpen(!isOpen) ,[isOpen])

    return (
        <div className={cn('collapse bg-base-100 border border-base-300 p-4', { 'collapse-arrow': type === 'arrow'})}>
            <input type="checkbox" onChange={handlerSetIsOpen} checked={isOpen} />
            <div className="collapse-title text-2xl font-bold">{title}</div>
            <div className="collapse-content text-sm">{children}</div>
        </div>

    )
}