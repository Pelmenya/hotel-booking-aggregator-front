import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { THotelResData } from '@/types/t-hotel-res-data';
import { Card } from '@/components/card/card';

export type TListProps = {
    href: string;
    items:  THotelResData[];
}

export const List = ({ items, href }: TListProps) => {
    const router = useRouter();

    const handlerOnClickCard = useCallback(
        (id: string) => {
            router.push(`${href}/${id}`);
        },
        [router, href]
    );

    return (
        <div id='gridCarousel'>
            {items ? (
                <div className="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2">
                    {items.map((item: THotelResData) => (
                        <Card
                            key={item.hotel.id}
                            {...item}
                            onClick={handlerOnClickCard}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
