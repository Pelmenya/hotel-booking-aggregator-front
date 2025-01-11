import { useCallback, useState } from 'react';

export type TCollapseProps = {
    head: JSX.Element | string;
    body: JSX.Element | string;
    type: 'arrow' | 'default';

}
export const Collapse = ({ 
    head,
    body,
    type = 'default'
}: TCollapseProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const handlerSetIsOpen = useCallback(() => setIsOpen(!isOpen) ,[isOpen])

    return (
        <div className="collapse bg-base-100  border border-base-300">
            <input type="checkbox" onChange={handlerSetIsOpen} checked={isOpen} />
            <div className="collapse-title font-semibold">{head}</div>
            <div className="collapse-content text-sm">{body}</div>
        </div>

    )
}