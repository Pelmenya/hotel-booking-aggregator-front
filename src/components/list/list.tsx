import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { THotel } from '@/types/t-hotel';
import { THotelRoom } from '@/types/t-hotel-room';
import { Card } from '@/components/card/card';

export type TListProps = {
    href: string
    items:  THotel[] | THotelRoom[] | undefined
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
                    {items.map((item: THotel | THotelRoom) => (
                        <Card
                            key={item.id}
                            {...item}
                            onClick={handlerOnClickCard}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
