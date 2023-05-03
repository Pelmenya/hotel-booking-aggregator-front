import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { Modal } from '@/components/modal/modal';
import { THotelRoom } from '@/types/t-hotel-room';
import { useState } from 'react';

export type THotelPageProps = {
    room: THotelRoom;
};
export const HotelRoomPage = ({ room }: THotelPageProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const descriptions: string[] = room.description.split('\r\n');

    const handlerToogleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    return (
        <>
            <Modal isOpen={isOpenModal} handlerClose={handlerToogleModal}>
                <CarouselFullPicPreview images={room.images} />
            </Modal>
            <div className="flex flex-col gap-16 py-16">
                <h1 className="font-black text-5xl">{room.title}</h1>
                {room?.images.length ? (
                    <ImagesGrid
                        onClick={handlerToogleModal}
                        images={room.images}
                    />
                ) : null}
                <article className="prose lg:prose-xl">
                    <h3 className="font-mono">Про номер</h3>
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
