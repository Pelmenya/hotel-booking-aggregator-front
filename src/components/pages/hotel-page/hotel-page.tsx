import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { DataJson } from '@/components/data-json/data-json';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { List } from '@/components/list/list';
import { Modal } from '@/components/modal/modal';
import { THotel } from '@/types/t-hotel';
import { THotelRoom } from '@/types/t-hotel-room';
import { useState } from 'react';
import { boolean } from 'yup';

export type THotelPageProps = {
    hotel: THotel;
    rooms: THotelRoom[];
};
export const HotelPage = ({ hotel, rooms }: THotelPageProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const descriptions: string[] = hotel.description.split('\r\n');

    const handlerToogleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    return (
        <>
            <Modal isOpen={isOpenModal} handlerClose={handlerToogleModal}>
                <CarouselFullPicPreview images={hotel.images} />
            </Modal>
            <div className="flex flex-col gap-16 py-16">
                <h1 className="font-black text-5xl">{hotel.title}</h1>
                {hotel?.images.length ? (
                    <ImagesGrid
                        onClick={handlerToogleModal}
                        images={hotel.images}
                    />
                ) : null}
                <>
                    {rooms.length ? (
                        <>
                            <h2 className="font-black font-mono text-3xl">
                                {'Варианты размещения'}
                            </h2>
                            <List items={rooms} href="/hotel-rooms" />
                        </>
                    ) : null}
                </>
                <article className="prose lg:prose-xl">
                    <h3 className="font-mono">Про отель</h3>
                    {descriptions.map((text, idx) => (
                        <p key={text + idx} className="font-mono">
                            {text}
                        </p>
                    ))}
                </article>
            </div>
        </>
    );
};
