import { CarouselFullPicPreview } from '@/components/carousel-full-pic-preview/carousel-full-pic-preview';
import { ImagesGrid } from '@/components/images-grid/images-grid';
import { Modal } from '@/components/modal/modal';
import { THotel } from '@/types/t-hotel';
import { useState } from 'react';
import { boolean } from 'yup';

export type THotelPageProps = {
    hotel: THotel;
};
export const HotelPage = ({ hotel }: THotelPageProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const descriptions: string[] = hotel.description.split('\r\n');

    const handlerToogleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    return (
        <div className="flex flex-col gap-16 py-16">
            <h1 className="font-black text-5xl">{hotel.title}</h1>
            {hotel?.images.length ? (
                <ImagesGrid
                    onClick={handlerToogleModal}
                    images={hotel.images}
                />
            ) : null}
            <article className="prose lg:prose-xl">
                <h3 className="font-mono">Про отель</h3>
                {descriptions.map((text, idx) => (
                    <p key={text + idx} className="font-mono">
                        {text}
                    </p>
                ))}
            </article>
            <Modal isOpen={isOpenModal} handlerClose={handlerToogleModal}>
                <CarouselFullPicPreview images={hotel.images}/>
            </Modal>
        </div>
    );
};
